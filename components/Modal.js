import { Text, View, Modal, Pressable, StyleSheet, Image } from 'react-native';
import { Images } from '../assets/Images';

export default function Modall({
  modalVisible,
  setModalVisible,
  image,
  text,
  button1,
  button2,
}) {
  return (
    <Modal transparent={true} visible={modalVisible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            style={styles.deleteIcon}
            source={image || Images.Delete}
            resizeMode="contain"
          />
          <Text style={styles.modalText}>{text || 'Are you sure?'}</Text>
          <View style={styles.buttons}>
            <View style={styles.divider}></View>
            {button1 && (
              <Pressable
                onPress={() => {
                  button1.onPress?.();
                  setModalVisible(false); 
                }}
                style={styles.modalButtonRed}>
                <Text style={styles.red}>{button1.text}</Text>
              </Pressable>
            )}
            <View style={styles.divider}></View>
            {button2 && (
              <Pressable
                onPress={() => {
                  button2.onPress?.();
                  setModalVisible(false);
                }}
                style={styles.modalButtonWhite}>
                <Text style={styles.white}>{button2.text}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#18171C',
    padding: 20,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
    fontFamily: 'Urbanist',
    color: 'white',
  },
  modalButtonRed: {
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  modalButtonWhite: {
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  buttons: {
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteIcon: {
    alignSelf: 'center',
    height: 100,
    marginVertical: 10,
  },
  red: {
    color: '#EF4355',
    fontSize: 18,
  },
  white: {
    color: '#8A909B',
    fontSize: 18,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#2F2F37',
    paddingHorizontal: 10,
  },
});