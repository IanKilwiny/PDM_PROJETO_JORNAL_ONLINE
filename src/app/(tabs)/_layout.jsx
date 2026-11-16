import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#087F82',
        tabBarInactiveTintColor: '#64748B',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          minHeight: 65,
          paddingTop: 8,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Salvos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rss"
        options={{
          title: 'RSS',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-rss" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
