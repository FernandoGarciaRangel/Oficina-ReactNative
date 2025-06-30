import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  onPress, 
  status = 'Disponível',
  statusColor = '#007bff',
  disabled = false 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, disabled && styles.disabledCard]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    minHeight: 120,
  },
  disabledCard: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 32,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ActionCard; 