import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const { width: screenWidth } = Dimensions.get('window');

export default function UploadScreen() {
  const [patientName, setPatientName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const goBack = () => {
    router.back();
  };

  const pickImageFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permiso requerido', 'Se necesita acceso a la galería para seleccionar imágenes.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara para tomar fotos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo.');
    }
  };

  const startAnalysis = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Por favor selecciona una imagen para analizar.');
      return;
    }

    if (!patientName.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del paciente.');
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simular progreso de análisis
    const interval = setInterval(() => {
      setUploadProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          // Navegar a resultados con datos simulados
          router.push({
            pathname: '/resultados',
            params: {
              patientName,
              result: Math.random() > 0.5 ? 'normal' : 'suspicious',
              confidence: (85 + Math.random() * 10).toFixed(1),
              date: new Date().toLocaleDateString('es-ES')
            }
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const removeImage = () => {
    setSelectedImage(null);
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
            Nuevo Análisis
          </Text>
          
          <View style={{ width: 36 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Patient Information */}
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
            <Ionicons name="person" size={24} color="#10b981" />
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
              marginLeft: 12
            }}>
              Información del Paciente
            </Text>
          </View>
          
          <TextInput
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              color: '#1e293b',
              borderWidth: 1,
              borderColor: '#e2e8f0'
            }}
            placeholder="Nombre completo del paciente"
            placeholderTextColor="#94a3b8"
            value={patientName}
            onChangeText={setPatientName}
            autoCapitalize="words"
          />
        </View>

        {/* Image Upload Section */}
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
            <Ionicons name="camera" size={24} color="#10b981" />
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
              marginLeft: 12
            }}>
              Imagen de Retina
            </Text>
          </View>

          {selectedImage ? (
            <View style={{ alignItems: 'center' }}>
              <View style={{
                position: 'relative',
                marginBottom: 16
              }}>
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: screenWidth - 80,
                    height: screenWidth - 80,
                    borderRadius: 12,
                    backgroundColor: '#f1f5f9'
                  }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={removeImage}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#ef4444',
                    borderRadius: 20,
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text style={{
                fontSize: 14,
                color: '#10b981',
                fontWeight: '500'
              }}>
                ✓ Imagen seleccionada correctamente
              </Text>
            </View>
          ) : (
            <View>
              <View style={{
                borderWidth: 2,
                borderColor: '#e2e8f0',
                borderStyle: 'dashed',
                borderRadius: 12,
                padding: 32,
                alignItems: 'center',
                marginBottom: 16
              }}>
                <Ionicons name="cloud-upload" size={48} color="#94a3b8" />
                <Text style={{
                  fontSize: 16,
                  color: '#64748b',
                  textAlign: 'center',
                  marginTop: 12
                }}>
                  Selecciona una imagen de retina para analizar
                </Text>
              </View>

              <View style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={pickImageFromCamera}
                  style={{
                    backgroundColor: '#10b981',
                    borderRadius: 12,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name="camera" size={20} color="white" />
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 8
                  }}>
                    Tomar Foto
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={pickImageFromGallery}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#e2e8f0'
                  }}
                >
                  <Ionicons name="images" size={20} color="#64748b" />
                  <Text style={{
                    color: '#64748b',
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 8
                  }}>
                    Seleccionar de Galería
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={pickDocument}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#e2e8f0'
                  }}
                >
                  <Ionicons name="document" size={20} color="#64748b" />
                  <Text style={{
                    color: '#64748b',
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 8
                  }}>
                    Seleccionar Archivo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Analysis Progress */}
        {isAnalyzing && (
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
              <ActivityIndicator size="small" color="#10b981" />
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1e293b',
                marginLeft: 12
              }}>
                Analizando imagen...
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#f1f5f9',
              borderRadius: 8,
              height: 8,
              marginBottom: 8
            }}>
              <View style={{
                backgroundColor: '#10b981',
                borderRadius: 8,
                height: 8,
                width: `${uploadProgress}%`
              }} />
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#64748b',
              textAlign: 'center'
            }}>
              {uploadProgress}% completado
            </Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={startAnalysis}
          disabled={isAnalyzing || !selectedImage || !patientName.trim()}
          style={{
            backgroundColor: (isAnalyzing || !selectedImage || !patientName.trim()) 
              ? '#94a3b8' 
              : '#10b981',
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 20
          }}
        >
          {isAnalyzing ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              <Ionicons name="analytics" size={20} color="white" />
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                marginLeft: 8
              }}>
                Iniciar Análisis
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Tips Section */}
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
            <Ionicons name="bulb" size={20} color="#f59e0b" />
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#92400e',
              marginLeft: 8
            }}>
              Consejos para mejores resultados
            </Text>
          </View>
          
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, color: '#92400e' }}>
              • Asegúrate de que la imagen esté bien iluminada
            </Text>
            <Text style={{ fontSize: 14, color: '#92400e' }}>
              • La retina debe estar claramente visible
            </Text>
            <Text style={{ fontSize: 14, color: '#92400e' }}>
              • Evita imágenes borrosas o con reflejos
            </Text>
            <Text style={{ fontSize: 14, color: '#92400e' }}>
              • Usa formatos JPG, PNG o DICOM
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}