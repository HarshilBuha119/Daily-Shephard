// screens/IntroScreen1.js
import React from 'react';
import {StyleSheet, View, Pressable, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { completeIntro } from '../redux/slices/introSlice';
import { CommonActions } from '@react-navigation/native';
export default function IntroScreen1() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const handleSkip = () => {
    dispatch(completeIntro())
    navigation.dispatch(
      CommonActions.reset({ index: 0,
      routes: [{ name: 'Login' }], }) );
  };

  const handleNext = () => {
    navigation.navigate('Intro2');
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Image
        style={styles.image}
        source={Images.Screen1}
        resizeMode="contain"
      />
      <View style={styles.newButtonConatiner}>
        <Pressable onPress={handleSkip} style={styles.buttonnew}>
          <Text style={styles.buttontext}>Skip</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={[styles.buttonnew, {backgroundColor: '#20C997'}]}>
          <Text style={[styles.buttontext, {color: 'black'}]}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18171C',
    alignItems: 'center',
    paddingTop: 30,
    height: '100%',
  },
  newButtonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    position: 'absolute',
    bottom: 40,
  },
  buttonnew: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  buttontext: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: '80%',
    top: 20,
  },
});
