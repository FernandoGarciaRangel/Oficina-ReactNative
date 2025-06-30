import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();

  const handleManageMechanics = () => {
    navigation.navigate('ManageMechanics');
  };

  const handleManageClients = () => {
    Alert.alert('Gerenciar Clientes', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ManageClients');
  };

  const handleManageProducts = () => {
    Alert.alert('Gerenciar Produtos', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ManageProducts');
  };

  const handleManageOS = () => {
    Alert.alert('Gerenciar OS', 'Funcionalidade será implementada em breve');
    // navigation.navigate('ManageOS');
  };

  const handleReports = () => {
    Alert.alert('Relatórios', 'Funcionalidade será implementada em breve');
    // navigation.navigate('Reports');
  };

  const handleSettings = () => {
    Alert.alert('Configurações', 'Funcionalidade será implementada em breve');
    // navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Painel do Administrador</Text>
          <Text style={styles.subtitle}>Gerencie todos os aspectos do sistema</Text>
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

          <TouchableOpacity style={styles.card} onPress={handleReports}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Relatórios</Text>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardDescription}>Acessar relatórios de serviços e faturamento</Text>
            <Text style={styles.cardStatus}>Em desenvolvimento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleSettings}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Configurações</Text>
              <Text style={styles.cardIcon}>⚙️</Text>
            </View>
            <Text style={styles.cardDescription}>Configurar parâmetros do sistema</Text>
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
}); 