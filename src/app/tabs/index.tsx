import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface InfoSection {
  id: string;
  title: string;
  content: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface Stage {
  name: string;
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high';
}

export default function InfoScreen() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const goBack = () => {
    router.back();
  };

  const openExternalLink = (url: string) => {
    Alert.alert(
      'Abrir enlace externo',
      '¿Deseas abrir este enlace en tu navegador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir', onPress: () => Linking.openURL(url) }
      ]
    );
  };

  const infoSections: InfoSection[] = [
    {
      id: 'overview',
      title: 'Qué es la Retinopatía Diabética',
      content: 'La retinopatía diabética es una complicación de la diabetes que afecta los ojos. Es causada por el daño a los vasos sanguíneos del tejido sensible a la luz en la parte posterior del ojo (retina). Al principio, la retinopatía diabética puede no causar síntomas o solo problemas leves de visión. Sin embargo, puede llevar a la ceguera.',
      icon: 'eye',
      color: '#3b82f6'
    },
    {
      id: 'causes',
      title: 'Causas y Factores de Riesgo',
      content: 'La retinopatía diabética es causada por niveles altos de azúcar en sangre debido a la diabetes. Con el tiempo, tener demasiada glucosa en la sangre puede dañar la retina. Los factores de riesgo incluyen: duración de la diabetes, control deficiente del azúcar en sangre, presión arterial alta, colesterol alto, embarazo, tabaquismo y origen étnico.',
      icon: 'warning',
      color: '#f59e0b'
    },
    {
      id: 'symptoms',
      title: 'Síntomas',
      content: 'En las primeras etapas, la retinopatía diabética puede no presentar síntomas. A medida que progresa, los síntomas pueden incluir: manchas o hilos oscuros flotando en la visión, visión borrosa, visión fluctuante, áreas oscuras o vacías en la visión, pérdida de la visión.',
      icon: 'medical',
      color: '#ef4444'
    },
    {
      id: 'prevention',
      title: 'Prevención',
      content: 'La mejor manera de prevenir la retinopatía diabética es mantener un buen control de la diabetes. Esto incluye: mantener los niveles de azúcar en sangre en el rango objetivo, controlar la presión arterial y el colesterol, hacer ejercicio regularmente, mantener un peso saludable, no fumar, y realizarse exámenes oculares regulares.',
      icon: 'shield-checkmark',
      color: '#10b981'
    }
  ];

  const stages: Stage[] = [
    {
      name: 'Retinopatía Diabética No Proliferativa Leve',
      description: 'Etapa más temprana de la enfermedad. Se presentan pequeños microaneurismas en los vasos sanguíneos de la retina.',
      symptoms: ['Generalmente sin síntomas', 'Puede no afectar la visión'],
      severity: 'low'
    },
    {
      name: 'Retinopatía Diabética No Proliferativa Moderada',
      description: 'Los vasos sanguíneos que nutren la retina se bloquean. Algunos vasos sanguíneos pueden hincharse.',
      symptoms: ['Visión ligeramente borrosa', 'Dificultad para ver de noche'],
      severity: 'medium'
    },
    {
      name: 'Retinopatía Diabética No Proliferativa Severa',
      description: 'Muchos vasos sanguíneos se bloquean, privando a varias áreas de la retina de su suministro de sangre.',
      symptoms: ['Visión borrosa notable', 'Manchas en la visión', 'Dificultad para leer'],
      severity: 'high'
    },
    {
      name: 'Retinopatía Diabética Proliferativa',
      description: 'Etapa más avanzada. La retina comienza a crecer nuevos vasos sanguíneos anormales.',
      symptoms: ['Pérdida severa de visión', 'Manchas flotantes', 'Visión distorsionada'],
      severity: 'high'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Leve';
      case 'medium': return 'Moderada';
      case 'high': return 'Severa';
      default: return 'Desconocida';
    }
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
            Información Médica
          </Text>
          
          <TouchableOpacity
            onPress={() => openExternalLink('https://www.who.int/news-room/fact-sheets/detail/diabetes')}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Ionicons name="link" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Navigation Tabs */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 4,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4 }}
          >
            <TouchableOpacity
              onPress={() => setActiveSection('overview')}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: activeSection === 'overview' ? '#3b82f6' : 'transparent'
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: activeSection === 'overview' ? 'white' : '#64748b'
              }}>
                Información
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveSection('stages')}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: activeSection === 'stages' ? '#3b82f6' : 'transparent'
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: activeSection === 'stages' ? 'white' : '#64748b'
              }}>
                Etapas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveSection('help')}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: activeSection === 'help' ? '#3b82f6' : 'transparent'
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: activeSection === 'help' ? 'white' : '#64748b'
              }}>
                Ayuda IA
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Content based on active section */}
        {activeSection === 'overview' && (
          <View>
            {infoSections.map((section) => (
              <View key={section.id} style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
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
                  <View style={{
                    backgroundColor: section.color,
                    borderRadius: 8,
                    padding: 8,
                    marginRight: 12
                  }}>
                    <Ionicons name={section.icon} size={20} color="white" />
                  </View>
                  
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1e293b',
                    flex: 1
                  }}>
                    {section.title}
                  </Text>
                </View>
                
                <Text style={{
                  fontSize: 14,
                  color: '#64748b',
                  lineHeight: 20
                }}>
                  {section.content}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activeSection === 'stages' && (
          <View>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: 16,
              textAlign: 'center'
            }}>
              Etapas de la Retinopatía Diabética
            </Text>

            {stages.map((stage, index) => (
              <View key={index} style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
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
                  marginBottom: 12
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1e293b',
                    flex: 1
                  }}>
                    Etapa {index + 1}
                  </Text>
                  
                  <View style={{
                    backgroundColor: getSeverityColor(stage.severity),
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'white'
                    }}>
                      {getSeverityText(stage.severity)}
                    </Text>
                  </View>
                </View>

                <Text style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#1e293b',
                  marginBottom: 8
                }}>
                  {stage.name}
                </Text>

                <Text style={{
                  fontSize: 14,
                  color: '#64748b',
                  lineHeight: 20,
                  marginBottom: 12
                }}>
                  {stage.description}
                </Text>

                <View>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: 8
                  }}>
                    Síntomas comunes:
                  </Text>
                  
                  {stage.symptoms.map((symptom, symIndex) => (
                    <View key={symIndex} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4
                    }}>
                      <View style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: getSeverityColor(stage.severity),
                        marginRight: 8
                      }} />
                      <Text style={{
                        fontSize: 13,
                        color: '#64748b'
                      }}>
                        {symptom}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeSection === 'help' && (
          <View>
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
                <View style={{
                  backgroundColor: '#8b5cf6',
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12
                }}>
                  <Ionicons name="chatbubble-ellipses" size={20} color="white" />
                </View>
                
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Asistente IA de Visión Clara
                </Text>
              </View>

              <Text style={{
                fontSize: 14,
                color: '#64748b',
                lineHeight: 20,
                marginBottom: 16
              }}>
                Nuestro asistente de inteligencia artificial está aquí para ayudarte con preguntas sobre retinopatía diabética, interpretación de resultados y recomendaciones generales.
              </Text>

              <TouchableOpacity
                onPress={() => Alert.alert('Próximamente', 'El chat con IA estará disponible en una próxima actualización.')}
                style={{
                  backgroundColor: '#8b5cf6',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="chatbubble" size={20} color="white" />
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 8
                }}>
                  Iniciar Chat con IA
                </Text>
              </TouchableOpacity>
            </View>

            {/* FAQ Section */}
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
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: 16
              }}>
                Preguntas Frecuentes
              </Text>

              <View style={{ gap: 12 }}>
                {[
                  {
                    question: '¿Con qué frecuencia debo hacerme exámenes?',
                    answer: 'Se recomienda al menos una vez al año, o más frecuentemente según indicación médica.'
                  },
                  {
                    question: '¿Es reversible la retinopatía diabética?',
                    answer: 'El daño existente no es reversible, pero el tratamiento puede prevenir mayor deterioro.'
                  },
                  {
                    question: '¿Qué tan preciso es el análisis de IA?',
                    answer: 'Nuestro sistema tiene una precisión del 92%, pero siempre debe confirmarse con un especialista.'
                  }
                ].map((faq, index) => (
                  <View key={index} style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: 8,
                    padding: 12
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: 4
                    }}>
                      {faq.question}
                    </Text>
                    <Text style={{
                      fontSize: 13,
                      color: '#64748b',
                      lineHeight: 18
                    }}>
                      {faq.answer}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Emergency Contact */}
        <View style={{
          backgroundColor: '#fef2f2',
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: '#fecaca',
          marginBottom: 20
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Ionicons name="warning" size={20} color="#ef4444" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#dc2626',
              marginLeft: 8
            }}>
              Emergencia Médica
            </Text>
          </View>
          
          <Text style={{
            fontSize: 14,
            color: '#991b1b',
            lineHeight: 20,
            marginBottom: 12
          }}>
            Si experimentas pérdida súbita de visión, dolor ocular severo, o cambios dramáticos en la visión, busca atención médica inmediata.
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL('tel:911')}
            style={{
              backgroundColor: '#ef4444',
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="call" size={16} color="white" />
            <Text style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '600',
              marginLeft: 8
            }}>
              Llamar Emergencias
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
            ℹ️ Esta información es solo para fines educativos y no sustituye 
            el consejo médico profesional. Siempre consulte con un especialista 
            para diagnóstico y tratamiento.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}