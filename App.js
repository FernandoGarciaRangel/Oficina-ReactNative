import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdminScreen from './src/screens/AdminScreen';
import ClientScreen from './src/screens/ClientScreen';
import MechanicScreen from './src/screens/MechanicScreen';
import ManageMechanicsScreen from './src/screens/ManageMechanicsScreen';
import AddMechanicScreen from './src/screens/AddMechanicScreen';
import EditMechanicScreen from './src/screens/EditMechanicScreen';
import ManageClientsScreen from './src/screens/ManageClientsScreen';
import AddClientScreen from './src/screens/AddClientScreen';
import EditClientScreen from './src/screens/EditClientScreen';
import ManageProductsScreen from './src/screens/ManageProductsScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import EditProductScreen from './src/screens/EditProductScreen';
import ManageOSScreen from './src/screens/ManageOSScreen';
import AddOSScreen from './src/screens/AddOSScreen';
import EditOSScreen from './src/screens/EditOSScreen';
import MechanicOSScreen from './src/screens/MechanicOSScreen';
import MechanicProductConsultationScreen from './src/screens/MechanicProductConsultationScreen';
import ClientVehiclesScreen from './src/screens/ClientVehiclesScreen';
import ClientOSScreen from './src/screens/ClientOSScreen';
import ClientPreOSScreen from './src/screens/ClientPreOSScreen';
import ClientMyRequestsScreen from './src/screens/ClientMyRequestsScreen';
import ManagePreOSScreen from './src/screens/ManagePreOSScreen';
import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
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
          <Stack.Screen 
            name="ManageMechanics" 
            component={ManageMechanicsScreen} 
            options={{ 
              title: 'Gerenciar Mecânicos',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="AddMechanic" 
            component={AddMechanicScreen} 
            options={{ 
              title: 'Adicionar Mecânico',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="EditMechanic" 
            component={EditMechanicScreen} 
            options={{ 
              title: 'Editar Mecânico',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="ManageClients" 
            component={ManageClientsScreen} 
            options={{ 
              title: 'Gerenciar Clientes',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="AddClient" 
            component={AddClientScreen} 
            options={{ 
              title: 'Adicionar Cliente',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="EditClient" 
            component={EditClientScreen} 
            options={{ 
              title: 'Editar Cliente',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="ManageProducts" 
            component={ManageProductsScreen} 
            options={{ 
              title: 'Gerenciar Produtos',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="AddProduct" 
            component={AddProductScreen} 
            options={{ 
              title: 'Adicionar Produto',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="EditProduct" 
            component={EditProductScreen} 
            options={{ 
              title: 'Editar Produto',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="ManageOS" 
            component={ManageOSScreen} 
            options={{ 
              title: 'Gerenciar OS',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="AddOS" 
            component={AddOSScreen} 
            options={{ 
              title: 'Adicionar OS',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="EditOS" 
            component={EditOSScreen} 
            options={{ 
              title: 'Editar OS',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="MechanicOS" 
            component={MechanicOSScreen} 
            options={{ title: 'Minhas OS' }} 
          />
          <Stack.Screen 
            name="MechanicProductConsultation" 
            component={MechanicProductConsultationScreen} 
            options={{ title: 'Consulta de Produtos' }} 
          />
          <Stack.Screen 
            name="ClientVehicles" 
            component={ClientVehiclesScreen} 
            options={{ title: 'Meus Veículos' }} 
          />
          <Stack.Screen 
            name="ClientOS" 
            component={ClientOSScreen} 
            options={{ title: 'Minhas OS' }} 
          />
          <Stack.Screen 
            name="ClientPreOS" 
            component={ClientPreOSScreen} 
            options={{ title: 'Contratar Serviço' }} 
          />
          <Stack.Screen 
            name="ClientMyRequests" 
            component={ClientMyRequestsScreen} 
            options={{ 
              title: 'Minhas Solicitações',
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="ManagePreOS" 
            component={ManagePreOSScreen} 
            options={{ 
              title: 'Gerenciar Solicitações',
              headerShown: false 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
} 