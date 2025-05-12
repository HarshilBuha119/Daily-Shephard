import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheetFont({ visible, onClose, onSave }) {
  const [selectedFontSize, setSelectedFontSize] = useState('medium'); // Default to 'medium' as shown in the image
  const bottomSheetRef = useRef(null);

  // Open or close the bottom sheet based on the `visible` prop
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleSave = () => {
    onSave(selectedFontSize); // Call the onSave prop with the selected font size
    onClose(); // Close the bottom sheet
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={310} // Adjust height as needed
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={onClose}
      customStyles={{
        container: styles.sheetContainer,
        draggableIcon: styles.draggableIcon,
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Font Size</Text>

        {/* Small Font Size Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedFontSize('small')}
        >
          <Text style={styles.optionText}>Small</Text>
          <View style={styles.radioButton}>
            {selectedFontSize === 'small' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        {/* Medium Font Size Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedFontSize('medium')}
        >
          <Text style={styles.optionText}>Medium</Text>
          <View style={styles.radioButton}>
            {selectedFontSize === 'medium' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        {/* Large Font Size Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedFontSize('large')}
        >
          <Text style={styles.optionText}>Large</Text>
          <View style={styles.radioButton}>
            {selectedFontSize === 'large' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        {/* Save Button */}
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