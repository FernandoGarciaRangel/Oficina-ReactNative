import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { productService } from '../services/productService';
import { COLORS } from '../constants/colors';

export default function MechanicProductConsultationScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await productService.getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      // Pode adicionar um Alert se quiser
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(prod =>
    prod.nome?.toLowerCase().includes(search.toLowerCase()) ||
    prod.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Código: {item.codigo}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Preço: R$ {item.precoAtual}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome ou código..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.uid}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: COLORS.primary },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 },
  card: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
}); 