import {
  Image,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import {useState} from 'react';
import {Images} from '../assets/Images';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {updateProfile} from '../redux/slices/profileSlice';

export default function EditProfile({navigation}) {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(profile.image);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
      } else if (response.assets && response.assets.length > 0) {
        let imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleSave = () => {
    if (name.trim() && email.trim()) {
      dispatch(
        updateProfile({
          name,
          email,
          image: selectedImage,
        }),
      );
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <>
      <View style={styles.divider} />
      <KeyboardAvoidingView style={[styles.container]}>
        <Pressable onPress={openImagePicker} style={styles.imageContainer}>
          <Image
            source={selectedImage ? {uri: selectedImage} : Images.PFP}
            style={styles.image}
          />
          <Image source={Images.Edit} style={styles.editIcon} />
        </Pressable>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#FAFAFA80'}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#FAFAFA80'}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.legend}>Email</Text>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18171C',
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  editIcon: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    padding: 20,
    gap: 20,
  },
  input: {
    borderColor: '#38393E',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    color: '#FAFAFA',
    fontSize: 18,
  },
  legend: {
    color: '#FAFAFA80',
    fontSize: 14,
    backgroundColor: '#18171C',
    position: 'absolute',
    top: 85,
    left: 35,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#20C997',
    margin: 20,
    padding: 16,
    borderRadius: 35,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  continue: {
    color: '#18171C',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#20C997',
    margin: 20,
    padding: 16,
    borderRadius: 35,
    marginTop:"auto"
  },
  saveButtonText: {
    color: '#18171C',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#26252A',
    width: '100%',
  },
});
