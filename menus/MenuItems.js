import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import { Images } from '../assets/Images';

const MenuItems = ({onPress, Img ,extra, menuName ,isLast}) => {
  return (
    <>
    <Pressable onPress={onPress} style={styles.menuItems}>
      <View style={styles.menuItemLeft}>
        <Image style={styles.img} source={Img} resizeMode="contain" />
        <Text style={styles.menuText}>{menuName}</Text>
      </View>
      <View style={styles.menuItemRight}>
        <Text style={{color: '#95959D', fontSize: 16, marginRight: 10}}>
          {extra}
        </Text>
        <Image style={styles.img} source={Images.Arrow} resizeMode="contain" />
      </View>
    </Pressable>
    {isLast ?  null : <View style={styles.divider}/>}
    </>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  menuItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#202126',
  },
  img: {
    height: 35,
    width: 35,
  },
  divider: {
    height: 2,
    backgroundColor: '#2F2F37',
    paddingHorizontal: 10,
  },
});
