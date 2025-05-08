import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomSheet = ({ visible, onClose, onSave }) => {
  const [theme, setTheme] = useState('Dark theme');

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Appearance</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setTheme('Light theme')}
      >
        <Text style={styles.optionText}>Light theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setTheme('Dark theme')}
      >
        <Text style={styles.optionText}>Dark theme</Text>
        {theme === 'Dark theme' && <View style={styles.radioSelected} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setTheme('Device theme')}
      >
        <Text style={styles.optionText}>Device theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={() => onSave(theme)}>
        <Text style={styles.saveText}>Save preference</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#FFF',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#FFF',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00C4B4',
  },
  saveButton: {
    backgroundColor: '#00C4B4',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomSheet;