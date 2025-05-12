import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheetTheme({ visible, onClose, onSave }) {
  const [selectedTheme, setSelectedTheme] = useState('dark'); // Default to 'dark' as shown in the image
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
    onSave(selectedTheme); // Call the onSave prop with the selected theme
    onClose(); // Close the bottom sheet
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={310} // Adjust height as needed
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={onClose} // Trigger onClose when the bottom sheet is dismissed
      customStyles={{
        container: styles.sheetContainer,
        draggableIcon: styles.draggableIcon,
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Appearance</Text>

        {/* Light Theme Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('light')}
        >
          <Text style={styles.optionText}>Light theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'light' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        {/* Dark Theme Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('dark')}
        >
          <Text style={styles.optionText}>Dark theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'dark' && <View style={styles.radioButtonSelected} />}
          </View>
        </Pressable>

        {/* Device Theme Option */}
        <Pressable
          style={styles.option}
          onPress={() => setSelectedTheme('device')}
        >
          <Text style={styles.optionText}>Device theme</Text>
          <View style={styles.radioButton}>
            {selectedTheme === 'device' && <View style={styles.radioButtonSelected} />}
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
    backgroundColor: '#1E1E1E', // Dark background to match the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  draggableIcon: {
    backgroundColor: '#FFFFFF', // White drag handle
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
    borderColor: '#20C997', // Green border to match the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#20C997', // Green fill for selected state
  },
  saveButton: {
    backgroundColor: '#20C997', // Green button background
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