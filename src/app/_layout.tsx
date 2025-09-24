// app/_layout.tsx
import "../global.css";
import { Stack, usePathname, useRouter } from "expo-router";
import { View, Platform } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

// Mantener el splash hasta que carguen las fuentes
SplashScreen.preventAutoHideAsync();

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

  // Cargar Ionicons (y otras fonts si quieres)
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  // Ocultar splash cuando todo está listo
  useEffect(() => {
    if ((ready && fontsLoaded) || fontError) {
      SplashScreen.hideAsync();
    }
  }, [ready, fontsLoaded, fontError]);

  // Redirección según sesión
  useEffect(() => {
    if (!ready) return;
    if (!isLoggedIn && pathname.startsWith("/tabs")) {
      router.replace("/auth/login");
    }
  }, [ready, isLoggedIn, pathname]);

  // Rutas sin toolbar
  const hideToolbarPages = ["/landing", "/auth/login", "/"];
  const shouldShowToolbar =
    ready && fontsLoaded && !hideToolbarPages.includes(pathname);

  // Evita parpadeos mientras carga fonts o sesión
  if (!ready || !fontsLoaded) return null;

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
    </View>
  );
}
