import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { databaseService } from '../services/firebaseService';
import { COLORS } from '../constants/colors';

export default function ClientVehiclesScreen() {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ placa: '', modelo: '', marca: '' });

  useEffect(() => {
    if (!user) return;
    fetchVehicles();
  }, [user]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const allVehicles = await databaseService.getDocuments('veiculos');
      const myVehicles = allVehicles.filter(v => v.idCliente === user.uid);
      setVehicles(myVehicles);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar veículos');
    } finally {
      setLoading(false);
    }
  };

  const isValidPlate = (plate) => {
    // Formato brasileiro simples: ABC1D23 ou ABC1234
    return /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$|^[A-Z]{3}[0-9]{4}$/.test(plate.toUpperCase());
  };

  const handleAddVehicle = async () => {
    if (!form.placa || !form.modelo || !form.marca) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    if (!isValidPlate(form.placa)) {
      Alert.alert('Atenção', 'Placa inválida! Use o formato ABC1234 ou ABC1D23.');
      return;
    }
    if (vehicles.some(v => v.placa.toUpperCase() === form.placa.toUpperCase())) {
      Alert.alert('Atenção', 'Você já cadastrou um veículo com essa placa!');
      return;
    }
    try {
      await databaseService.addDocument('veiculos', {
        ...form,
        placa: form.placa.toUpperCase(),
        idCliente: user.uid
      });
      setModalVisible(false);
      setForm({ placa: '', modelo: '', marca: '' });
      setTimeout(fetchVehicles, 300);
      Alert.alert('Sucesso', 'Veículo cadastrado!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar veículo');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.modelo} - {item.marca}</Text>
      <Text>Placa: {item.placa}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Veículos</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Cadastrar Veículo</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={item => item.uid}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum veículo cadastrado.</Text>}
        />
      )}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Veículo</Text>
            <TextInput
              style={styles.input}
              placeholder="Placa"
              value={form.placa}
              onChangeText={v => setForm(f => ({ ...f, placa: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Modelo"
              value={form.modelo}
              onChangeText={v => setForm(f => ({ ...f, modelo: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={form.marca}
              onChangeText={v => setForm(f => ({ ...f, marca: v }))}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddVehicle}>
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
  addButton: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
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