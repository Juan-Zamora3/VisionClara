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
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Link, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Componente principal de la pantalla de análisis
export default function AnalysisScreen() {
  const [patientName, setPatientName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height }} className="bg-slate-900">
      <StatusBar backgroundColor="#0f172b" barStyle="light-content" />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-4 py-6">
        {/* Header Section */}
        <HeaderSection />
        
        {/* Patient Info Section */}
        <PatientInfoSection 
          patientName={patientName}
          setPatientName={setPatientName}
        />
        
        {/* Image Upload Section */}
        <ImageUploadSection 
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        
        {/* Analysis Progress Section */}
        {isAnalyzing && (
          <AnalysisProgressSection 
            uploadProgress={uploadProgress}
          />
        )}
        
        {/* Action Button */}
        <ActionButton 
          selectedImage={selectedImage}
          patientName={patientName}
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
          setUploadProgress={setUploadProgress}
        />
        
        {/* Tips Section */}
        <TipsSection />
        
        {/* About Analysis Section */}
        <AboutAnalysisSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente del encabezado
function HeaderSection() {
  return (
    <View className="mb-8">
      {/* Back Button */}
      <Link href="/login" asChild>
        <TouchableOpacity className="mb-4">
          <View className="flex-row items-center">
            <Text className="text-2xl text-gray-600 mr-2">←</Text>
            <Text className="text-gray-600 text-base">Análisis de Retina</Text>
          </View>
        </TouchableOpacity>
      </Link>
      
      {/* Title and Description */}
      <View className="text-center items-center">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Análisis de Retina
        </Text>
        <Text className="text-gray-600 text-center">
          Sube una imagen del fondo de ojo para análisis
        </Text>
      </View>
    </View>
  );
}

// Componente de información del paciente
interface PatientInfoSectionProps {
  patientName: string;
  setPatientName: (name: string) => void;
}

function PatientInfoSection({ patientName, setPatientName }: PatientInfoSectionProps) {
  return (
    <View className="mb-6">
      <Text className="text-sm text-gray-700 mb-2">
        Nombre del paciente (opcional)
      </Text>
      <TextInput
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
        placeholder="Ej: Juan Pérez"
        value={patientName}
        onChangeText={setPatientName}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}

// Componente de carga de imagen
interface ImageUploadSectionProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

function ImageUploadSection({ selectedImage, setSelectedImage }: ImageUploadSectionProps) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para seleccionar imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu cámara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-6">
      <Text className="text-sm text-gray-700 mb-2">
        Imagen del fondo de ojo *
      </Text>
      
      {selectedImage ? (
        <View className="border-2 border-emerald-400 bg-emerald-50 rounded-xl p-6">
          <View className="items-center space-y-4">
            <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center">
              <Text className="text-emerald-600 text-2xl">✓</Text>
            </View>
            <Image 
              source={{ uri: selectedImage }} 
              className="w-32 h-32 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            >
              <Text className="text-gray-700">Cambiar imagen</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="border-2 border-dashed border-gray-300 rounded-xl p-8">
          <View className="items-center space-y-4">
            <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-400 text-2xl">📤</Text>
            </View>
            <Text className="text-lg text-gray-900 text-center">
              Arrastra tu imagen aquí
            </Text>
            <Text className="text-sm text-gray-500 text-center mb-4">
              O haz clic para seleccionar
            </Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={pickImage}
                className="bg-emerald-600 rounded-lg px-4 py-2 flex-row items-center"
              >
                <Text className="text-white mr-2">📁</Text>
                <Text className="text-white">Seleccionar archivo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={takePhoto}
                className="bg-blue-600 rounded-lg px-4 py-2 flex-row items-center"
              >
                <Text className="text-white mr-2">📷</Text>
                <Text className="text-white">Tomar foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      <View className="mt-2 flex-row">
        <Text className="text-amber-500 mr-2">⚠️</Text>
        <Text className="text-xs text-gray-500 flex-1">
          Formatos aceptados: JPG, PNG. Tamaño máximo: 10MB. 
          Asegúrate de que la imagen sea clara y de buena calidad.
        </Text>
      </View>
    </View>
  );
}

// Componente de progreso de análisis
interface AnalysisProgressSectionProps {
  uploadProgress: number;
}

function AnalysisProgressSection({ uploadProgress }: AnalysisProgressSectionProps) {
  return (
    <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <View className="flex-row items-center mb-3">
        <ActivityIndicator size="small" color="#2563EB" />
        <Text className="text-sm text-blue-800 ml-3">Analizando imagen...</Text>
      </View>
      
      <View className="bg-blue-200 rounded-full h-2 mb-2">
        <View 
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${uploadProgress}%` }}
        />
      </View>
      
      <Text className="text-xs text-blue-600">
        Esto puede tomar unos segundos. No cierres la aplicación.
      </Text>
    </View>
  );
}

// Componente del botón de acción
interface ActionButtonProps {
  selectedImage: string | null;
  patientName: string;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
}

function ActionButton({ 
  selectedImage, 
  patientName, 
  isAnalyzing, 
  setIsAnalyzing, 
  setUploadProgress 
}: ActionButtonProps) {
  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Por favor selecciona una imagen primero.');
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simular progreso de análisis
    const progressInterval = setInterval(() => {
      setUploadProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simular análisis completo
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        'Análisis Completado',
        'El análisis se ha completado exitosamente. Los resultados están listos.',
        [
          {
            text: 'Ver Resultados',
            onPress: () => router.push('/resultados')
          }
        ]
      );
    }, 3000);
  };

  return (
    <TouchableOpacity
      onPress={handleAnalyze}
      disabled={!selectedImage || isAnalyzing}
      className={`w-full py-4 rounded-xl mb-6 ${
        !selectedImage || isAnalyzing 
          ? 'bg-gray-300' 
          : 'bg-emerald-600'
      }`}
    >
      <Text className={`text-center font-medium ${
        !selectedImage || isAnalyzing 
          ? 'text-gray-500' 
          : 'text-white'
      }`}>
        {isAnalyzing ? 'Analizando...' : 'Comenzar análisis'}
      </Text>
    </TouchableOpacity>
  );
}

// Componente de consejos
function TipsSection() {
  const tips = [
    'Imagen clara y bien enfocada',
    'Buena iluminación sin reflejos',
    'Toda la retina visible en el encuadre',
    'Sin obstáculos (pestañas, párpados)'
  ];

  return (
    <View className="bg-gray-100 rounded-lg p-6 mb-6">
      <Text className="font-medium text-gray-900 mb-4">
        Consejos para mejores resultados:
      </Text>
      {tips.map((tip, index) => (
        <View key={index} className="flex-row items-start mb-2">
          <View className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2" />
          <Text className="text-sm text-gray-600 flex-1">{tip}</Text>
        </View>
      ))}
    </View>
  );
}

// Componente de información sobre el análisis
function AboutAnalysisSection() {
  const features = [
    'Precisión del 94.2% validada clínicamente',
    'Resultados en menos de 30 segundos',
    'Compatible con imágenes de retinógrafos estándar',
    'Análisis completamente privado y seguro'
  ];

  return (
    <View className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <Text className="font-medium text-blue-800 mb-3">
        Sobre el análisis
      </Text>
      {features.map((feature, index) => (
        <Text key={index} className="text-sm text-blue-700 mb-2">
          • {feature}
        </Text>
      ))}
    </View>
  );
}