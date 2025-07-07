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
import { osService } from '../services/osService';

export default function ManageOSScreen() {
  const navigation = useNavigation();
  const [osList, setOsList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredOS, setFilteredOS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadOS();
    }, [])
  );

  useEffect(() => {
    filterOS();
  }, [searchText, osList]);

  const loadOS = async () => {
    try {
      setLoading(true);
      const osData = await osService.getAllOS();
      setOsList(osData);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOS();
    setRefreshing(false);
  };

  const filterOS = () => {
    if (searchText.trim() === '') {
      setFilteredOS(osList);
    } else {
      const filtered = osList.filter(os =>
        os.descricao.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOS(filtered);
    }
  };

  const handleAddOS = () => {
    navigation.navigate('AddOS');
  };

  const handleEditOS = (os) => {
    navigation.navigate('EditOS', { os });
  };

  const handleDeleteOS = async (os) => {
    setDeletingId(os.uid);
    try {
      await osService.deleteOS(os.uid);
      await loadOS();
      setSuccessMessage('OS excluída com sucesso! Redirecionando...');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtra OS com solicitação de cancelamento
  const osCancelamento = osList.filter(os => os.cancelamentoSolicitado);

  const renderCancelamentoCard = (item) => (
    <View style={[styles.osCard, styles.cancelCard]} key={item.uid}>
      <View style={styles.cardHeader}>
        <Text style={[styles.osDescricao, { color: COLORS.danger }]}>Solicitação de Cancelamento</Text>
        <Text style={styles.osPreco}>Preço: R$ {Number(item.preco).toFixed(2)}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.osDetail}><Text style={styles.label}>Descrição:</Text> {item.descricao}</Text>
        <Text style={styles.osDetail}><Text style={styles.label}>Início:</Text> {item.dataInicio}</Text>
        <Text style={styles.osDetail}><Text style={styles.label}>Fim:</Text> {item.dataFim}</Text>
        <Text style={[styles.cancelStatus, { color: COLORS.danger }]}>Cancelamento solicitado pelo cliente</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditOS(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Analisar/Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteOS(item)}
          disabled={deletingId === item.uid}
        >
          <Text style={styles.actionButtonText}>
            {deletingId === item.uid ? 'Excluindo...' : '🗑️ Excluir'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOSCard = ({ item }) => (
    <View style={styles.osCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.osDescricao}>{item.descricao}</Text>
        <Text style={styles.osPreco}>Preço: R$ {Number(item.preco).toFixed(2)}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.osDetail}><Text style={styles.label}>Início:</Text> {item.dataInicio}</Text>
        <Text style={styles.osDetail}><Text style={styles.label}>Fim:</Text> {item.dataFim}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditOS(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteOS(item)}
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
      <Text style={styles.emptyStateIcon}>📋</Text>
      <Text style={styles.emptyStateTitle}>Nenhuma OS encontrada</Text>
      <Text style={styles.emptyStateText}>
        {searchText.trim() !== ''
          ? 'Tente ajustar sua busca'
          : 'Adicione a primeira OS clicando no botão +'}
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
          <Text style={styles.title}>Gerenciar OS</Text>
          <Text style={styles.subtitle}>
            {filteredOS.length} OS(s) encontrada(s)
          </Text>
        </View>
        <View style={{ width: 60 }} />
      </View>
      {successMessage ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por descrição..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.content}>
        {/* Sessão de solicitações de cancelamento */}
        {osCancelamento.length > 0 && (
          <View style={styles.cancelSection}>
            <Text style={styles.cancelSectionTitle}>Solicitações de Cancelamento</Text>
            {osCancelamento.map(renderCancelamentoCard)}
          </View>
        )}
        <FlatList
          data={filteredOS}
          renderItem={renderOSCard}
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
        onPress={handleAddOS}
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
  osCard: {
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
  osDescricao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  osPreco: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  cardBody: {
    marginBottom: 12,
  },
  osDetail: {
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
  successContainer: {
    backgroundColor: COLORS.success,
    padding: 12,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  successText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
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
  cancelSection: {
    backgroundColor: '#fff0f0',
    borderRadius: 12,
    padding: 12,
    margin: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  cancelSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.danger,
    marginBottom: 8,
    textAlign: 'center',
  },
  cancelCard: {
    borderColor: COLORS.danger,
    borderWidth: 2,
    backgroundColor: '#fff5f5',
  },
  cancelStatus: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
  },
}); 