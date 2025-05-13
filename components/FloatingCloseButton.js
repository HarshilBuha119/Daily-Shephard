import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { Images } from '../assets/Images';

export default function FloatingCloseButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={Images.Close}
        style={styles.closeButton}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    bottom:250
  },
  closeButton: {
    width: 40,
    height: 40,
  },
});