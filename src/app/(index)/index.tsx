import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function TimerRoute() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AC.systemBackground,
        paddingTop: process.env.EXPO_OS === "web" ? 100 : 0,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <Text
          style={{
            fontSize: 72,
            fontWeight: "200",
            color: AC.label,
            fontVariant: ["tabular-nums"],
          }}
          selectable
        >
          {formatTime(seconds)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={handleStartPause}
            style={({ pressed }) => ({
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: isRunning ? AC.systemOrange : AC.systemGreen,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
              borderCurve: "continuous",
              boxShadow:
                colorScheme === "dark"
                  ? "0px 4px 12px rgba(0,0,0,0.4)"
                  : "0px 4px 12px rgba(0,0,0,0.15)",
            })}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "white",
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleReset}
            disabled={seconds === 0}
            style={({ pressed }) => ({
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor:
                seconds === 0 ? AC.systemGray5 : AC.systemRed,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed && seconds !== 0 ? 0.7 : 1,
              borderCurve: "continuous",
              boxShadow:
                seconds === 0
                  ? "none"
                  : colorScheme === "dark"
                  ? "0px 4px 12px rgba(0,0,0,0.4)"
                  : "0px 4px 12px rgba(0,0,0,0.15)",
            })}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: seconds === 0 ? AC.systemGray3 : "white",
              }}
            >
              Reset
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
