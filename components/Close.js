import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Close = ({ handle }) => {
  return (
    <TouchableOpacity style={styles.closeButton} onPress={handle}>
      <Text style={styles.closeText}>×</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: '#333',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default Close;