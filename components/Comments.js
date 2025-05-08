import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {Images} from '../assets/Images';
function Comments({name, time, description}) {
  return (
    <>
      <View style={styles.divider}></View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.first}>
            <Image
              style={[styles.logo, {marginRight: 20}]}
              source={Images.Hello}
            />
            <Text style={styles.name}>Christiana</Text>
            <Text style={styles.time}>2m ago</Text>
          </View>
          <Pressable>
            <Image style={styles.logo} source={Images.Dots} />
          </Pressable>
        </View>
        <Text style={styles.description}>
          The reflection helped me see this verse in a new light. Thank you for
          sharing!
        </Text>
      </View>
    </>
  );
}

export default Comments;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 25,
  },
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  first: {
    flexDirection: 'row',
  },
  logo: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  name: {
    fontFamily: 'Urbanist',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 15,
    color: 'white',
  },
  time: {
    fontFamily: 'Urbanist',
    fontSize: 14,
    fontWeight: '600',
    color: '#89888B',
  },
  description: {
    marginHorizontal: 56,
    color: 'white',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#26252A',
  },
});
