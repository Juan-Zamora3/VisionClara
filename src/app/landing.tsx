import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height: screenHeight } = Dimensions.get('window');

export default function LandingScreen() {
  const insets = useSafeAreaInsets();

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const navigateToInfo = () => {
    router.push('/info_inicio');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            minHeight: screenHeight - insets.top - insets.bottom,
            paddingHorizontal: 24,
            paddingVertical: 32,
            justifyContent: 'space-between'
          }}
        >
          {/* Header */}
          <View style={{ paddingTop: 32 }}>
            {/* Logo y Brand */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 32 
            }}>
              <View style={{
                backgroundColor: '#10b981',
                padding: 12,
                borderRadius: 20,
                marginRight: 12
              }}>
                <Ionicons name="eye" size={32} color="white" />
              </View>
              <View>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 24, 
                  fontWeight: '600' 
                }}>
                  Visión Clara
                </Text>
                <Text style={{ 
                  color: '#6ee7b7', 
                  fontSize: 14 
                }}>
                  Detección temprana
                </Text>
              </View>
            </View>

            {/* Título principal */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 20, 
                marginBottom: 16,
                textAlign: 'center',
                lineHeight: 28
              }}>
                Detecta de manera temprana posibles signos de retinopatía diabética
              </Text>
              <Text style={{ 
                color: '#d1d5db', 
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 20
              }}>
                Utiliza inteligencia artificial para analizar imágenes del fondo de ojo 
                y proporcionar un diagnóstico preliminar rápido y preciso.
              </Text>
            </View>

            {/* Features */}
            <View style={{ marginBottom: 32 }}>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
                <Ionicons name="shield-checkmark" size={20} color="#6ee7b7" />
                <Text style={{ 
                  color: '#d1d5db', 
                  fontSize: 14, 
                  marginLeft: 12 
                }}>
                  Análisis seguro y privado
                </Text>
              </View>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
                <Ionicons name="time" size={20} color="#6ee7b7" />
                <Text style={{ 
                  color: '#d1d5db', 
                  fontSize: 14, 
                  marginLeft: 12 
                }}>
                  Resultados en segundos
                </Text>
              </View>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center' 
              }}>
                <Ionicons name="people" size={20} color="#6ee7b7" />
                <Text style={{ 
                  color: '#d1d5db', 
                  fontSize: 14, 
                  marginLeft: 12 
                }}>
                  Validado por especialistas
                </Text>
              </View>
            </View>
          </View>

          {/* Privacy Notice */}
          <View style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24
          }}>
            <Text style={{ 
              color: '#9ca3af', 
              fontSize: 12,
              lineHeight: 18
            }}>
              🔒 Tus imágenes no se almacenan, solo se analizan para dar un resultado. 
              Este sistema no sustituye un diagnóstico médico profesional.
            </Text>
          </View>

          {/* Action Buttons */}
          <View>
            <TouchableOpacity
              onPress={navigateToLogin}
              style={{
                backgroundColor: '#10b981',
                paddingVertical: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}
            >
              <Text style={{ 
                color: 'white', 
                fontSize: 16, 
                fontWeight: '600',
                marginRight: 8
              }}>
                Comenzar análisis
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={navigateToInfo}
              style={{ alignItems: 'center' }}
            >
              <Text style={{ 
                color: '#9ca3af', 
                fontSize: 14,
                textDecorationLine: 'underline'
              }}>
                ¿Qué es la retinopatía diabética?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ 
            paddingTop: 24, 
            borderTopWidth: 1, 
            borderTopColor: '#374151',
            alignItems: 'center'
          }}>
            <Text style={{ 
              color: '#6b7280', 
              fontSize: 12,
              textAlign: 'center'
            }}>
              Desarrollado por el equipo médico • Prototipo educativo v1.0
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}