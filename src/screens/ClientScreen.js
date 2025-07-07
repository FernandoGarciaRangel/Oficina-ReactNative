import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

export default function ClientScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  // Verificar se usuário tem permissão de cliente
  React.useEffect(() => {
    if (user && user.funcao !== 'cliente') {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta área.');
      navigation.goBack();
    }
  }, [user, navigation]);

  const handleScheduleService = () => {
    Alert.alert('Agendar Serviço', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ScheduleService');
  };

  const handleMyServices = () => {
    Alert.alert('Meus Serviços', 'Funcionalidade será implementada em breve');
    // navigation.navigate('MyServices');
  };

  const handleServiceHistory = () => {
    Alert.alert('Histórico', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ServiceHistory');
  };

  const handleMyVehicles = () => {
    navigation.navigate('ClientVehicles');
  };

  const handleMyOS = () => {
    navigation.navigate('ClientOS');
  };

  const handlePreOS = () => {
    navigation.navigate('ClientPreOS');
  };

  const handleMyRequests = () => {
    navigation.navigate('ClientMyRequests');
  };

  const handleServiceStatus = () => {
    Alert.alert('Status do Serviço', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ServiceStatus');
  };

  const handleContactMechanic = () => {
    Alert.alert('Contatar Mecânico', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ContactMechanic');
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

  // Se não é cliente, não renderizar
  if (user?.funcao !== 'cliente') {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Área do Cliente</Text>
          <Text style={styles.subtitle}>Gerencie seus serviços e veículos</Text>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>Cliente</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card} onPress={handleMyVehicles}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Meus Veículos</Text>
              <Text style={styles.cardIcon}>🚗</Text>
            </View>
            <Text style={styles.cardDescription}>Gerenciar veículos cadastrados</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleMyOS}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Minhas OS</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Consultar e solicitar cancelamento de OS</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handlePreOS}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Contratar Serviço</Text>
              <Text style={styles.cardIcon}>📝</Text>
            </View>
            <Text style={styles.cardDescription}>Solicitar um novo serviço (pré-OS)</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleMyRequests}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Minhas Solicitações</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Acompanhar status das solicitações enviadas</Text>
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
    backgroundColor: '#28a745',
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
    color: '#e8f5e8',
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
    color: '#28a745',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#28a745',
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
    backgroundColor: '#28a745',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#e8f5e8',
    marginRight: 10,
  },
  userRole: {
    fontSize: 14,
    color: '#e8f5e8',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
}); 