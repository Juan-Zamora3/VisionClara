import "../global.css";
import { Slot, usePathname } from "expo-router";
import { View } from "react-native";
import NavigationToolbar from "../components/NavigationToolbar";

export default function Layout() {
  const pathname = usePathname();
  
  // Páginas donde no se debe mostrar el toolbar
  const hideToolbarPages = ['/landing', '/login_screen', '/login', '/'];
  
  const shouldShowToolbar = !hideToolbarPages.includes(pathname);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {shouldShowToolbar && <NavigationToolbar />}
    </View>
  );
}
