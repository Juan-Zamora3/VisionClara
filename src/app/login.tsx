import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput, StatusBar, SafeAreaView, Dimensions } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height }} className="bg-slate-900">
      <StatusBar backgroundColor="#0f172b" barStyle="light-content" />
      <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
        {/* Header Navigation */}
        <HeaderNavigation />
        
        {/* Logo Section */}
        <LogoSection />
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Login Form */}
        <LoginForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        
        {/* Guest Section */}
        <GuestSection />
        
        {/* Privacy Disclaimer */}
        <PrivacyDisclaimer />
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderNavigation() {
  return (
    <View className="px-6 py-4">
      <View className="flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4"
        >
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

function LoginForm({ email, setEmail, password, setPassword }: {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
}) {
  return (
    <View className="px-6 mb-8">
      {/* Email Field */}
      <EmailField email={email} setEmail={setEmail} />
      
      {/* Password Field */}
      <PasswordField password={password} setPassword={setPassword} />
      
      {/* Login Button */}
      <LoginButton />
    </View>
  );
}

function EmailField({ email, setEmail }: {
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

function PasswordField({ password, setPassword }: {
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

function LoginButton() {
  return (
    <Link href="/analisis" asChild>
      <TouchableOpacity className="bg-emerald-500 rounded-xl py-4 items-center">
        <Text className="text-white text-lg font-semibold">Iniciar Sesión</Text>
      </TouchableOpacity>
    </Link>
  );
}

function GuestSection() {
  return (
    <View className="px-6 mb-8">
      <Text className="text-slate-400 text-center mb-4">
        ¿Solo quieres probar la aplicación?
      </Text>
      <Link href="/analisis" asChild>
        <TouchableOpacity className="bg-transparent border border-slate-600 rounded-xl py-3 items-center">
          <View className="flex-row items-center">
            <Text className="text-slate-400 mr-2">👤</Text>
            <Text className="text-slate-300 text-base">Entrar como invitado</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

function PrivacyDisclaimer() {
  return (
    <View className="px-6 pb-6">
      <Text className="text-slate-500 text-xs text-center leading-relaxed">
        Tus datos son privados. Solo el administrador puede ver los resultados agregados para fines estadísticos.
      </Text>
    </View>
  );
}