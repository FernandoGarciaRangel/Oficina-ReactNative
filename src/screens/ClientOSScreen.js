import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { osService } from '../services/osService';
import { databaseService } from '../services/firebaseService';
import { COLORS } from '../constants/colors';

export default function ClientOSScreen() {
  const { user } = useUser();
  const [osList, setOsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchVehiclesAndOS();
  }, [user]);

  const fetchVehiclesAndOS = async () => {
    setLoading(true);
    try {
      const allVehicles = await databaseService.getDocuments('veiculos');
      const myVehicles = allVehicles.filter(v => v.idCliente === user.uid);
      setVehicles(myVehicles);
      const allOS = await osService.getAllOS();
      // Filtrar OS dos veículos do cliente
      const myOS = allOS.filter(os => myVehicles.some(v => v.placa === os.idVeiculo));
      setOsList(myOS);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar OS ou veículos');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async (os) => {
    if (os.cancelamentoSolicitado) return;
    // Se estiver no web, usar window.confirm
    if (typeof window !== 'undefined' && window.confirm) {
      const confirmed = window.confirm('Deseja realmente solicitar o cancelamento desta OS?');
      if (!confirmed) return;
      console.log('[CANCELAMENTO] Confirmado no window.confirm para OS:', os.uid);
      try {
        await osService.updateOS(os.uid, { cancelamentoSolicitado: true });
        console.log('[CANCELAMENTO] updateOS chamado com sucesso');
        setOsList(prev => prev.map(item =>
          item.uid === os.uid ? { ...item, cancelamentoSolicitado: true } : item
        ));
        alert('Cancelamento solicitado com sucesso!');
      } catch (error) {
        console.error('[CANCELAMENTO] Erro ao solicitar cancelamento:', error);
        alert('Erro ao solicitar cancelamento: ' + (error.message || error));
      }
      return;
    }
    // Fallback para mobile
    Alert.alert(
      'Solicitar Cancelamento',
      'Deseja realmente solicitar o cancelamento desta OS?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            console.log('[CANCELAMENTO] Confirmado no Alert para OS:', os.uid);
            try {
              await osService.updateOS(os.uid, { cancelamentoSolicitado: true });
              console.log('[CANCELAMENTO] updateOS chamado com sucesso');
              setOsList(prev => prev.map(item =>
                item.uid === os.uid ? { ...item, cancelamentoSolicitado: true } : item
              ));
              Alert.alert('Solicitado', 'Cancelamento solicitado com sucesso!');
            } catch (error) {
              console.error('[CANCELAMENTO] Erro ao solicitar cancelamento:', error);
              Alert.alert('Erro', 'Erro ao solicitar cancelamento: ' + (error.message || error));
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>OS: {item.uid}</Text>
      <Text>Veículo: {item.idVeiculo}</Text>
      <Text>Status: {item.status || 'Sem status'}</Text>
      <Text>Descrição: {item.descricao}</Text>
      <Text>Data Início: {item.dataInicio}</Text>
      <Text>Data Fim: {item.dataFim || '-'}</Text>
      {item.cancelamentoSolicitado ? (
        <Text style={styles.cancelRequested}>Cancelamento solicitado</Text>
      ) : (
        <TouchableOpacity
          style={[styles.cancelButton, item.cancelamentoSolicitado && styles.cancelButtonDisabled]}
          onPress={() => {
            console.log('[CANCELAMENTO] Botão pressionado para OS:', item.uid);
            handleCancelRequest(item);
          }}
          disabled={item.cancelamentoSolicitado}
        >
          <Text style={styles.cancelButtonText}>
            {item.cancelamentoSolicitado ? 'Cancelamento Solicitado' : 'Solicitar Cancelamento'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: COLORS.primary },
  card: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  cancelButton: { backgroundColor: COLORS.danger, padding: 10, borderRadius: 8, marginTop: 10 },
  cancelButtonDisabled: { backgroundColor: '#ccc' },
  cancelButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  cancelRequested: { color: COLORS.warning, fontWeight: 'bold', marginTop: 10 },
}); 