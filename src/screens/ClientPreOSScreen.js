import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';
import { databaseService } from '../services/firebaseService';
import { COLORS } from '../constants/colors';

export default function ClientPreOSScreen() {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [sending, setSending] = useState(false);

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

  const handleSend = async () => {
    if (!selectedVehicle || !descricao.trim()) {
      Alert.alert('Atenção', 'Selecione um veículo e preencha a descrição!');
      return;
    }
    setSending(true);
    try {
      await databaseService.addDocument('preos', {
        idCliente: user.uid,
        idVeiculo: selectedVehicle.placa,
        descricao: descricao.trim(),
        status: 'Pendente',
        createdAt: new Date().toISOString()
      });
      setDescricao('');
      setSelectedVehicle(null);
      Alert.alert('Sucesso', 'Solicitação enviada para análise!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar solicitação');
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contratar Serviço</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : vehicles.length === 0 ? (
        <Text style={styles.empty}>Cadastre um veículo antes de contratar um serviço.</Text>
      ) : (
        <>
          <Text style={styles.label}>Selecione o veículo:</Text>
          {vehicles.map(v => (
            <TouchableOpacity
              key={v.uid}
              style={[styles.vehicleButton, selectedVehicle?.uid === v.uid && styles.vehicleButtonSelected]}
              onPress={() => setSelectedVehicle(v)}
            >
              <Text style={styles.vehicleText}>{v.modelo} - {v.marca} ({v.placa})</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.label}>Descrição do serviço desejado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o serviço que deseja contratar..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={sending}>
            <Text style={styles.sendButtonText}>{sending ? 'Enviando...' : 'Enviar Solicitação'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: COLORS.primary },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  vehicleButton: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#ccc' },
  vehicleButtonSelected: { borderColor: COLORS.primary, backgroundColor: '#e6f0ff' },
  vehicleText: { fontSize: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12, minHeight: 60 },
  sendButton: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
}); 