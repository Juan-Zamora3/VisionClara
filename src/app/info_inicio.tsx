import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InfoInicioScreen() {
  const { bottom } = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height }} className="bg-slate-900">
      <StatusBar backgroundColor="#0f172b" barStyle="light-content" />
      <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-emerald-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white text-xl font-bold">👁</Text>
            </View>
            <View>
              <Text className="text-white text-xl font-bold">Visión Clara</Text>
              <Text className="text-emerald-400 text-sm">Detección temprana</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-6">
          {/* Title Section */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-bold leading-tight mb-4">
              Detecta de manera temprana posibles signos de retinopatía diabética
            </Text>
            <Text className="text-slate-300 text-base leading-relaxed">
              Utiliza inteligencia artificial para analizar imágenes del fondo de ojo y proporcionar un diagnóstico preliminar rápido y preciso.
            </Text>
          </View>

          {/* Features */}
          <View className="mb-8">
            <FeatureItem 
              icon="🔒"
              title="Análisis seguro y privado"
            />
            <FeatureItem 
              icon="⚡"
              title="Resultados en segundos"
            />
            <FeatureItem 
              icon="👨‍⚕️"
              title="Validado por especialistas"
            />
          </View>

          {/* Disclaimer */}
          <View className="bg-slate-800 rounded-lg p-4 mb-8">
            <View className="flex-row items-start">
              <Text className="text-yellow-400 text-lg mr-2">⚠️</Text>
              <Text className="text-slate-300 text-sm leading-relaxed flex-1">
                Tus imágenes no se almacenan, solo se analizan para dar un resultado. Este sistema no sustituye un diagnóstico médico profesional.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View className="px-6 pb-6" style={{ paddingBottom: Math.max(bottom, 24) }}>
        {/* Main Button */}
        <Link href="/login" asChild>
          <TouchableOpacity className="bg-emerald-500 rounded-xl py-4 mb-4 items-center">
            <View className="flex-row items-center">
              <Text className="text-white text-lg font-semibold mr-2">Comenzar análisis</Text>
              <Text className="text-white text-lg">→</Text>
            </View>
          </TouchableOpacity>
        </Link>

        {/* Info Link */}
        <TouchableOpacity className="items-center">
          <Text className="text-emerald-400 text-base underline">
            ¿Qué es la retinopatía diabética?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, title }: { icon: string; title: string }) {
  return (
    <View className="flex-row items-center mb-4">
      <View className="w-8 h-8 items-center justify-center mr-4">
        <Text className="text-emerald-400 text-lg">{icon}</Text>
      </View>
      <Text className="text-white text-base flex-1">{title}</Text>
    </View>
  );
}