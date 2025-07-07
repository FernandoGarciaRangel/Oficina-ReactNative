import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

export default function AdminScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  // Verificar se usuário tem permissão de admin
  React.useEffect(() => {
    if (user && user.funcao !== 'admin') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta área.');
      navigation.goBack();
    }
  }, [user, navigation]);

  const handleManageMechanics = () => {
    navigation.navigate('ManageMechanics');
  };

  const handleManageClients = () => {
    navigation.navigate('ManageClients');
  };

  const handleManageProducts = () => {
    navigation.navigate('ManageProducts');
  };

  const handleManageOS = () => {
    navigation.navigate('ManageOS');
  };

  const handleManagePreOS = () => {
    navigation.navigate('ManagePreOS');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Erro ao fazer logout');
      // Mesmo com erro, forçar navegação para login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  // Se não é admin, não renderizar
  if (user?.funcao !== 'admin') {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Painel do Administrador</Text>
          <Text style={styles.subtitle}>Gerencie todos os aspectos do sistema</Text>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>Administrador</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card} onPress={handleManageMechanics}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Gerenciar Mecânicos</Text>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <Text style={styles.cardDescription}>Adicionar, remover ou editar mecânicos</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleManageClients}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Gerenciar Clientes</Text>
              <Text style={styles.cardIcon}>👥</Text>
            </View>
            <Text style={styles.cardDescription}>Visualizar e gerenciar cadastros de clientes</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleManageProducts}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Gerenciar Produtos</Text>
              <Text style={styles.cardIcon}>📦</Text>
            </View>
            <Text style={styles.cardDescription}>Controle de estoque e produtos</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleManageOS}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Gerenciar OS</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Ordens de serviço e acompanhamento</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleManagePreOS}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Solicitações de Serviço</Text>
              <Text style={styles.cardIcon}>📝</Text>
            </View>
            <Text style={styles.cardDescription}>Aprovar e gerenciar solicitações de clientes</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardStatus: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#ccc',
  },
  userRole: {
    fontSize: 14,
    color: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 