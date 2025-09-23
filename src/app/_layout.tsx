// app/_layout.tsx
import "../global.css";
import { Stack, usePathname, useRouter } from "expo-router";
import { View, Platform } from "react-native";
import { useEffect, useState } from "react";
import NavigationToolbar from "../components/NavigationToolbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hook simple para sesión
function useAuth() {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "web") {
          const v = sessionStorage.getItem("vc:isLoggedIn");
          setIsLoggedIn(v === "1");
        } else {
          const v = await AsyncStorage.getItem("vc:isLoggedIn");
          setIsLoggedIn(v === "1");
        }
      } finally {
        setReady(true);
      }
    })();
  }, []);

  return { ready, isLoggedIn, setIsLoggedIn };
}

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, isLoggedIn } = useAuth();

  // Espera a saber si hay sesión antes de redirigir
  useEffect(() => {
    if (!ready) return;

    // Si no logueado y entra a /tabs -> mándalo al login
    if (!isLoggedIn && pathname.startsWith("/tabs")) {
      router.replace("/auth/login");
      return;
    }

   
  }, [ready, isLoggedIn, pathname]);

  // Rutas sin toolbar
  const hideToolbarPages = ["/landing", "/auth/login", "/"];
  const shouldShowToolbar = ready && !hideToolbarPages.includes(pathname);

  // Evita parpadeos mientras carga el estado de sesión
  if (!ready) return null;

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* públicas */}
        <Stack.Screen name="landing" />
        <Stack.Screen name="info" />
        <Stack.Screen name="info_inicio" />
        {/* grupos */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
      {shouldShowToolbar && <NavigationToolbar />}
    </View>
  );
}
