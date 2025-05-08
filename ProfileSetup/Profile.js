import {
  Image,
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {Images} from '../assets/Images';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {updateProfile} from '../redux/slices/profileSlice';

export default function Profile({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

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
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleContinue = () => {
    if (name.trim() && email.trim()) {
      dispatch(
        updateProfile({
          name,
          email,
          image: selectedImage,
        }),
      );
      navigation.navigate('Notification');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <>
      <View style={styles.divider} />
      <View style={[styles.container]}>
        <Pressable onPress={openImagePicker} style={styles.imageContainer}>
          <Image
            source={selectedImage ? {uri: selectedImage} : Images.PFP}
            style={styles.image}
          />
          <Image source={Images.Add} style={styles.addImage} />
        </Pressable>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#FAFAFA80'}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#FAFAFA80'}
              placeholder="christbell@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.legend}>Email</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.continue}>Continue</Text>
        </Pressable>
      </View>
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
    marginTop: 40,
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  addImage: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    padding: 20,
    paddingTop: 50,
    gap: 30,
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
    top: -10,
    left: 15,
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
  divider: {
    height: 1,
    backgroundColor: '#26252A',
    width: '100%',
  },
});
