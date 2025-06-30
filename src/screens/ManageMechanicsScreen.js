import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  RefreshControl
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { ICONS } from '../constants/icons';
import { TEXTS } from '../constants/texts';
import { mechanicService } from '../services/mechanicService';

export default function ManageMechanicsScreen() {
  const navigation = useNavigation();
  const [mechanics, setMechanics] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Carrega os mecânicos quando a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      loadMechanics();
    }, [])
  );

  useEffect(() => {
    filterMechanics();
  }, [searchText, mechanics]);

  const loadMechanics = async () => {
    try {
      setLoading(true);
      const mechanicsData = await mechanicService.getAllMechanics();
      setMechanics(mechanicsData);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMechanics();
    setRefreshing(false);
  };

  const filterMechanics = () => {
    if (searchText.trim() === '') {
      setFilteredMechanics(mechanics);
    } else {
      const filtered = mechanics.filter(mechanic =>
        mechanic.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        mechanic.especialidade.toLowerCase().includes(searchText.toLowerCase()) ||
        mechanic.cpf.includes(searchText)
      );
      setFilteredMechanics(filtered);
    }
  };

  const handleAddMechanic = () => {
    navigation.navigate('AddMechanic');
  };

  const handleEditMechanic = (mechanic) => {
    navigation.navigate('EditMechanic', { mechanic });
  };

  const handleDeleteMechanic = async (mechanic) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o mecânico ${mechanic.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await mechanicService.deleteMechanic(mechanic.uid);
              await loadMechanics(); // Recarrega a lista
              Alert.alert('Sucesso', 'Mecânico excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', error.message);
            }
          }
        }
      ]
    );
  };

  const toggleStatus = async (mechanic) => {
    try {
      const newStatus = mechanic.status === 'ativo' ? 'inativo' : 'ativo';
      await mechanicService.updateMechanicStatus(mechanic.uid, newStatus);
      await loadMechanics(); // Recarrega a lista
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const renderMechanicCard = ({ item }) => (
    <View style={styles.mechanicCard}>
      <View style={styles.cardHeader}>
        <View style={styles.mechanicInfo}>
          <Text style={styles.mechanicName}>{item.nome}</Text>
          <Text style={styles.mechanicSpecialty}>{item.especialidade}</Text>
        </View>
        <View style={[styles.statusBadge, 
          item.status === 'ativo' ? styles.statusActive : styles.statusInactive]}>
          <Text style={styles.statusText}>
            {item.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.mechanicDetail}>
          <Text style={styles.label}>CPF:</Text> {item.cpf}
        </Text>
        <Text style={styles.mechanicDetail}>
          <Text style={styles.label}>Email:</Text> {item.email}
        </Text>
        <Text style={styles.mechanicDetail}>
          <Text style={styles.label}>Telefone:</Text> {item.telefone}
        </Text>
        {item.matricula && (
          <Text style={styles.mechanicDetail}>
            <Text style={styles.label}>Matrícula:</Text> {item.matricula}
          </Text>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditMechanic(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.statusButton]}
          onPress={() => toggleStatus(item)}
        >
          <Text style={styles.actionButtonText}>
            {item.status === 'ativo' ? '⏸️ Pausar' : '▶️ Ativar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMechanic(item)}
        >
          <Text style={styles.actionButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🔧</Text>
      <Text style={styles.emptyStateTitle}>Nenhum mecânico encontrado</Text>
      <Text style={styles.emptyStateText}>
        {searchText.trim() !== '' 
          ? 'Tente ajustar sua busca'
          : 'Adicione o primeiro mecânico clicando no botão +'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Mecânicos</Text>
        <Text style={styles.subtitle}>
          {filteredMechanics.length} mecânico(s) encontrado(s)
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, especialidade ou CPF..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.content}>
        <FlatList
          data={filteredMechanics}
          renderItem={renderMechanicCard}
          keyExtractor={item => item.id}
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
        onPress={handleAddMechanic}
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
  header: {
    backgroundColor: COLORS.admin,
    padding: 20,
    alignItems: 'center',
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
  mechanicCard: {
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
  mechanicInfo: {
    flex: 1,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  mechanicSpecialty: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: COLORS.success,
  },
  statusInactive: {
    backgroundColor: COLORS.danger,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  cardBody: {
    marginBottom: 12,
  },
  mechanicDetail: {
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
  statusButton: {
    backgroundColor: COLORS.warning,
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
    paddingHorizontal: 40,
  },
}); 