import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FloatingCloseButton from './FloatingCloseButton';

export default function BottomSheetTheme({ visible, onClose, onSave }) {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleSave = () => {
    onSave(selectedTheme);
    setTimeout(() => {
    onClose();
  }, 2000);
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={310}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      handleComponent={() => <FloatingCloseButton onPress={onClose} />} // Pass onClose to FloatingCloseButton
      onClose={onClose}
      customStyles={{
        container: styles.sheetContainer,
        draggableIcon: styles.draggableIcon,
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Appearance</Text>

        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('light')}
        >
          <Text style={styles.optionText}>Light theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'light' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('dark')}
        >
          <Text style={styles.optionText}>Dark theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'dark' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('device')}
        >
          <Text style={styles.optionText}>Device theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'device' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save preference</Text>
        </Pressable>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  draggableIcon: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 5,
    borderRadius: 3,
    marginBottom: 10, // Add some spacing below the draggable icon
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#20C997',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#20C997',
  },
  saveButton: {
    backgroundColor: '#20C997',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});