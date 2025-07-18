import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { mechanicService } from '../services/mechanicService';

export default function AddMechanicScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    matricula: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { cpf, nome, email, telefone, especialidade } = formData;

    if (!cpf.trim()) {
      Alert.alert('Erro', 'CPF é obrigatório');
      return false;
    }

    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return false;
    }

    if (!telefone.trim()) {
      Alert.alert('Erro', 'Telefone é obrigatório');
      return false;
    }

    if (!especialidade.trim()) {
      Alert.alert('Erro', 'Especialidade é obrigatória');
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Verificar se CPF já existe
      const cpfExists = await mechanicService.checkCpfExists(formData.cpf);
      if (cpfExists) {
        Alert.alert('Erro', 'CPF já cadastrado no sistema');
        return;
      }

      // Verificar se email já existe
      const emailExists = await mechanicService.checkEmailExists(formData.email);
      if (emailExists) {
        Alert.alert('Erro', 'Email já cadastrado no sistema');
        return;
      }

      // Verificar se matrícula já existe (se fornecida)
      if (formData.matricula) {
        const matriculaExists = await mechanicService.checkMatriculaExists(formData.matricula);
        if (matriculaExists) {
          Alert.alert('Erro', 'Matrícula já cadastrada no sistema');
          return;
        }
      }

      // Adicionar mecânico
      const result = await mechanicService.addMechanic(formData);
      
      Alert.alert(
        'Sucesso', 
        'Mecânico cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', `Erro ao cadastrar mecânico: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    
    if (hasData) {
      Alert.alert(
        'Confirmar Saída',
        'Você tem dados preenchidos. Deseja sair sem salvar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sair', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Confirmar Cancelamento',
      'Deseja cancelar o cadastro? Todos os dados serão perdidos.',
      [
        { text: 'Continuar Editando', style: 'cancel' },
        { text: 'Cancelar', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Mecânico</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF *</Text>
            <TextInput
              style={styles.input}
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
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
              onChangeText={(value) => handleInputChange('nome', value)}
              placeholder="Digite o nome completo"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
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
              onChangeText={(value) => handleInputChange('telefone', value)}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especialidade *</Text>
            <TextInput
              style={styles.input}
              value={formData.especialidade}
              onChangeText={(value) => handleInputChange('especialidade', value)}
              placeholder="Ex: Motor, Elétrica, Suspensão..."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              value={formData.matricula}
              onChangeText={(value) => handleInputChange('matricula', value)}
              placeholder="Ex: 12345"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.textWhite} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Cadastrar</Text>
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
  cancelButton: {
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 