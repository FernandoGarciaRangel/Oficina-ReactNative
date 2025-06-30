import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusCard from '../components/StatusCard';
import { COLORS } from '../constants/colors';
import { ICONS } from '../constants/icons';
import { TEXTS } from '../constants/texts';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.replace('Login');
  };

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.adminButton]}
            onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.buttonIcon}>{ICONS.admin}</Text>
            <Text style={styles.buttonText}>{TEXTS.areas.admin}</Text>
            <Text style={styles.buttonDescription}>Gerenciar sistema e usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.clientButton]}
            onPress={() => navigation.navigate('Client')}
          >
            <Text style={styles.buttonIcon}>{ICONS.client}</Text>
            <Text style={styles.buttonText}>{TEXTS.areas.client}</Text>
            <Text style={styles.buttonDescription}>Agendar e acompanhar serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.mechanicButton]}
            onPress={() => navigation.navigate('Mechanic')}
          >
            <Text style={styles.buttonIcon}>{ICONS.mechanic}</Text>
            <Text style={styles.buttonText}>{TEXTS.areas.mechanic}</Text>
            <Text style={styles.buttonDescription}>Executar e gerenciar serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonIcon}>{ICONS.logout}</Text>
            <Text style={styles.buttonText}>{TEXTS.buttons.logout}</Text>
            <Text style={styles.buttonDescription}>Encerrar sessão</Text>
          </TouchableOpacity>
        </View>

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
  buttonContainer: {
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
}); 