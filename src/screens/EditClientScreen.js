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
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { clientService } from '../services/clientService';
import { validation, errorMessages } from '../utils/validation';

export default function EditClientScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    email: '',
    telefone: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (client) {
      setFormData({
        cpf: client.cpf || '',
        nome: client.nome || '',
        email: client.email || '',
        telefone: client.telefone || ''
      });
    }
  }, [client]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { cpf, nome, email, telefone } = formData;
    if (!cpf.trim()) {
      Alert.alert('Erro', errorMessages.required + ' (CPF)');
      return false;
    }
    if (!validation.isValidCpf(cpf)) {
      Alert.alert('Erro', errorMessages.invalidCpf);
      return false;
    }
    if (!nome.trim()) {
      Alert.alert('Erro', errorMessages.required + ' (Nome)');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Erro', errorMessages.required + ' (Email)');
      return false;
    }
    if (!validation.isValidEmail(email)) {
      Alert.alert('Erro', errorMessages.invalidEmail);
      return false;
    }
    if (!telefone.trim()) {
      Alert.alert('Erro', errorMessages.required + ' (Telefone)');
      return false;
    }
    if (!validation.isValidPhone(telefone)) {
      Alert.alert('Erro', errorMessages.invalidPhone);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      // Verificar duplicidade (excluindo o cliente atual)
      const cpfExists = await clientService.checkCpfExists(formData.cpf, client.uid);
      if (cpfExists) {
        Alert.alert('Erro', 'CPF já cadastrado no sistema');
        return;
      }
      const emailExists = await clientService.checkEmailExists(formData.email, client.uid);
      if (emailExists) {
        Alert.alert('Erro', 'Email já cadastrado no sistema');
        return;
      }
      await clientService.updateClient(client.uid, formData);
      setSuccessMessage('Cliente atualizado com sucesso! Redirecionando...');
      setTimeout(() => {
        setSuccessMessage('');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await clientService.deleteClient(client.uid);
      setSuccessMessage('Cliente excluído com sucesso! Redirecionando...');
      setTimeout(() => {
        setSuccessMessage('');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (loading) return; // Não permite voltar durante loading
    const hasChanges =
      formData.cpf !== client.cpf ||
      formData.nome !== client.nome ||
      formData.email !== client.email ||
      formData.telefone !== client.telefone;
    if (hasChanges) {
      Alert.alert(
        'Confirmar Saída',
        'Você tem alterações não salvas. Deseja sair sem salvar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sair', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Cliente</Text>
        <View style={styles.placeholder} />
      </View>
      {successMessage ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF *</Text>
            <TextInput
              style={styles.input}
              value={formData.cpf}
              onChangeText={value => handleInputChange('cpf', value)}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              maxLength={14}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              value={formData.nome}
              onChangeText={value => handleInputChange('nome', value)}
              placeholder="Digite o nome completo"
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              placeholder="exemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone *</Text>
            <TextInput
              style={styles.input}
              value={formData.telefone}
              onChangeText={value => handleInputChange('telefone', value)}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.textWhite} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
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
}); 