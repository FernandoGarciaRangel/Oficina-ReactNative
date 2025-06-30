import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MechanicScreen() {
  const navigation = useNavigation();

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

  const handleProductConsultation = () => {
    Alert.alert('Consulta de Produtos', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ProductConsultation');
  };

  const handleReports = () => {
    Alert.alert('Relatórios', 'Funcionalidade será implementada em breve');
    // navigation.navigate('Reports');
  };

  const handleUpdateServiceStatus = () => {
    Alert.alert('Atualizar Status', 'Funcionalidade será implementada em breve');
    // navigation.navigate('UpdateServiceStatus');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Área do Mecânico</Text>
          <Text style={styles.subtitle}>Gerencie seus serviços e atividades</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card} onPress={handlePendingServices}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Serviços Pendentes</Text>
              <Text style={styles.cardIcon}>⏳</Text>
            </View>
            <Text style={styles.cardDescription}>Visualizar e iniciar novos serviços</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleInProgressServices}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Em Andamento</Text>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <Text style={styles.cardDescription}>Gerenciar serviços em execução</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleUpdateServiceStatus}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Atualizar Status</Text>
              <Text style={styles.cardIcon}>📝</Text>
            </View>
            <Text style={styles.cardDescription}>Atualizar progresso dos serviços</Text>
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

          <TouchableOpacity style={styles.card} onPress={handleServiceHistory}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Histórico</Text>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardDescription}>Visualizar serviços concluídos</Text>
            <Text style={styles.cardStatus}>Disponível</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleReports}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Relatórios</Text>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardDescription}>Gerar relatórios de serviços</Text>
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
}); 