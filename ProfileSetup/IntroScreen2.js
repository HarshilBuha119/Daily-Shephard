// screens/IntroScreen2.js
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Pressable, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {completeIntro} from '../redux/slices/introSlice';

export default function IntroScreen2() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hasSeenIntro = useSelector(state => state.intro.hasSeenIntro);

  useEffect(() => {
    if (hasSeenIntro) {
      navigation.replace('Login');
    }
  }, [hasSeenIntro, navigation]);

  const handleContinue = () => {
    dispatch(completeIntro());
    navigation.replace("Login")
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Image
        style={styles.image}
        source={Images.Screen2}
        resizeMode="contain"
      />
      <Pressable
        onPress={handleContinue}
        style={[styles.buttonnew, {backgroundColor: '#20C997'}]}>
        <Text style={[styles.buttontext, {color: 'black'}]}>Continue</Text>
        <Image
          source={Images.Continue}
          resizeMode="contain"
          style={styles.continue}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18171C',
    alignItems: 'center',
    paddingTop: 30,
    flex: 1,
  },
  buttonnew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'white',
    width: '90%',
    position: 'absolute',
    bottom: 40,
  },
  buttontext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  continue: {
    height: 25,
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  image: {
    height: '80%',
    top: 20,
  },
});
