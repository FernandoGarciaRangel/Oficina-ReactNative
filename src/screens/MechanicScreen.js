import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

export default function MechanicScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  // Verificar se usuário tem permissão de mecânico
  React.useEffect(() => {
    if (user && user.funcao !== 'mecanico') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta área.');
      navigation.goBack();
    }
  }, [user, navigation]);

  const handlePendingServices = () => {
    Alert.alert('Serviços Pendentes', 'Funcionalidade será implementada em breve');
    // navigation.navigate('PendingServices');
  };

  const handleInProgressServices = () => {
    Alert.alert('Em Andamento', 'Funcionalidade será implementada em breve');
    // navigation.navigate('InProgressServices');
  };

  const handleServiceHistory = () => {
    Alert.alert('Histórico', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ServiceHistory');
  };

  const handleMyOS = () => {
    navigation.navigate('MechanicOS');
  };

  const handleProductConsultation = () => {
    navigation.navigate('MechanicProductConsultation');
  };

  const handleUpdateServiceStatus = () => {
    Alert.alert('Atualizar Status', 'Funcionalidade será implementada em breve');
    // navigation.navigate('UpdateServiceStatus');
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
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  // Se não é mecânico, não renderizar
  if (user?.funcao !== 'mecanico') {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Área do Mecânico</Text>
          <Text style={styles.subtitle}>Gerencie seus serviços e atividades</Text>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>Mecânico</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card} onPress={handleMyOS}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Minhas OS</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Visualizar e alterar suas ordens de serviço</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleProductConsultation}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Consulta de Produtos</Text>
              <Text style={styles.cardIcon}>📦</Text>
            </View>
            <Text style={styles.cardDescription}>Verificar estoque e produtos disponíveis</Text>
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
    backgroundColor: '#ffc107',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
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
    color: '#ffc107',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userRole: {
    fontSize: 12,
    color: '#ffc107',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 