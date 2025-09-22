import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Share,
  Clipboard,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface ErrorInfo {
  type: 'network' | 'processing' | 'upload' | 'system' | 'unknown';
  message: string;
  code?: string;
  timestamp: string;
  details?: string;
}

interface ErrorType {
  type: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  solutions: string[];
}

export default function ErrorScreen() {
  const params = useLocalSearchParams();
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Obtener información del error de los parámetros o usar error de ejemplo
    if (params.type) {
      setErrorInfo({
        type: params.type as ErrorInfo['type'],
        message: (params.message as string) || 'Error desconocido',
        code: params.code as string,
        timestamp: new Date().toISOString(),
        details: params.details as string
      });
    } else {
      // Error de ejemplo
      setErrorInfo({
        type: 'processing',
        message: 'Error al procesar la imagen',
        code: 'PROC_001',
        timestamp: new Date().toISOString(),
        details: 'La imagen no pudo ser analizada debido a problemas de calidad o formato'
      });
    }
  }, [params]);

  const errorTypes: ErrorType[] = [
    {
      type: 'network',
      title: 'Error de Conexión',
      description: 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
      icon: 'wifi-outline',
      color: '#f59e0b',
      solutions: [
        'Verifica tu conexión a internet',
        'Intenta conectarte a una red WiFi estable',
        'Reinicia tu router si es necesario',
        'Espera unos minutos y vuelve a intentar'
      ]
    },
    {
      type: 'processing',
      title: 'Error de Procesamiento',
      description: 'No se pudo analizar la imagen. Puede ser un problema de calidad o formato.',
      icon: 'cog-outline',
      color: '#ef4444',
      solutions: [
        'Asegúrate de que la imagen sea clara y bien iluminada',
        'Verifica que el formato sea JPG o PNG',
        'Intenta tomar una nueva foto',
        'Asegúrate de que la imagen muestre claramente la retina'
      ]
    },
    {
      type: 'upload',
      title: 'Error de Carga',
      description: 'No se pudo cargar la imagen al servidor.',
      icon: 'cloud-upload-outline',
      color: '#f59e0b',
      solutions: [
        'Verifica tu conexión a internet',
        'Asegúrate de que el archivo no sea demasiado grande',
        'Intenta comprimir la imagen',
        'Vuelve a intentar en unos minutos'
      ]
    },
    {
      type: 'system',
      title: 'Error del Sistema',
      description: 'Error interno del sistema. Nuestro equipo ha sido notificado.',
      icon: 'warning-outline',
      color: '#ef4444',
      solutions: [
        'Reinicia la aplicación',
        'Verifica que tengas la última versión',
        'Libera espacio en tu dispositivo',
        'Contacta al soporte técnico si persiste'
      ]
    },
    {
      type: 'unknown',
      title: 'Error Desconocido',
      description: 'Ha ocurrido un error inesperado.',
      icon: 'help-circle-outline',
      color: '#64748b',
      solutions: [
        'Reinicia la aplicación',
        'Vuelve a intentar la operación',
        'Verifica tu conexión',
        'Contacta al soporte si el problema persiste'
      ]
    }
  ];

  const getCurrentErrorType = (): ErrorType => {
    return errorTypes.find(et => et.type === errorInfo?.type) || errorTypes[errorTypes.length - 1];
  };

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push('/dashboard');
  };

  const retryOperation = async () => {
    setIsRetrying(true);
    
    try {
      // Simular reintento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una implementación real, aquí se reintentaría la operación que falló
      Alert.alert(
        'Reintento Exitoso',
        'La operación se completó correctamente.',
        [
          { text: 'OK', onPress: goBack }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Reintento Fallido',
        'El error persiste. Por favor, intenta las soluciones sugeridas.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsRetrying(false);
    }
  };

  const reportError = async () => {
    if (!errorInfo) return;

    const errorReport = `REPORTE DE ERROR - VISIÓN CLARA

Información del Error:
Tipo: ${getCurrentErrorType().title}
Mensaje: ${errorInfo.message}
Código: ${errorInfo.code || 'N/A'}
Fecha y Hora: ${new Date(errorInfo.timestamp).toLocaleString('es-ES')}

Detalles Técnicos:
${errorInfo.details || 'No hay detalles adicionales disponibles'}

Dispositivo: ${Platform.OS} ${Platform.Version}
Versión de la App: 1.0.0

---
Este reporte ha sido generado automáticamente por Visión Clara.`;

    try {
      await Share.share({
        message: errorReport,
        title: 'Reporte de Error - Visión Clara'
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el reporte de error');
    }
  };

  const copyErrorDetails = async () => {
    if (!errorInfo) return;

    const errorDetails = `Error: ${errorInfo.message}\nCódigo: ${errorInfo.code || 'N/A'}\nFecha: ${new Date(errorInfo.timestamp).toLocaleString('es-ES')}`;
    
    try {
      Clipboard.setString(errorDetails);
      Alert.alert('Copiado', 'Los detalles del error han sido copiados al portapapeles');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron copiar los detalles');
    }
  };

  const contactSupport = () => {
    Alert.alert(
      'Contactar Soporte',
      'Puedes contactar a nuestro equipo de soporte técnico a través de:',
      [
        { text: 'Email', onPress: () => Alert.alert('Email', 'soporte@visionclara.com') },
        { text: 'Teléfono', onPress: () => Alert.alert('Teléfono', '+1 (555) 123-4567') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  if (!errorInfo) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#64748b', fontSize: 16 }}>
            Cargando información del error...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentErrorType = getCurrentErrorType();

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
          <TouchableOpacity
            onPress={goBack}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#64748b" />
          </TouchableOpacity>
          
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1e293b'
          }}>
            Error Detectado
          </Text>
          
          <TouchableOpacity
            onPress={goHome}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Ionicons name="home" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Error Icon and Title */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={{
            backgroundColor: currentErrorType.color,
            borderRadius: 50,
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Ionicons name={currentErrorType.icon} size={40} color="white" />
          </View>
          
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: 8
          }}>
            {currentErrorType.title}
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 20
          }}>
            {currentErrorType.description}
          </Text>
        </View>

        {/* Error Details */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Detalles del Error
            </Text>
            
            <TouchableOpacity
              onPress={copyErrorDetails}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: '#f1f5f9'
              }}
            >
              <Ionicons name="copy" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            <View style={{
              backgroundColor: '#f8fafc',
              borderRadius: 8,
              padding: 12
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: '#64748b',
                marginBottom: 4
              }}>
                MENSAJE
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#1e293b'
              }}>
                {errorInfo.message}
              </Text>
            </View>

            {errorInfo.code && (
              <View style={{
                backgroundColor: '#f8fafc',
                borderRadius: 8,
                padding: 12
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: 4
                }}>
                  CÓDIGO DE ERROR
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#1e293b',
                  fontFamily: 'monospace'
                }}>
                  {errorInfo.code}
                </Text>
              </View>
            )}

            <View style={{
              backgroundColor: '#f8fafc',
              borderRadius: 8,
              padding: 12
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: '#64748b',
                marginBottom: 4
              }}>
                FECHA Y HORA
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#1e293b'
              }}>
                {new Date(errorInfo.timestamp).toLocaleString('es-ES')}
              </Text>
            </View>

            {errorInfo.details && (
              <View style={{
                backgroundColor: '#f8fafc',
                borderRadius: 8,
                padding: 12
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: 4
                }}>
                  DETALLES ADICIONALES
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#1e293b',
                  lineHeight: 20
                }}>
                  {errorInfo.details}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Solutions */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="bulb" size={20} color="#f59e0b" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginLeft: 8
            }}>
              Soluciones Sugeridas
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            {currentErrorType.solutions.map((solution, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingVertical: 4
              }}>
                <Text style={{
                  fontSize: 16,
                  color: '#f59e0b',
                  marginRight: 8,
                  marginTop: 2
                }}>
                  {index + 1}.
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#1e293b',
                  lineHeight: 20,
                  flex: 1
                }}>
                  {solution}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={retryOperation}
            disabled={isRetrying}
            style={{
              backgroundColor: isRetrying ? '#94a3b8' : '#3b82f6',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isRetrying ? (
              <Ionicons name="refresh" size={20} color="white" />
            ) : (
              <Ionicons name="refresh" size={20} color="white" />
            )}
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8
            }}>
              {isRetrying ? 'Reintentando...' : 'Reintentar'}
            </Text>
          </TouchableOpacity>

          <View style={{
            flexDirection: 'row',
            gap: 12
          }}>
            <TouchableOpacity
              onPress={reportError}
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#e2e8f0'
              }}
            >
              <Ionicons name="bug" size={20} color="#64748b" />
              <Text style={{
                color: '#64748b',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 8
              }}>
                Reportar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={contactSupport}
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#e2e8f0'
              }}
            >
              <Ionicons name="headset" size={20} color="#64748b" />
              <Text style={{
                color: '#64748b',
                fontSize: 14,
                fontWeight: '600',
                marginLeft: 8
              }}>
                Soporte
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={goHome}
            style={{
              backgroundColor: '#10b981',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8
            }}>
              Volver al Inicio
            </Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={{
          backgroundColor: '#fffbeb',
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: '#fbbf24'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Ionicons name="information-circle" size={20} color="#f59e0b" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#92400e',
              marginLeft: 8
            }}>
              ¿Necesitas más ayuda?
            </Text>
          </View>
          
          <Text style={{
            fontSize: 14,
            color: '#92400e',
            lineHeight: 20,
            marginBottom: 12
          }}>
            Si el problema persiste después de intentar las soluciones sugeridas, 
            nuestro equipo de soporte técnico está disponible para ayudarte.
          </Text>

          <View style={{
            flexDirection: 'row',
            gap: 8,
            flexWrap: 'wrap'
          }}>
            <Text style={{
              fontSize: 12,
              color: '#92400e',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4
            }}>
              📧 soporte@visionclara.com
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#92400e',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4
            }}>
              📞 +1 (555) 123-4567
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}