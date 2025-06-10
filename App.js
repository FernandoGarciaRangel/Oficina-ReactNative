import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdminScreen from './src/screens/AdminScreen';
import ClientScreen from './src/screens/ClientScreen';
import MechanicScreen from './src/screens/MechanicScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sistema de Gerenciamento' }}
        />
        <Stack.Screen 
          name="Admin" 
          component={AdminScreen} 
          options={{ title: 'Área do Administrador' }}
        />
        <Stack.Screen 
          name="Client" 
          component={ClientScreen} 
          options={{ title: 'Área do Cliente' }}
        />
        <Stack.Screen 
          name="Mechanic" 
          component={MechanicScreen} 
          options={{ title: 'Área do Mecânico' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 