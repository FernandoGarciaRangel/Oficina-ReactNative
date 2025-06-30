import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusCard = ({ title, value, icon, color = '#007bff', size = 'medium' }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 16, marginBottom: 4 };
      case 'large':
        return { fontSize: 32, marginBottom: 12 };
      default:
        return { fontSize: 24, marginBottom: 8 };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.value, { color }, getSizeStyles()]}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 100,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default StatusCard; 