import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { databaseService } from '../services/firebaseService';
import { COLORS } from '../constants/colors';

export default function ClientMyRequestsScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadSolicitacoes();
  }, [user]);

  const loadSolicitacoes = async () => {
    setLoading(true);
    try {
      const allSolicitacoes = await databaseService.getDocuments('preos');
      // Filtrar apenas solicitações do cliente logado
      const mySolicitacoes = allSolicitacoes.filter(s => s.idCliente === user.uid);
      // Ordenar por data de criação (mais recentes primeiro)
      const sortedSolicitacoes = mySolicitacoes.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSolicitacoes(sortedSolicitacoes);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar solicitações');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'Aprovada':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'Rejeitada':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pendente':
        return 'Aguardando análise do administrador';
      case 'Aprovada':
        return 'Solicitação aprovada! OS foi criada.';
      case 'Rejeitada':
        return 'Solicitação rejeitada pelo administrador';
      default:
        return 'Status desconhecido';
    }
  };

  const renderSolicitacao = ({ item }) => {
    const statusStyle = getStatusColor(item.status);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Solicitação #{item.uid.slice(-6)}</Text>
          <Text style={[styles.status, statusStyle]}>
            {item.status}
          </Text>
        </View>
        
        <View style={styles.cardBody}>
          <Text style={styles.label}>Veículo:</Text>
          <Text style={styles.value}>{item.idVeiculo}</Text>
          
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{item.descricao}</Text>
          
          <Text style={styles.label}>Data de Solicitação:</Text>
          <Text style={styles.value}>
            {new Date(item.createdAt).toLocaleDateString('pt-BR')} às{' '}
            {new Date(item.createdAt).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
          
          {item.updatedAt && (
            <>
              <Text style={styles.label}>Última Atualização:</Text>
              <Text style={styles.value}>
                {new Date(item.updatedAt).toLocaleDateString('pt-BR')} às{' '}
                {new Date(item.updatedAt).toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </>
          )}
          
          {item.idOS && (
            <>
              <Text style={styles.label}>OS Criada:</Text>
              <Text style={styles.value}>#{item.idOS}</Text>
            </>
          )}
        </View>

        <View style={styles.cardFooter}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Solicitações</Text>
        <View style={{ width: 60 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando solicitações...</Text>
        </View>
      ) : (
        <FlatList
          data={solicitacoes}
          keyExtractor={item => item.uid}
          renderItem={renderSolicitacao}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhuma solicitação encontrada</Text>
              <Text style={styles.emptyText}>
                Você ainda não enviou solicitações de serviço.
              </Text>
              <TouchableOpacity 
                style={styles.newRequestButton}
                onPress={() => navigation.navigate('ClientPreOS')}
              >
                <Text style={styles.newRequestButtonText}>Fazer Primeira Solicitação</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
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
    backgroundColor: COLORS.primary,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  listContainer: {
    padding: 20,
    flexGrow: 1,
  },
  card: {
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
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardBody: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 4,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  newRequestButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  newRequestButtonText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 