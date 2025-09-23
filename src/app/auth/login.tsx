// app/auth/login.tsx
import React, { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- helper de login (web + nativo) ---
async function handleLogin(email?: string) {
  try {
    if (Platform.OS === "web") {
      // guarda “sesión” en navegador
      sessionStorage.setItem("vc:isLoggedIn", "1");
      if (email) sessionStorage.setItem("vc:userEmail", email);

      // quita foco y navega en el siguiente tick (evita aria-hidden warning)
      (document.activeElement as HTMLElement | null)?.blur();
      setTimeout(() => router.replace("/tabs/analisis"), 0);
    } else {
      // guarda “sesión” en iOS/Android
      await AsyncStorage.setItem("vc:isLoggedIn", "1");
      if (email) await AsyncStorage.setItem("vc:userEmail", email);
      router.replace("/tabs/analisis");
    }
  } catch (e) {
    console.warn("Login error:", e);
  }
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView
      style={{ height: Dimensions.get("window").height }}
      className="bg-slate-900"
    >
      <StatusBar backgroundColor="#0f172b" barStyle="light-content" />
      <ScrollView
        className="flex-1 bg-slate-900"
        showsVerticalScrollIndicator={false}
      >
        <HeaderNavigation />
        <LogoSection />
        <WelcomeSection />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <GuestSection />
        <PrivacyDisclaimer />
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderNavigation() {
  return (
    <View className="px-6 py-4">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-white text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Iniciar Sesión</Text>
      </View>
    </View>
  );
}

function LogoSection() {
  return (
    <View className="items-center py-8">
      <View className="w-20 h-20 bg-emerald-500 rounded-full items-center justify-center">
        <Text className="text-white text-3xl">👁</Text>
      </View>
    </View>
  );
}

function WelcomeSection() {
  return (
    <View className="px-6 mb-8">
      <Text className="text-white text-2xl font-bold text-center mb-2">
        Bienvenido
      </Text>
      <Text className="text-slate-400 text-base text-center">
        Ingresa tus datos para continuar
      </Text>
    </View>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
}: {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
}) {
  return (
    <View className="px-6 mb-8">
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField password={password} setPassword={setPassword} />
      <LoginButton email={email} />
    </View>
  );
}

function EmailField({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (text: string) => void;
}) {
  return (
    <View className="mb-4">
      <Text className="text-white text-sm mb-2">Email profesional</Text>
      <View className="bg-slate-800 rounded-lg border border-slate-700">
        <View className="flex-row items-center px-4 py-3">
          <Text className="text-slate-400 mr-3">✉️</Text>
          <TextInput
            className="flex-1 text-white text-base"
            placeholder="doctor@hospital.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
}

function PasswordField({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (text: string) => void;
}) {
  return (
    <View className="mb-6">
      <Text className="text-white text-sm mb-2">Contraseña</Text>
      <View className="bg-slate-800 rounded-lg border border-slate-700">
        <View className="flex-row items-center px-4 py-3">
          <Text className="text-slate-400 mr-3">🔒</Text>
          <TextInput
            className="flex-1 text-white text-base"
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );
}

// --- Botón de iniciar sesión ---
function LoginButton({ email }: { email: string }) {
  return (
    <TouchableOpacity
      onPress={() => handleLogin(email)}
      className="bg-emerald-500 rounded-xl py-4 items-center"
      accessibilityRole="button"
      accessibilityLabel="Iniciar sesión"
      // evita retener foco en web
      {...(Platform.OS === "web" ? ({ tabIndex: -1 } as any) : {})}
      accessible={false}
      focusable={false}
    >
      <Text className="text-white text-lg font-semibold">Iniciar Sesión</Text>
    </TouchableOpacity>
  );
}

function GuestSection() {
  return (
    <View className="px-6 mb-8">
      <Text className="text-slate-400 text-center mb-4">
        ¿Solo quieres probar la aplicación?
      </Text>
      <TouchableOpacity
        onPress={() => handleLogin()}
        className="bg-transparent border border-slate-600 rounded-xl py-3 items-center"
        accessibilityRole="button"
        accessibilityLabel="Entrar como invitado"
        {...(Platform.OS === "web" ? ({ tabIndex: -1 } as any) : {})}
        accessible={false}
        focusable={false}
      >
        <View className="flex-row items-center">
          <Text className="text-slate-400 mr-2">👤</Text>
          <Text className="text-slate-300 text-base">Entrar como invitado</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function PrivacyDisclaimer() {
  return (
    <View className="px-6 pb-6">
      <Text className="text-slate-500 text-xs text-center leading-relaxed">
        Tus datos son privados. Solo el administrador puede ver los resultados
        agregados para fines estadísticos.
      </Text>
    </View>
  );
}
