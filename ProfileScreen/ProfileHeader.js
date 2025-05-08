import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../components/Styles';
import {Images} from '../assets/Images';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const ProfileHeader = () => {
  const profile = useSelector(state => state.profile);
  const navigation = useNavigation();
  const name = profile.name;
  const profileImage = profile.image;
  return (
    <View style={styles.headerContainer}>
      <Image
        source={profileImage ? {uri: profileImage} : Images.PFP}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{name}</Text>
        <Pressable
          onPress={navigation.navigate.bind(null, 'Edit Profile')}
          style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileHeader;
