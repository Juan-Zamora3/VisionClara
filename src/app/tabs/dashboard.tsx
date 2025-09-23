import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
}

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Análisis Realizados',
      value: '1,247',
      subtitle: '+12% vs mes anterior',
      icon: 'analytics',
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      title: 'Casos Detectados',
      value: '89',
      subtitle: '7.1% de los análisis',
      icon: 'warning',
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Precisión del Sistema',
      value: '94.2%',
      subtitle: 'Validado por especialistas',
      icon: 'checkmark-circle',
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      title: 'Tiempo Promedio',
      value: '2.3s',
      subtitle: 'Por análisis completo',
      icon: 'time',
      color: '#8b5cf6',
      bgColor: '#f5f3ff'
    }
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simular actualización de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const navigateToUpload = () => {
    router.push('/tabs/analisis');
  };

  const navigateToInfo = () => {
    router.push('/tabs/info_inicio');
  };

  const navigateToResults = () => {
    router.push('/tabs/resultados');
  };

  const handleLogout = () => {
    router.replace('/landing');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              backgroundColor: '#10b981',
              padding: 8,
              borderRadius: 12,
              marginRight: 12
            }}>
              <Ionicons name="eye" size={24} color="white" />
            </View>
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#1e293b'
              }}>
                Visión Clara
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#64748b'
              }}>
                Panel de Control
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: 8
          }}>
            Bienvenido, Doctor
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#64748b',
            lineHeight: 24
          }}>
            Aquí tienes un resumen de la actividad del sistema de detección de retinopatía diabética.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 32
        }}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={{
                width: '48%',
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3
              }}
            >
              <View style={{
                backgroundColor: stat.bgColor,
                width: 48,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: 4
              }}>
                {stat.value}
              </Text>
              
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: 4
              }}>
                {stat.title}
              </Text>
              
              <Text style={{
                fontSize: 12,
                color: '#64748b'
              }}>
                {stat.subtitle}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: 16
          }}>
            Acciones Rápidas
          </Text>
          
          <View style={{ gap: 12 }}>
            {/* New Analysis Button */}
            <TouchableOpacity
              onPress={navigateToUpload}
              style={{
                backgroundColor: '#10b981',
                borderRadius: 16,
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: 12,
                  borderRadius: 12,
                  marginRight: 16
                }}>
                  <Ionicons name="camera" size={24} color="white" />
                </View>
                <View>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: 4
                  }}>
                    Nuevo Análisis
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Analizar imagen de retina
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>

            {/* View Results Button */}
            <TouchableOpacity
              onPress={navigateToResults}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#e2e8f0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: '#eff6ff',
                  padding: 12,
                  borderRadius: 12,
                  marginRight: 16
                }}>
                  <Ionicons name="document-text" size={24} color="#3b82f6" />
                </View>
                <View>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: 4
                  }}>
                    Ver Resultados
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#64748b'
                  }}>
                    Historial de análisis
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#64748b" />
            </TouchableOpacity>

            {/* Information Button */}
            <TouchableOpacity
              onPress={navigateToInfo}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#e2e8f0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: '#f0fdf4',
                  padding: 12,
                  borderRadius: 12,
                  marginRight: 16
                }}>
                  <Ionicons name="information-circle" size={24} color="#10b981" />
                </View>
                <View>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: 4
                  }}>
                    Información
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#64748b'
                  }}>
                    Sobre retinopatía diabética
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={{
          backgroundColor: '#f1f5f9',
          borderRadius: 12,
          padding: 16,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 12,
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 18
          }}>
            Sistema de detección temprana de retinopatía diabética{'\n'}
            Desarrollado por el equipo médico • v1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}