import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 1500);
  };

  const handleGuestAccess = () => {
    router.replace('/dashboard');
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12
      }}>
        <TouchableOpacity 
          onPress={goBack}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={{ 
          color: 'white', 
          fontSize: 18, 
          fontWeight: '600' 
        }}>
          Iniciar Sesión
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingVertical: 32 
        }}
      >
        {/* Logo */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 32 
        }}>
          <View style={{
            backgroundColor: '#10b981',
            padding: 16,
            borderRadius: 25
          }}>
            <Ionicons name="eye" size={40} color="white" />
          </View>
        </View>

        {/* Welcome Text */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 32 
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 24, 
            fontWeight: '600',
            marginBottom: 8
          }}>
            Bienvenido
          </Text>
          <Text style={{ 
            color: '#9ca3af', 
            fontSize: 16 
          }}>
            Ingresa tus datos para continuar
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginBottom: 24 }}>
          {/* Email Field */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              color: '#d1d5db', 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Email profesional
            </Text>
            <View style={{
              position: 'relative',
              backgroundColor: '#1e293b',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#374151'
            }}>
              <Ionicons 
                name="mail" 
                size={20} 
                color="#9ca3af" 
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 16,
                  zIndex: 1
                }}
              />
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 16,
                  paddingHorizontal: 44,
                  paddingVertical: 16,
                  backgroundColor: 'transparent'
                }}
                placeholder="doctor@hospital.com"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              color: '#d1d5db', 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Contraseña
            </Text>
            <View style={{
              position: 'relative',
              backgroundColor: '#1e293b',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#374151'
            }}>
              <Ionicons 
                name="lock-closed" 
                size={20} 
                color="#9ca3af" 
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 16,
                  zIndex: 1
                }}
              />
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 16,
                  paddingHorizontal: 44,
                  paddingVertical: 16,
                  backgroundColor: 'transparent',
                  paddingRight: 50
                }}
                placeholder="••••••••"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 16,
                  zIndex: 1
                }}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#9ca3af" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
            style={{
              backgroundColor: (!email || !password) ? '#374151' : '#10b981',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ 
                color: 'white', 
                fontSize: 16, 
                fontWeight: '600' 
              }}>
                Iniciar Sesión
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Guest Access */}
        <View style={{
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: '#374151',
          alignItems: 'center'
        }}>
          <Text style={{ 
            color: '#9ca3af', 
            fontSize: 14,
            marginBottom: 16,
            textAlign: 'center'
          }}>
            ¿No tienes cuenta profesional?
          </Text>
          
          <TouchableOpacity
            onPress={handleGuestAccess}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#374151',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Ionicons name="person" size={16} color="#9ca3af" />
            <Text style={{ 
              color: '#9ca3af', 
              fontSize: 14, 
              marginLeft: 8 
            }}>
              Acceso como invitado
            </Text>
          </TouchableOpacity>

          <Text style={{ 
            color: '#6b7280', 
            fontSize: 12,
            marginTop: 16,
            textAlign: 'center',
            lineHeight: 16
          }}>
            El acceso como invitado permite usar la aplicación con funcionalidad limitada
          </Text>
        </View>

        {/* Footer */}
        <View style={{ 
          paddingTop: 32,
          alignItems: 'center'
        }}>
          <Text style={{ 
            color: '#6b7280', 
            fontSize: 12,
            textAlign: 'center'
          }}>
            Al continuar, aceptas nuestros términos de uso y política de privacidad
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}