import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type ResultType = 'normal' | 'suspicious';

interface ReportData {
  patientName: string;
  result: ResultType;
  confidence: string;
  date: string;
  analysisTime: string;
  recommendations: string[];
  technicalDetails: {
    imageResolution: string;
    processingTime: string;
    algorithm: string;
    version: string;
  };
}

export default function ReportScreen() {
  const { patientName, result, confidence, date } = useLocalSearchParams<{
    patientName?: string;
    result?: string;
    confidence?: string;
    date?: string;
  }>();

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Fecha/hora de referencia “congelada” al montar
  const nowRef = useRef(new Date());

  const getRecommendations = (r: ResultType): string[] => {
    return r === 'suspicious'
      ? [
          'Consultar con un oftalmólogo especialista en retina',
          'Realizar estudios complementarios si es necesario',
          'Mantener control estricto de glucosa en sangre',
          'Seguimiento periódico cada 3-6 meses',
          'Monitorear síntomas visuales',
        ]
      : [
          'Continuar con controles anuales de rutina',
          'Mantener buen control de la diabetes',
          'Seguir las indicaciones de su médico tratante',
          'Consultar ante cualquier cambio en la visión',
          'Mantener estilo de vida saludable',
        ];
  };

  const resolvedResult: ResultType =
    (result === 'suspicious' || result === 'normal') ? (result as ResultType) : 'normal';

  const reportData: ReportData = useMemo(() => {
    const d = nowRef.current;
    const locale = 'es-ES';

    const base: ReportData = {
      patientName: patientName || 'Paciente de Ejemplo',
      result: patientName ? resolvedResult : 'suspicious',
      confidence: confidence || (patientName ? '92.5' : '87.3'),
      date: date || d.toLocaleDateString(locale),
      analysisTime: d.toLocaleTimeString(locale),
      recommendations: getRecommendations(patientName ? resolvedResult : 'suspicious'),
      technicalDetails: {
        imageResolution: '2048x1536',
        processingTime: '2.3 segundos',
        algorithm: 'CNN ResNet-50',
        version: 'v2.1.0',
      },
    };

    return base;
  }, [patientName, resolvedResult, confidence, date]); // solo dependencias primitivas

  const goBack = () => {
    router.back();
  };

  const generatePDFReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 3000));
      setReportGenerated(true);
      Alert.alert(
        'Reporte Generado',
        'El reporte PDF ha sido generado exitosamente.',
        [
          { text: 'Compartir', onPress: shareReport },
          { text: 'OK', style: 'default' },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el reporte PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareReport = async () => {
    if (!reportData) return;
    const reportContent = `REPORTE DE ANÁLISIS - VISIÓN CLARA

Información del Paciente:
Nombre: ${reportData.patientName}
Fecha de análisis: ${reportData.date}
Hora de análisis: ${reportData.analysisTime}

Resultado del Análisis:
Estado: ${reportData.result === 'normal' ? 'Normal' : 'Sospechoso'}
Confianza: ${reportData.confidence}%

Recomendaciones:
${reportData.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Detalles Técnicos:
Resolución de imagen: ${reportData.technicalDetails.imageResolution}
Tiempo de procesamiento: ${reportData.technicalDetails.processingTime}
Algoritmo utilizado: ${reportData.technicalDetails.algorithm}
Versión del sistema: ${reportData.technicalDetails.version}

---
Generado por Visión Clara - Sistema de detección temprana de retinopatía diabética
Este reporte es una herramienta de apoyo diagnóstico y no sustituye la evaluación médica profesional.`;

    try {
      await Share.share({
        message: reportContent,
        title: `Reporte - ${reportData.patientName} - ${reportData.date}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el reporte');
    }
  };

  const sendByEmail = () => {
    Alert.alert(
      'Enviar por Email',
      'Esta funcionalidad estará disponible próximamente. Por ahora puedes usar la opción de compartir.',
      [{ text: 'OK' }]
    );
  };

  const saveToDevice = () => {
    Alert.alert(
      'Guardar en Dispositivo',
      'Esta funcionalidad estará disponible próximamente. Por ahora puedes usar la opción de compartir.',
      [{ text: 'OK' }]
    );
  };

  const isSuspicious = reportData.result === 'suspicious';

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
            Generar Reporte
          </Text>
          
          <TouchableOpacity
            onPress={shareReport}
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
        {/* Report Preview */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          {/* Header del reporte */}
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#e2e8f0'
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              VISIÓN CLARA
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#64748b',
              textAlign: 'center',
              marginTop: 4
            }}>
              Sistema de Detección Temprana de Retinopatía Diabética
            </Text>
          </View>

          {/* Información del paciente */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: 12
            }}>
              INFORMACIÓN DEL PACIENTE
            </Text>
            
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Nombre:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14, fontWeight: '500' }}>
                  {reportData.patientName}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Fecha:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14, fontWeight: '500' }}>
                  {reportData.date}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Hora:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14, fontWeight: '500' }}>
                  {reportData.analysisTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Resultado */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: 12
            }}>
              RESULTADO DEL ANÁLISIS
            </Text>
            
            <View style={{
              backgroundColor: isSuspicious ? '#fef2f2' : '#f0fdf4',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isSuspicious ? '#fecaca' : '#bbf7d0'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons 
                  name={isSuspicious ? "warning" : "checkmark-circle"} 
                  size={20} 
                  color={isSuspicious ? '#ef4444' : '#10b981'} 
                />
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: isSuspicious ? '#dc2626' : '#059669',
                  marginLeft: 8
                }}>
                  {isSuspicious ? 'RESULTADO SOSPECHOSO' : 'RESULTADO NORMAL'}
                </Text>
              </View>
              
              <Text style={{
                fontSize: 14,
                color: isSuspicious ? '#991b1b' : '#047857'
              }}>
                Confianza del análisis: {reportData.confidence}%
              </Text>
            </View>
          </View>

          {/* Recomendaciones */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: 12
            }}>
              RECOMENDACIONES
            </Text>
            
            <View style={{ gap: 6 }}>
              {reportData.recommendations.map((recommendation, index) => (
                <Text key={index} style={{
                  fontSize: 14,
                  color: '#1e293b',
                  lineHeight: 20
                }}>
                  {index + 1}. {recommendation}
                </Text>
              ))}
            </View>
          </View>

          {/* Detalles técnicos */}
          <View>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: 12
            }}>
              DETALLES TÉCNICOS
            </Text>
            
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Resolución:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14 }}>
                  {reportData.technicalDetails.imageResolution}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Tiempo de procesamiento:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14 }}>
                  {reportData.technicalDetails.processingTime}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Algoritmo:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14 }}>
                  {reportData.technicalDetails.algorithm}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>Versión:</Text>
                <Text style={{ color: '#1e293b', fontSize: 14 }}>
                  {reportData.technicalDetails.version}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={generatePDFReport}
            disabled={isGenerating}
            style={{
              backgroundColor: isGenerating ? '#94a3b8' : '#3b82f6',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="document-text" size={20} color="white" />
            )}
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 8
            }}>
              {isGenerating ? 'Generando PDF...' : 'Generar PDF'}
            </Text>
          </TouchableOpacity>

          {reportGenerated && (
            <>
              <TouchableOpacity
                onPress={shareReport}
                style={{
                  backgroundColor: '#10b981',
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="share" size={20} color="white" />
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 8
                }}>
                  Compartir Reporte
                </Text>
              </TouchableOpacity>

              <View style={{
                flexDirection: 'row',
                gap: 12
              }}>
                <TouchableOpacity
                  onPress={sendByEmail}
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
                  <Ionicons name="mail" size={20} color="#64748b" />
                  <Text style={{
                    color: '#64748b',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 8
                  }}>
                    Email
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={saveToDevice}
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
                  <Ionicons name="download" size={20} color="#64748b" />
                  <Text style={{
                    color: '#64748b',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 8
                  }}>
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
            ⚠️ Este reporte es una herramienta de apoyo diagnóstico y no sustituye 
            la evaluación médica profesional. Siempre consulte con un especialista 
            para un diagnóstico definitivo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}