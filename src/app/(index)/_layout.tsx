import { Stack } from "expo-router";
import * as AC from "@bacons/apple-colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Timer" }} />
    </Stack>
  );
}
