// app/tabs/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: false, // (opcional) monta rápido sin diferir pantallas
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="results" options={{ title: "Resultados" }} />
      <Tabs.Screen name="analisis" options={{ title: "Análisis" }} />
      <Tabs.Screen name="report" options={{ title: "Reportes" }} />
      <Tabs.Screen name="upload" options={{ title: "Subir" }} />
    </Tabs>
  );
}
