import React from 'react';
import { Platform, TextInput, View, StyleSheet } from 'react-native';

export default function DateInput({ value, onChange, style, ...props }) {
  if (Platform.OS === 'web') {
    return (
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ ...styles.input, ...style }}
        {...props}
      />
    );
  }
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChange}
      placeholder="AAAA-MM-DD"
      keyboardType="numeric"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 4,
    width: '100%',
  },
}); 