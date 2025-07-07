import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { productService } from '../services/productService';

export default function EditProductScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const [codigo, setCodigo] = useState(product.codigo || '');
  const [nome, setNome] = useState(product.nome || '');
  const [quantidade, setQuantidade] = useState(String(product.quantidade || ''));
  const [preco, setPreco] = useState(String(product.precoAtual || product.preco || ''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!codigo.trim() || !nome.trim() || !quantidade.trim() || !preco.trim()) {
      setError('Preencha todos os campos.');
      return false;
    }
    if (isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      setError('Quantidade deve ser um número não negativo.');
      return false;
    }
    if (isNaN(Number(preco)) || Number(preco) < 0) {
      setError('Preço deve ser um número não negativo.');
      return false;
    }
    return true;
  };

  const handleEdit = async () => {
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await productService.updateProduct(product.uid, {
        codigo: codigo.trim(),
        nome: nome.trim(),
        quantidade: Number(quantidade),
        preco: Number(preco)
      });
      setSuccess('Produto atualizado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (e) {
      setError(e.message || 'Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Editar Produto</Text>
            <View style={{ width: 60 }} />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Código</Text>
            <TextInput
              style={styles.input}
              value={codigo}
              onChangeText={setCodigo}
              placeholder="Código do produto"
              autoCapitalize="characters"
              editable={!loading}
            />
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do produto"
              editable={!loading}
            />
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={setQuantidade}
              placeholder="Quantidade"
              keyboardType="numeric"
              editable={!loading}
            />
            <Text style={styles.label}>Preço (R$)</Text>
            <TextInput
              style={styles.input}
              value={preco}
              onChangeText={setPreco}
              placeholder="Preço"
              keyboardType="numeric"
              editable={!loading}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleEdit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
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
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  form: {
    padding: 20,
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 12,
    margin: 20,
    marginTop: 30,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: COLORS.danger,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  success: {
    color: COLORS.success,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 