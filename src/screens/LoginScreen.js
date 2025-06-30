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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await authService.loginUser(email, password);
      // Login bem-sucedido
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // Removida autenticação para facilitar desenvolvimento
    setLoading(true);
    
    // Simula um delay para mostrar o loading
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Redirecionando...');
      navigation.replace('Home');
    }, 1000);
  };

  const handleSkipAuth = () => {
    // Acesso direto sem autenticação para desenvolvimento
    navigation.replace('Home');
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
          placeholder="Email (opcional para desenvolvimento)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha (opcional para desenvolvimento)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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

          <TouchableOpacity 
            style={[styles.button, styles.skipButton]} 
            onPress={handleSkipAuth}
          >
            <Text style={styles.buttonText}>Acessar Direto (Dev)</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.devInfo}>
        <Text style={styles.devText}>🔧 Modo Desenvolvimento</Text>
        <Text style={styles.devText}>Autenticação desabilitada</Text>
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
  skipButton: {
    backgroundColor: COLORS.warning,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  devInfo: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  devText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
}); 