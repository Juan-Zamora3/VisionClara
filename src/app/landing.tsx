import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar, 
  Modal, Linking 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height: screenHeight } = Dimensions.get('window');

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const [infoVisible, setInfoVisible] = useState(false);

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  // Abre recurso externo sobre RD (Mayo Clinic, ES)
  const openInfoLink = async () => {
    const url = 'https://www.mayoclinic.org/es/diseases-conditions/diabetic-retinopathy/symptoms-causes/syc-20371611';
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            minHeight: screenHeight - insets.top - insets.bottom,
            paddingHorizontal: 24,
            paddingVertical: 32,
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <View style={{ paddingTop: 32 }}>
            {/* Logo y Brand */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  backgroundColor: '#10b981',
                  padding: 12,
                  borderRadius: 20,
                  marginRight: 12,
                }}
              >
                <Ionicons name="eye" size={32} color="white" />
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                  Visión Clara
                </Text>
                <Text style={{ color: '#6ee7b7', fontSize: 14 }}>Detección temprana</Text>
              </View>
            </View>

            {/* Título principal */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  marginBottom: 16,
                  textAlign: 'center',
                  lineHeight: 28,
                }}
              >
                Detecta de manera temprana posibles signos de retinopatía diabética
              </Text>
              <Text style={{ color: '#d1d5db', fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
                Utiliza inteligencia artificial para analizar imágenes del fondo de ojo 
                y proporcionar un diagnóstico preliminar rápido y preciso.
              </Text>
            </View>

            {/* Features */}
            <View style={{ marginBottom: 32 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Ionicons name="shield-checkmark" size={20} color="#6ee7b7" />
                <Text style={{ color: '#d1d5db', fontSize: 14, marginLeft: 12 }}>
                  Análisis seguro y privado
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Ionicons name="time" size={20} color="#6ee7b7" />
                <Text style={{ color: '#d1d5db', fontSize: 14, marginLeft: 12 }}>
                  Resultados en segundos
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="people" size={20} color="#6ee7b7" />
                <Text style={{ color: '#d1d5db', fontSize: 14, marginLeft: 12 }}>
                  Validado por especialistas
                </Text>
              </View>
            </View>
          </View>

          {/* Privacy Notice */}
          <View
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <Text style={{ color: '#9ca3af', fontSize: 12, lineHeight: 18 }}>
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
                marginBottom: 16,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginRight: 8 }}>
                Comenzar análisis
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>

            {/* Abrir Modal en vez de navegar */}
            <TouchableOpacity onPress={() => setInfoVisible(true)} style={{ alignItems: 'center' }}>
              <Text style={{ color: '#9ca3af', fontSize: 14, textDecorationLine: 'underline' }}>
                ¿Qué es la retinopatía diabética?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={{
              paddingTop: 24,
              borderTopWidth: 1,
              borderTopColor: '#374151',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#6b7280', fontSize: 12, textAlign: 'center' }}>
              Desarrollado por el equipo médico • Prototipo educativo v1.0
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Modal de Información */}
      <Modal
        visible={infoVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
              maxHeight: screenHeight * 0.8,
            }}
          >
            {/* Handle */}
            <View
              style={{
                alignSelf: 'center',
                width: 48,
                height: 5,
                borderRadius: 3,
                backgroundColor: '#e5e7eb',
                marginBottom: 12,
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="information-circle" size={22} color="#0ea5e9" />
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginLeft: 8 }}>
                Retinopatía diabética
              </Text>
            </View>

            <ScrollView
              style={{}}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator
            >
              <Text style={{ fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 12 }}>
                La retinopatía diabética es una complicación de la diabetes que afecta los vasos sanguíneos de la retina. 
                En etapas iniciales puede no causar síntomas, pero con el tiempo puede provocar visión borrosa, manchas 
                flotantes o pérdida de la visión si no se trata.
              </Text>

              <Text style={{ fontSize: 14, color: '#111827', fontWeight: '700', marginBottom: 8 }}>
                Señales y síntomas comunes
              </Text>
              <Text style={{ fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 12 }}>
                • Visión borrosa o fluctuante{"\n"}
                • Dificultad para ver de noche{"\n"}
                • Manchas oscuras o “moscas volantes”{"\n"}
                • Áreas de visión oscurecidas o vacías
              </Text>

              <Text style={{ fontSize: 14, color: '#111827', fontWeight: '700', marginBottom: 8 }}>
                Prevención y cuidado
              </Text>
              <Text style={{ fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 12 }}>
                • Control estricto de glucosa, presión y colesterol{"\n"}
                • Exámenes oftalmológicos regulares{"\n"}
                • Consulta temprana ante cambios en la visión
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: '#eff6ff',
                  marginBottom: 16,
                }}
              >
                <Ionicons name="link-outline" size={18} color="#2563eb" />
                <Text
                  onPress={openInfoLink}
                  style={{
                    marginLeft: 8,
                    color: '#2563eb',
                    textDecorationLine: 'underline',
                    fontSize: 14,
                    flexShrink: 1,
                  }}
                >
                  Leer más en Mayo Clinic (artículo en español)
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  lineHeight: 18,
                  textAlign: 'center',
                }}
              >
                Este contenido es informativo y no sustituye la evaluación médica profesional.
              </Text>
            </ScrollView>

            {/* Acciones del modal */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => setInfoVisible(false)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: '#111827',
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="close" size={18} color="white" />
                <Text style={{ color: 'white', marginLeft: 8, fontWeight: '600' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
