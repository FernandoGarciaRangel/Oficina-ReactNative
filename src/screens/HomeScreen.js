import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import StatusCard from '../components/StatusCard';
import { COLORS } from '../constants/colors';
import { ICONS } from '../constants/icons';
import { TEXTS } from '../constants/texts';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  const handleAdminArea = () => {
    if (user?.funcao === 'admin') {
      navigation.navigate('Admin');
    } else {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar a área administrativa.');
    }
  };

  const handleClientArea = () => {
    if (user?.funcao === 'cliente') {
      navigation.navigate('Client');
    } else {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar a área do cliente.');
    }
  };

  const handleMechanicArea = () => {
    if (user?.funcao === 'mecanico') {
      navigation.navigate('Mechanic');
    } else {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar a área do mecânico.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              navigation.replace('Login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Erro ao fazer logout');
            }
          }
        }
      ]
    );
  };

  // Se usuário já tem perfil definido, redirecionar automaticamente
  React.useEffect(() => {
    if (user?.funcao) {
      switch (user.funcao) {
        case 'admin':
          navigation.replace('Admin');
          break;
        case 'cliente':
          navigation.replace('Client');
          break;
        case 'mecanico':
          navigation.replace('Mechanic');
          break;
      }
    }
  }, [user, navigation]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{TEXTS.titles.home}</Text>
          <Text style={styles.subtitle}>{TEXTS.subtitles.home}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{getCurrentTime()}</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userEmail}>{user.email}</Text>
              {user.funcao && (
                <Text style={styles.userRole}>
                  {user.funcao === 'admin' ? 'Administrador' :
                   user.funcao === 'cliente' ? 'Cliente' :
                   user.funcao === 'mecanico' ? 'Mecânico' : 'Usuário'}
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.statsContainer}>
          <StatusCard 
            title="Serviços Ativos"
            value="12"
            icon={ICONS.services}
            color={COLORS.primary}
            size="small"
          />
          <StatusCard 
            title="Mecânicos"
            value="8"
            icon={ICONS.mechanic}
            color={COLORS.warning}
            size="small"
          />
          <StatusCard 
            title="Clientes"
            value="45"
            icon={ICONS.client}
            color={COLORS.success}
            size="small"
          />
        </View>

        <View style={styles.content}>
          {!user?.funcao ? (
            // Usuário sem perfil - mostrar todas as opções
            <>
              <TouchableOpacity 
                style={[styles.button, styles.adminButton]}
                onPress={handleAdminArea}
              >
                <Text style={styles.buttonIcon}>{ICONS.admin}</Text>
                <Text style={styles.buttonText}>{TEXTS.areas.admin}</Text>
                <Text style={styles.buttonDescription}>Gerenciar sistema</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.clientButton]}
                onPress={handleClientArea}
              >
                <Text style={styles.buttonIcon}>{ICONS.client}</Text>
                <Text style={styles.buttonText}>{TEXTS.areas.client}</Text>
                <Text style={styles.buttonDescription}>Área do cliente</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.mechanicButton]}
                onPress={handleMechanicArea}
              >
                <Text style={styles.buttonIcon}>{ICONS.mechanic}</Text>
                <Text style={styles.buttonText}>{TEXTS.areas.mechanic}</Text>
                <Text style={styles.buttonDescription}>Área do mecânico</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Usuário com perfil - mostrar apenas área correspondente
            <TouchableOpacity 
              style={[
                styles.button, 
                user.funcao === 'admin' ? styles.adminButton :
                user.funcao === 'cliente' ? styles.clientButton :
                styles.mechanicButton
              ]}
              onPress={
                user.funcao === 'admin' ? handleAdminArea :
                user.funcao === 'cliente' ? handleClientArea :
                handleMechanicArea
              }
            >
              <Text style={styles.buttonIcon}>
                {user.funcao === 'admin' ? ICONS.admin :
                 user.funcao === 'cliente' ? ICONS.client :
                 ICONS.mechanic}
              </Text>
              <Text style={styles.buttonText}>
                {user.funcao === 'admin' ? TEXTS.areas.admin :
                 user.funcao === 'cliente' ? TEXTS.areas.client :
                 TEXTS.areas.mechanic}
              </Text>
              <Text style={styles.buttonDescription}>
                {user.funcao === 'admin' ? 'Gerenciar sistema' :
                 user.funcao === 'cliente' ? 'Área do cliente' :
                 'Área do mecânico'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {user && (
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informações do Sistema</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{TEXTS.systemInfo.version}:</Text>
            <Text style={styles.infoValue}>{TEXTS.systemInfo.versionNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{TEXTS.systemInfo.lastUpdate}:</Text>
            <Text style={styles.infoValue}>{TEXTS.systemInfo.lastUpdateDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{TEXTS.systemInfo.status}:</Text>
            <Text style={styles.infoValue}>{TEXTS.status.online}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {TEXTS.footer.copyright}
          </Text>
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
    backgroundColor: COLORS.dark,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textWhite,
    marginBottom: 15,
    textAlign: 'center',
  },
  timeContainer: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: COLORS.backgroundCard,
    margin: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  adminButton: {
    backgroundColor: COLORS.admin,
  },
  clientButton: {
    backgroundColor: COLORS.client,
  },
  mechanicButton: {
    backgroundColor: COLORS.mechanic,
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
    marginTop: 20,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textWhite,
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.textWhite,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: COLORS.backgroundCard,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  footer: {
    backgroundColor: COLORS.dark,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: COLORS.textWhite,
    fontSize: 12,
    textAlign: 'center',
  },
  logoutButtonText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 