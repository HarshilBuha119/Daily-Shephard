import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Images} from '../assets/Images';
import {selectIsSignedIn} from '../redux/slices/authSlice';
export default function Login({navigation}) {
  const isSignedIn = useSelector(selectIsSignedIn);
  if (isSignedIn) {
    navigation.replace('Main');
  }
  const handleAppleSignIn = () => {
    navigation.navigate('Profile Setup');
  };
  const onGoogleButtonPress = () => {
    navigation.navigate('Profile Setup');
    console.log('Logged in');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.image} source={Images.Shephard} />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.daily}>
            Your Daily{' '}
            <Text style={[styles.daily, {color: '#20C997'}]}>Bible</Text>{' '}
            Companion
          </Text>
          <Text style={styles.dailyText}>
            Start your day with meaningful Bible verses and reflections. Sign in
            to explore.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={handleAppleSignIn} style={styles.rowA}>
            <Image
              source={Images.Apple}
              style={styles.images}
              resizeMode="contain"
            />
            <Text style={[styles.sign, {color: 'black'}]}>
              Sign In with Apple
            </Text>
          </Pressable>

          <Pressable onPress={onGoogleButtonPress} style={[styles.rowG]}>
            <Image
              source={Images.Google}
              style={styles.images}
              resizeMode="contain"
            />
            <Text style={[styles.sign, {color: 'white'}]}>
              Sign In with Google
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.policy}>
        By continuing, you acknowledge and agree that you have accepted the{' '}
        <Text style={styles.span}>Terms of Service</Text> and have reviewed the{' '}
        <Text style={styles.span}>Privacy Policy.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18171C',
    flex: 1,
  },
  image: {
    height: 300,
    width: '100%',
  },
  innerContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonContainer: {
    gap: 30,
    marginVertical: 30,
  },
  daily: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Urbanist',
    paddingVertical: 5,
  },
  dailyText: {
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
  },
  images: {
    height: 25,
    width: 25,
  },
  sign: {
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    fontSize: 18,
  },
  rowA: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 35,
    gap: 10,
  },
  rowG: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: 'white',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  policy: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Urbanist',
    textAlign: 'center',
    fontWeight: '500',
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  span: {
    color: '#20C997',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
