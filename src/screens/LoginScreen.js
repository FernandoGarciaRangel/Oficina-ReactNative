import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../constants/colors';
import { ICONS } from '../constants/icons';
import { TEXTS } from '../constants/texts';
import { authService } from '../services/firebaseService';
import { userProfileService } from '../services/userProfileService';
import { useUser } from '../context/UserContext';
import { validation, errorMessages } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    if (!validation.isValidEmail(email)) {
      Alert.alert('Erro', errorMessages.invalidEmail);
      return;
    }

    setLoading(true);
    try {
      // Fazer login
      const authUser = await authService.loginUser(email, password);
      console.log('Login bem-sucedido:', authUser.email);

      // Buscar perfil do usuário
      let userProfile = await userProfileService.getUserProfile(authUser.uid);
      
      // Se não encontrou pelo UID, tentar pelo email
      if (!userProfile) {
        userProfile = await userProfileService.getUserProfileByEmail(authUser.email);
      }

      if (userProfile) {
        // Salvar perfil no contexto global
        const userData = {
          uid: authUser.uid,
          email: authUser.email,
          funcao: userProfile.funcao,
          ...userProfile
        };
        setUser(userData);
        console.log('Perfil carregado:', userData);

        // Redirecionar conforme a função
        switch (userProfile.funcao) {
          case 'admin':
            navigation.replace('Admin');
            break;
          case 'cliente':
            navigation.replace('Client');
            break;
          case 'mecanico':
            navigation.replace('Mechanic');
            break;
          default:
            Alert.alert('Erro', 'Tipo de usuário não reconhecido');
            break;
        }
      } else {
        // Usuário autenticado mas sem perfil - mostrar opção de cadastro
        Alert.alert(
          'Perfil não encontrado',
          'Usuário autenticado mas perfil não encontrado. Deseja criar um perfil?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { 
              text: 'Criar Perfil', 
              onPress: () => {
                // Salvar dados básicos no contexto
                setUser({
                  uid: authUser.uid,
                  email: authUser.email,
                  funcao: null
                });
                navigation.replace('Home'); // Voltar para tela inicial para escolher tipo
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Erro no login:', error);
      let errorMessage = 'Erro ao fazer login';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/invalid-email':
          errorMessage = errorMessages.invalidEmail;
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Erro ao entrar', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    if (!validation.isValidEmail(email)) {
      Alert.alert('Erro', errorMessages.invalidEmail);
      return;
    }

    if (!validation.isValidPassword(password)) {
      Alert.alert('Erro', errorMessages.weakPassword);
      return;
    }

    setLoading(true);
    try {
      const user = await authService.registerUser(email, password);
      console.log('Usuário registrado:', user.email);
      Alert.alert(
        'Sucesso', 
        'Conta criada com sucesso! Faça login para continuar.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Erro no registro:', error);
      let errorMessage = 'Erro ao criar conta';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = errorMessages.invalidEmail;
          break;
        case 'auth/weak-password':
          errorMessage = errorMessages.weakPassword;
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Erro ao criar conta', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🔧</Text>
      <Text style={styles.title}>Oficina App</Text>
        <Text style={styles.subtitle}>Sistema de Gerenciamento</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{TEXTS.buttons.login}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.registerButton]} 
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>{TEXTS.buttons.register}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🔐 Sistema Seguro</Text>
        <Text style={styles.infoText}>Autenticação Firebase ativa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.backgroundCard,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: COLORS.success,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
}); 