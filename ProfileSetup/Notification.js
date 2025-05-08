import { View, StyleSheet, Text, Image, Pressable, Animated, Easing } from 'react-native';
import { Images } from '../assets/Images';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useState, useRef } from 'react';

export default function Notification() {
  const [isEnabled, setIsEnabled] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(login());
  };

  const toggleSwitch = () => {
    const toValue = isEnabled ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
    setIsEnabled(!isEnabled);
  };

  // Interpolations for circle position and background colors
  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 55 - 30 - 5], // padding = 5, width = 106, circle = 40
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#555', '#20C997'],
  });

  const circleColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#555', '#20C997'],
  });

  return (
    <>
      <View style={styles.divider}></View>
      <View style={styles.container}>
        <View style={styles.hi}>
          <View style={styles.mainBox}>
            <Text style={styles.text}>Verse Only</Text>
            <View style={styles.box}>
              <Image style={styles.image} resizeMode="contain" source={Images.Time} />
              <Text style={styles.time}>10:30</Text>
            </View>
          </View>

          {/* Custom Switch */}
          <Pressable onPress={toggleSwitch}>
            <Animated.View style={[styles.switchContainer, { borderColor }]}>
              <Animated.View
                style={[
                  styles.circle,
                  {
                    left: circlePosition,
                    backgroundColor: circleColor,
                  },
                ]}
              >
                {isEnabled && <Text style={styles.check}>✓</Text>}
              </Animated.View>
            </Animated.View>
          </Pressable>
        </View>

        <View style={styles.newButtonConatiner}>
          <Pressable onPress={handleNext} style={styles.buttonnew}>
            <Text style={styles.buttontext}>Skip</Text>
          </Pressable>
          <Pressable onPress={handleNext} style={[styles.buttonnew, { backgroundColor: '#20C997' }]}>
            <Text style={[styles.buttontext, { color: 'black' }]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18171C',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    height: 22,
    width: 22,
  },
  mainBox: {
    flexDirection: 'column',
    gap: 20,
  },
  box: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#202126',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 10,
  },
  time: {
    color: 'white',
    fontSize: 16,
  },
  hi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  newButtonConatiner: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 20,
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 25,
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
  divider: {
    height: 1,
    backgroundColor: '#26252A',
  },
  // Custom Switch Styles
  switchContainer: {
    width: 60,
    height: 35,
    borderRadius: 25,
    borderWidth: 2,
    padding: 5,
    justifyContent: 'center',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
