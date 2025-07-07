import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal, TextInput } from 'react-native';
import { useUser } from '../context/UserContext';
import { osService } from '../services/osService';
import { COLORS } from '../constants/colors';

export default function MechanicOSScreen({ navigation }) {
  const { user } = useUser();
  const [osList, setOsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOS, setSelectedOS] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchOS();
  }, [user]);

  const fetchOS = async () => {
    setLoading(true);
    try {
      const allOS = await osService.getOSByMechanic(user.uid);
      setOsList(allOS);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar OS');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (os) => {
    setSelectedOS(os);
    setStatus(os.status || '');
    setObservacoes(os.observacoes || '');
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      await osService.updateOS(selectedOS.uid, { status, observacoes });
      setModalVisible(false);
      setTimeout(fetchOS, 300);
      Alert.alert('Sucesso', 'OS atualizada com sucesso!');
    } catch (error) {
      setModalVisible(false);
      setTimeout(fetchOS, 300);
      Alert.alert('Erro', 'Erro ao atualizar OS');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openEditModal(item)}>
      <Text style={styles.title}>OS: {item.uid}</Text>
      <Text>Veículo: {item.idVeiculo}</Text>
      <Text>Status: {item.status || 'Sem status'}</Text>
      <Text>Descrição: {item.descricao}</Text>
      <Text>Data Início: {item.dataInicio}</Text>
      <Text>Data Fim: {item.dataFim || '-'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Ordens de Serviço</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={osList}
          keyExtractor={item => item.uid}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma OS encontrada.</Text>}
        />
      )}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar OS</Text>
            <Text>Status:</Text>
            <TextInput
              style={styles.input}
              value={status}
              onChangeText={setStatus}
              placeholder="Status"
            />
            <Text>Observações:</Text>
            <TextInput
              style={[styles.input, { height: 60 }]}
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Observações"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: COLORS.primary },
  card: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 20, width: '85%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 8 },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { backgroundColor: COLORS.danger, padding: 10, borderRadius: 8 },
  cancelButtonText: { color: '#fff', fontWeight: 'bold' },
}); 