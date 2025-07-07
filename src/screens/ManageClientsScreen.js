import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  FlatList,
  RefreshControl
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { clientService } from '../services/clientService';

export default function ManageClientsScreen() {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadClients();
    }, [])
  );

  useEffect(() => {
    filterClients();
  }, [searchText, clients]);

  const loadClients = async () => {
    try {
      setLoading(true);
      const clientsData = await clientService.getAllClients();
      setClients(clientsData);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  };

  const filterClients = () => {
    if (searchText.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client =>
        client.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        client.cpf.includes(searchText) ||
        (client.email && client.email.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredClients(filtered);
    }
  };

  const handleAddClient = () => {
    navigation.navigate('AddClient');
  };

  const handleEditClient = (client) => {
    navigation.navigate('EditClient', { client });
  };

  const handleDeleteClient = async (client) => {
    setDeletingId(client.uid);
    try {
      await clientService.deleteClient(client.uid);
      await loadClients();
      Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const renderClientCard = ({ item }) => (
    <View style={styles.clientCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.nome}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.clientDetail}><Text style={styles.label}>CPF:</Text> {item.cpf}</Text>
        <Text style={styles.clientDetail}><Text style={styles.label}>Email:</Text> {item.email}</Text>
        <Text style={styles.clientDetail}><Text style={styles.label}>Telefone:</Text> {item.telefone}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditClient(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteClient(item)}
          disabled={deletingId === item.uid}
        >
          <Text style={styles.actionButtonText}>
            {deletingId === item.uid ? 'Excluindo...' : '🗑️ Excluir'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>👤</Text>
      <Text style={styles.emptyStateTitle}>Nenhum cliente encontrado</Text>
      <Text style={styles.emptyStateText}>
        {searchText.trim() !== ''
          ? 'Tente ajustar sua busca'
          : 'Adicione o primeiro cliente clicando no botão +'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Gerenciar Clientes</Text>
          <Text style={styles.subtitle}>
            {filteredClients.length} cliente(s) encontrado(s)
          </Text>
        </View>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, CPF ou email..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredClients}
          renderItem={renderClientCard}
          keyExtractor={item => item.uid}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddClient}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.admin,
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: COLORS.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    flexGrow: 1,
  },
  clientCard: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardBody: {
    marginBottom: 12,
  },
  clientDetail: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
  actionButtonText: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 24,
    color: COLORS.textWhite,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
}); 