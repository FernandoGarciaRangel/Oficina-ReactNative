import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { databaseService } from '../services/firebaseService';
import { osService } from '../services/osService';
import { mechanicService } from '../services/mechanicService';
import DateInput from '../components/DateInput';

export default function ManagePreOSScreen() {
  const navigation = useNavigation();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mecanicos, setMecanicos] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState(null);
  const [preco, setPreco] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [descricao, setDescricao] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadSolicitacoes();
    loadMecanicos();
  }, []);

  const loadSolicitacoes = async () => {
    setLoading(true);
    try {
      const allSolicitacoes = await databaseService.getDocuments('preos');
      // Ordenar por data de criação (mais recentes primeiro)
      const sortedSolicitacoes = allSolicitacoes.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSolicitacoes(sortedSolicitacoes);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar solicitações');
    } finally {
      setLoading(false);
    }
  };

  const loadMecanicos = async () => {
    try {
      const allMecanicos = await mechanicService.getAllMechanics();
      setMecanicos(allMecanicos);
    } catch (error) {
      console.error('Erro ao carregar mecânicos:', error);
    }
  };

  const handleAceitarSolicitacao = (solicitacao) => {
    setSelectedSolicitacao(solicitacao);
    setDescricao(solicitacao.descricao);
    setModalVisible(true);
  };

  const handleRejeitarSolicitacao = async (solicitacao) => {
    Alert.alert(
      'Rejeitar Solicitação',
      'Deseja realmente rejeitar esta solicitação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Rejeitar',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseService.updateDocument('preos', solicitacao.uid, {
                ...solicitacao,
                status: 'Rejeitada',
                updatedAt: new Date().toISOString()
              });
              await loadSolicitacoes();
              Alert.alert('Sucesso', 'Solicitação rejeitada com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao rejeitar solicitação');
            }
          }
        }
      ]
    );
  };

  const handleCriarOS = async () => {

    // Validação detalhada
    if (!selectedMecanico) {
      Alert.alert('Atenção', 'Selecione um mecânico!');
      return;
    }
    if (!preco.trim()) {
      Alert.alert('Atenção', 'Preencha o preço!');
      return;
    }
    if (isNaN(Number(preco))) {
      Alert.alert('Atenção', 'Preço deve ser um número válido!');
      return;
    }
    if (!dataInicio.trim()) {
      Alert.alert('Atenção', 'Preencha a data de início! (formato: 2024-01-15)');
      return;
    }
    if (!dataFim.trim()) {
      Alert.alert('Atenção', 'Preencha a data de fim! (formato: 2024-01-20)');
      return;
    }
    if (dataInicio.length < 8 || dataFim.length < 8) {
      Alert.alert('Atenção', 'Preencha datas válidas (formato: YYYY-MM-DD)!');
      return;
    }
    
    // Validação adicional para formato de data
    const dataInicioRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dataFimRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dataInicioRegex.test(dataInicio)) {
      Alert.alert('Atenção', 'Data de início deve estar no formato YYYY-MM-DD!');
      return;
    }
    
    if (!dataFimRegex.test(dataFim)) {
      Alert.alert('Atenção', 'Data de fim deve estar no formato YYYY-MM-DD!');
      return;
    }
    if (!selectedSolicitacao) {
      Alert.alert('Erro', 'Solicitação não encontrada!');
      return;
    }
    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Descrição não pode estar vazia!');
      return;
    }
    
    setProcessing(true);
    try {
      // Criar a OS
      const novaOS = await osService.addOS({
        preco: Number(preco),
        dataInicio: dataInicio.trim(),
        dataFim: dataFim.trim(),
        descricao: descricao.trim(),
        idVeiculo: selectedSolicitacao.idVeiculo,
        idCliente: selectedSolicitacao.idCliente,
        idMecanico: selectedMecanico.uid,
        status: 'Em Andamento'
      });

      // Atualizar status da solicitação
      await databaseService.updateDocument('preos', selectedSolicitacao.uid, {
        ...selectedSolicitacao,
        status: 'Aprovada',
        idOS: novaOS.uid,
        updatedAt: new Date().toISOString()
      });

      setModalVisible(false);
      setSelectedSolicitacao(null);
      setSelectedMecanico(null);
      setPreco('');
      setDataInicio('');
      setDataFim('');
      setDescricao('');
      
      await loadSolicitacoes();
      Alert.alert('Sucesso', 'OS criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar OS:', error);
      Alert.alert('Erro', 'Erro ao criar OS: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const renderSolicitacao = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Solicitação #{item.uid.slice(-6)}</Text>
        <Text style={[
          styles.status,
          item.status === 'Pendente' ? styles.statusPendente :
          item.status === 'Aprovada' ? styles.statusAprovada :
          styles.statusRejeitada
        ]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{item.idCliente}</Text>
        
        <Text style={styles.label}>Veículo:</Text>
        <Text style={styles.value}>{item.idVeiculo}</Text>
        
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{item.descricao}</Text>
        
        <Text style={styles.label}>Data de Solicitação:</Text>
        <Text style={styles.value}>
          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      {item.status === 'Pendente' && (
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleAceitarSolicitacao(item)}
          >
            <Text style={styles.actionButtonText}>✓ Aceitar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejeitarSolicitacao(item)}
          >
            <Text style={styles.actionButtonText}>✗ Rejeitar</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'Aprovada' && item.idOS && (
        <View style={styles.cardActions}>
          <Text style={styles.osCreated}>OS Criada: #{item.idOS}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Gerenciar Solicitações</Text>
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
              <Text style={styles.emptyText}>Nenhuma solicitação encontrada</Text>
            </View>
          }
        />
      )}

      {/* Modal para criar OS */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar OS</Text>
            <Text style={styles.modalSubtitle}>Preencha todos os campos obrigatórios</Text>
            
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalLabel}>Mecânico:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.mecanicosContainer}>
                  {mecanicos.map(mecanico => (
                    <TouchableOpacity
                      key={mecanico.uid}
                      style={[
                        styles.mecanicoButton,
                        selectedMecanico?.uid === mecanico.uid && styles.mecanicoButtonSelected
                      ]}
                      onPress={() => setSelectedMecanico(mecanico)}
                    >
                      <Text style={styles.mecanicoButtonText}>
                        {mecanico.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={styles.modalLabel}>Preço (R$):</Text>
              <TextInput
                style={styles.modalInput}
                value={preco}
                onChangeText={setPreco}
                placeholder="0.00"
                keyboardType="numeric"
              />

              <Text style={styles.modalLabel}>Data de Início:</Text>
              <DateInput
                value={dataInicio}
                onChange={setDataInicio}
                style={styles.modalInput}
              />

              <Text style={styles.modalLabel}>Data de Fim:</Text>
              <DateInput
                value={dataFim}
                onChange={setDataFim}
                style={styles.modalInput}
              />

              <Text style={styles.modalLabel}>Descrição:</Text>
              <TextInput
                style={[styles.modalInput, { height: 80 }]}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição do serviço"
                multiline
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                disabled={processing}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCriarOS}
                disabled={processing}
              >
                <Text style={styles.modalButtonText}>
                  {processing ? 'Criando...' : 'Criar OS'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  statusPendente: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusAprovada: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusRejeitada: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
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
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 14,
  },
  osCreated: {
    color: COLORS.success,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalLabel: {
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginTop: 12,
    marginBottom: 4,
  },
  mecanicosContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  mecanicoButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mecanicoButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  mecanicoButtonText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: COLORS.background,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
  },
  createButton: {
    backgroundColor: COLORS.success,
  },
  modalButtonText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 