import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  label: string;
}

const tabs: TabItem[] = [
  {
    name: 'analisis',
    icon: 'camera-outline',
    route: '/analisis',
    label: 'ANÁLISIS'
  },
  {
    name: 'historial',
    icon: 'time-outline',
    route: '/dashboard',
    label: 'HISTORIAL'
  },
  {
    name: 'reportes',
    icon: 'document-text-outline',
    route: '/report',
    label: 'REPORTES'
  },
  {
    name: 'perfil',
    icon: 'person-outline',
    route: '/info',
    label: 'PERFIL'
  }
];

export default function NavigationToolbar() {
  const pathname = usePathname();

  const isActiveTab = (route: string) => {
    return pathname === route;
  };

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      paddingVertical: 8,
      paddingHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
      {tabs.map((tab) => {
        const isActive = isActiveTab(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
            }}
            onPress={() => handleTabPress(tab.route)}
          >
            <Ionicons
              name={isActive ? tab.icon.replace('-outline', '') as keyof typeof Ionicons.glyphMap : tab.icon}
              size={24}
              color={isActive ? '#1976D2' : '#6B7280'}
            />
            <Text style={{
              fontSize: 10,
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#1976D2' : '#6B7280',
              marginTop: 4,
              textAlign: 'center',
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}