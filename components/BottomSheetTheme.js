import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import Close from './Close';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {Images} from '../assets/Images';

const BottomSheetTheme = ({visible, onClose, onSave}) => {
  // hooks
  const sheetRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState('dark'); // Default to "dark"

  // variables
  const sections = useMemo(
    () => [
      {
        title: 'Appearance',
        data: [
          {id: 'light', label: 'Light theme', selected: false},
          {id: 'dark', label: 'Dark theme', selected: false},
          {id: 'device', label: 'Device theme', selected: false},
        ],
      },
    ],
    [],
  );
  const snapPoints = useMemo(() => ['90%'], []);
  const updatedSections = useMemo(() => {
    return sections.map(sec =>
      sec.title === 'Appearance'
        ? {
            ...sec,
            data: sec.data.map(item => ({
              ...item,
              selected: item.id === selectedTheme,
            })),
          }
        : sec,
    );
  }, [sections, selectedTheme]);

  // callbacks
  const handleSheetChange = useCallback(
    index => {
      console.log('handleSheetChange', index);
      if (index === -1) onClose();
    },
    [onClose],
  );

  const handleSave = useCallback(() => {
    onSave(selectedTheme);
    onClose();
  }, [selectedTheme, onSave, onClose]);

  // Effect to handle initial visibility
  useEffect(() => {
    if (visible && sheetRef.current) {
      sheetRef.current.snapToIndex(0);
    } else if (!visible && sheetRef.current) {
      sheetRef.current.close();
    }
  }, [visible]);

  // render
  const renderSectionHeader = useCallback(
    ({section}) => (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setSelectedTheme(item.id)}>
        <Text style={styles.itemText}>{item.label}</Text>
        {item.selected ? (
          <Image style={styles.radio} source={Images.RadioColor} />
        ) : (
          <Image style={styles.radio} source={Images.Radio} />
        )}
      </TouchableOpacity>
    ),
    [],
  );

  if (!visible) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={() => <Close handle={handleSave} />}
        onClose={handleSave}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        backgroundStyle={styles.bottomSheetBackground}>
        
        <BottomSheetSectionList
          sections={updatedSections}
          keyExtractor={item => item.id}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save preference</Text>
        </TouchableOpacity>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
  },
  sectionHeaderContainer: {
    padding: 10,
    backgroundColor: '#1A1A1A',
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomColor: '#2F2F37',
    borderBottomWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#20C997',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#20C997',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  bottomSheetBackground: {
    backgroundColor: '#1A1A1A',
  },
  radio: {
    height: 20,
    width: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    left:"43.9%",
    zIndex: 99,
  },
  closeX: {
    color: 'white',
    backgroundColor: '#333',
    borderRadius: 35,
    height:50,
    width:50
  },
});

export default BottomSheetTheme;