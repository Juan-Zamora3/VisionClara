import { Redirect } from "expo-router";

// Simulación de estado de sesión
const isLoggedIn = false;

export default function Index() {
  return <Redirect href={isLoggedIn ? "/tabs" : "/landing"} />;
}