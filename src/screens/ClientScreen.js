import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ClientScreen() {
  const navigation = useNavigation();

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
    Alert.alert('Meus Veículos', 'Funcionalidade será implementada em breve');
    // navigation.navigate('MyVehicles');
  };

  const handleServiceStatus = () => {
    Alert.alert('Status do Serviço', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ServiceStatus');
  };

  const handleContactMechanic = () => {
    Alert.alert('Contatar Mecânico', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ContactMechanic');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Área do Cliente</Text>
          <Text style={styles.subtitle}>Gerencie seus serviços e veículos</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card} onPress={handleScheduleService}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Agendar Serviço</Text>
              <Text style={styles.cardIcon}>📅</Text>
            </View>
            <Text style={styles.cardDescription}>Marcar um novo serviço na oficina</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleMyServices}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Meus Serviços</Text>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <Text style={styles.cardDescription}>Acompanhar serviços em andamento</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleServiceStatus}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Status do Serviço</Text>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardDescription}>Verificar progresso dos serviços</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleServiceHistory}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Histórico</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Visualizar histórico de serviços</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleMyVehicles}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Meus Veículos</Text>
              <Text style={styles.cardIcon}>🚗</Text>
            </View>
            <Text style={styles.cardDescription}>Gerenciar veículos cadastrados</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleContactMechanic}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Contatar Mecânico</Text>
              <Text style={styles.cardIcon}>💬</Text>
            </View>
            <Text style={styles.cardDescription}>Comunicar com o mecânico responsável</Text>
            <Text style={styles.cardStatus}>Em desenvolvimento</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
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
}); 