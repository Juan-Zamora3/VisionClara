// src/lib/firebase.ts
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3HkRRisDl0r1KDWlwHGwoksTZ-JMkDTg",
  authDomain: "visionclara-6b06b.firebaseapp.com",
  projectId: "visionclara-6b06b",
  storageBucket: "visionclara-6b06b.appspot.com", // importante
  messagingSenderId: "214197458128",
  appId: "1:214197458128:web:b3f2619fab2ca0e9a07ad5",
  measurementId: "G-DFVBV46P5L",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let auth = getAuth(app);

if (Platform.OS !== "web") {
  try {
    // Carga dinámica: solo intenta resolver si existe el submódulo RN
    // (evita el error de "Cannot resolve 'firebase/auth/react-native'")
    // @ts-ignore - Metro/TS no necesitan tipos aquí
    const { getReactNativePersistence } = require("firebase/auth/react-native");
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // Fallback si tu build no trae ese submódulo
    auth = initializeAuth(app, { persistence: inMemoryPersistence });
    console.warn(
      "[Firebase Auth] No se pudo cargar 'firebase/auth/react-native'. " +
      "Usando inMemoryPersistence. Más tarde puedes volver a AsyncStorage."
    );
  }
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
