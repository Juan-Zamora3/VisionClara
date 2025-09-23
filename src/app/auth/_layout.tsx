// app/auth/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="login" />
      {/* aquí podrías añadir register, forgot, etc. */}
    </Stack>
  );
}
