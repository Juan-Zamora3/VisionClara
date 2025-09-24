// app/tabs/results.tsx
import React, { useMemo } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StatusBar, Alert, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type Risk = 'normal' | 'suspicious';
interface AnalysisResult {
  patientName: string;
  result: Risk;
  confidence: string;
  date: string;
  details?: {
    microaneurysms: boolean;
    hemorrhages: boolean;
    exudates: boolean;
    neovascularization: boolean;
  };
}

export default function ResultsScreen() {
  // ⚠️ NUNCA guardes el objeto completo en deps. Extrae las keys:
  const { patientName: pn, result: rp, confidence: cp, date: dp } =
    useLocalSearchParams<{
      patientName?: string;
      result?: Risk;
      confidence?: string;
      date?: string;
    }>();

  // ✅ Derivado, sin setState/useEffect
  const result: AnalysisResult = useMemo(() => {
    const res = (rp === 'suspicious' ? 'suspicious' : 'normal') as Risk;
    const confidence = cp || (res === 'suspicious' ? '87.3' : '92.5');
    const date = dp || new Date().toLocaleDateString('es-ES');

    const details = pn
      ? {
          microaneurysms: Math.random() > 0.5,
          hemorrhages: Math.random() > 0.5,
          exudates: Math.random() > 0.5,
          neovascularization: Math.random() > 0.5,
        }
      : {
          microaneurysms: true,
          hemorrhages: false,
          exudates: true,
          neovascularization: false,
        };

    return {
      patientName: pn || 'Paciente de Ejemplo',
      result: res,
      confidence,
      date,
      details,
    };
  }, [pn, rp, cp, dp]);

  const goBack = () => router.back();

  const navigateToReport = () =>
    router.push({
      pathname: '/tabs/report',
      params: {
        patientName: result.patientName,
        result: result.result,
        confidence: result.confidence,
        date: result.date,
      },
    });

  const navigateToNewAnalysis = () => router.push('/tabs/upload');

  const shareResults = async () => {
    try {
      const message = `Resultado del análisis de retinopatía diabética:
Paciente: ${result.patientName}
Resultado: ${result.result === 'normal' ? 'Normal' : 'Sospechoso'}
Confianza: ${result.confidence}%
Fecha: ${result.date}

Generado por Visión Clara - Sistema de detección temprana`;
      await Share.share({ message, title: 'Resultado de Análisis - Visión Clara' });
    } catch {
      Alert.alert('Error', 'No se pudo compartir el resultado');
    }
  };

  const isSuspicious = result.result === 'suspicious';
  const confidenceNum = Number.parseFloat(result.confidence || '0');

  // …tu JSX a partir de aquí (sin cambios) …


 

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
            Resultados del Análisis
          </Text>
          
          <TouchableOpacity
            onPress={shareResults}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Ionicons name="share-outline" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Patient Info */}
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
            marginBottom: 12
          }}>
            <Ionicons name="person" size={20} color="#64748b" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginLeft: 8
            }}>
              Información del Paciente
            </Text>
          </View>
          
          <Text style={{
            fontSize: 18,
            color: '#1e293b',
            marginBottom: 8
          }}>
            {result.patientName}
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#64748b'
          }}>
            Fecha del análisis: {result.date}
          </Text>
        </View>

        {/* Main Result */}
        <View style={{
          backgroundColor: isSuspicious ? '#fef2f2' : '#f0fdf4',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: isSuspicious ? '#fecaca' : '#bbf7d0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={{
            alignItems: 'center',
            marginBottom: 20
          }}>
            <View style={{
              backgroundColor: isSuspicious ? '#ef4444' : '#10b981',
              borderRadius: 50,
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Ionicons 
                name={isSuspicious ? "warning" : "checkmark-circle"} 
                size={40} 
                color="white" 
              />
            </View>
            
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: isSuspicious ? '#dc2626' : '#059669',
              textAlign: 'center',
              marginBottom: 8
            }}>
              {isSuspicious ? 'Resultado Sospechoso' : 'Resultado Normal'}
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: isSuspicious ? '#991b1b' : '#047857',
              textAlign: 'center'
            }}>
              Confianza del análisis: {result.confidence}%
            </Text>
          </View>

          {/* Confidence Bar */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 8,
            height: 8,
            marginBottom: 16
          }}>
            <View style={{
              backgroundColor: isSuspicious ? '#ef4444' : '#10b981',
              borderRadius: 8,
              height: 8,
              width: `${confidenceNum}%`
            }} />
          </View>

          <Text style={{
            fontSize: 14,
            color: isSuspicious ? '#991b1b' : '#047857',
            textAlign: 'center',
            lineHeight: 20
          }}>
            {isSuspicious 
              ? 'Se han detectado posibles signos de retinopatía diabética. Se recomienda consultar con un especialista.'
              : 'No se detectaron signos evidentes de retinopatía diabética en esta imagen.'
            }
          </Text>
        </View>

        {/* Detailed Analysis */}
        {result.details && (
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
              <Ionicons name="analytics" size={20} color="#64748b" />
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1e293b',
                marginLeft: 8
              }}>
                Análisis Detallado
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              {Object.entries({
                microaneurysms: 'Microaneurismas',
                hemorrhages: 'Hemorragias',
                exudates: 'Exudados',
                neovascularization: 'Neovascularización'
              }).map(([key, label]) => (
                <View key={key} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: '#f8fafc',
                  borderRadius: 8
                }}>
                  <Text style={{
                    fontSize: 14,
                    color: '#1e293b'
                  }}>
                    {label}
                  </Text>
                  
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Ionicons 
                      name={result.details![key as keyof typeof result.details] ? "checkmark-circle" : "close-circle"} 
                      size={16} 
                      color={result.details![key as keyof typeof result.details] ? "#ef4444" : "#10b981"} 
                    />
                    <Text style={{
                      fontSize: 12,
                      color: result.details![key as keyof typeof result.details] ? "#ef4444" : "#10b981",
                      marginLeft: 4,
                      fontWeight: '500'
                    }}>
                      {result.details![key as keyof typeof result.details] ? 'Detectado' : 'No detectado'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recommendations */}
        <View style={{
          backgroundColor: '#fffbeb',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#fbbf24'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Ionicons name="medical" size={20} color="#f59e0b" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#92400e',
              marginLeft: 8
            }}>
              Recomendaciones
            </Text>
          </View>
          
          <View style={{ gap: 8 }}>
            {isSuspicious ? (
              <>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Consultar con un oftalmólogo especialista en retina
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Realizar estudios complementarios si es necesario
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Mantener control estricto de glucosa en sangre
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Seguimiento periódico cada 3-6 meses
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Continuar con controles anuales de rutina
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Mantener buen control de la diabetes
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Seguir las indicaciones de su médico tratante
                </Text>
                <Text style={{ fontSize: 14, color: '#92400e' }}>
                  • Consultar ante cualquier cambio en la visión
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={navigateToReport}
            style={{
              backgroundColor: '#3b82f6',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="document-text" size={20} color="white" />
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8
            }}>
              Generar Reporte PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToNewAnalysis}
            style={{
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
            <Ionicons name="add-circle" size={20} color="#64748b" />
            <Text style={{
              color: '#64748b',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8
            }}>
              Nuevo Análisis
            </Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={{
          backgroundColor: '#f1f5f9',
          borderRadius: 12,
          padding: 16
        }}>
          <Text style={{
            fontSize: 12,
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 16
          }}>
            ⚠️ Este análisis es una herramienta de apoyo diagnóstico y no sustituye 
            la evaluación médica profesional. Siempre consulte con un especialista 
            para un diagnóstico definitivo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}