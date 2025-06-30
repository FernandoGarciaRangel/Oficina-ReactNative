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
import { mechanicService } from '../services/mechanicService';

export default function EditMechanicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mechanic } = route.params;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    matricula: ''
  });

  useEffect(() => {
    if (mechanic) {
      setFormData({
        cpf: mechanic.cpf || '',
        nome: mechanic.nome || '',
        email: mechanic.email || '',
        telefone: mechanic.telefone || '',
        especialidade: mechanic.especialidade || '',
        matricula: mechanic.matricula || ''
      });
    }
  }, [mechanic]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { cpf, nome, email, telefone, especialidade, matricula } = formData;

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

      // Verificar se CPF já existe (excluindo o mecânico atual)
      const cpfExists = await mechanicService.checkCpfExists(formData.cpf, mechanic.uid);
      if (cpfExists) {
        Alert.alert('Erro', 'CPF já cadastrado no sistema');
        return;
      }

      // Verificar se email já existe (excluindo o mecânico atual)
      const emailExists = await mechanicService.checkEmailExists(formData.email, mechanic.uid);
      if (emailExists) {
        Alert.alert('Erro', 'Email já cadastrado no sistema');
        return;
      }

      // Verificar se matrícula já existe (se fornecida)
      if (formData.matricula) {
        const matriculaExists = await mechanicService.checkMatriculaExists(formData.matricula, mechanic.uid);
        if (matriculaExists) {
          Alert.alert('Erro', 'Matrícula já cadastrada no sistema');
          return;
        }
      }

      // Atualizar mecânico
      await mechanicService.updateMechanic(mechanic.uid, formData);
      
      Alert.alert(
        'Sucesso', 
        'Mecânico atualizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o mecânico ${mechanic.nome}?\n\nEsta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await mechanicService.deleteMechanic(mechanic.uid);
              Alert.alert(
                'Sucesso', 
                'Mecânico excluído com sucesso!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            } catch (error) {
              Alert.alert('Erro', error.message);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleBack = () => {
    const hasChanges = 
      formData.cpf !== mechanic.cpf ||
      formData.nome !== mechanic.nome ||
      formData.email !== mechanic.email ||
      formData.telefone !== mechanic.telefone ||
      formData.especialidade !== mechanic.especialidade ||
      formData.matricula !== mechanic.matricula;
    
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
        <Text style={styles.title}>Editar Mecânico</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.mechanicInfo}>
            <Text style={styles.mechanicName}>{mechanic.nome}</Text>
            <Text style={styles.mechanicStatus}>
              Status: {mechanic.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </Text>
          </View>

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
  mechanicInfo: {
    backgroundColor: COLORS.backgroundCard,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  mechanicStatus: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
}); 