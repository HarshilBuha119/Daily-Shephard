import React, {useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import {styles} from '../components/Styles';
import {Images} from '../assets/Images';
import BottomSheetTheme from '../components/BottomSheetTheme';
import { BottomSheetFont  } from '../components/BottomSheetFont';
import Modall from '../components/Modal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import MenuItems from '../menus/MenuItems';
import MenuBox from '../menus/menuBox';
import ProfileHeader from '../ProfileScreen/ProfileHeader';
import { persistor } from '../redux/store';
import { cleanFavourite } from '../redux/slices/favSlice';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentTheme, setCurrentTheme] = useState('Dark');
  const [currentFontSize, setCurrentFontSize] = useState('Large');
  const [isThemeBottomSheetVisible, setThemeBottomSheetVisible] =
    useState(false);
  const [isFontBottomSheetVisible, setFontBottomSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    image: null,
    text: '',
    button1: {text: '', onPress: null},
    button2: {text: '', onPress: null},
  });

  const handleThemeSave = theme => {
    setCurrentTheme(
      theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Device',
    );
    setThemeBottomSheetVisible(false);
  };
  const handleFontSave = fontSize => {
    setCurrentFontSize(
      fontSize === 'small'
        ? 'Small'
        : fontSize === 'medium'
        ? 'Medium'
        : 'Large',
    );
    setFontBottomSheetVisible(false);
  };

  const openModal = type => {
    if (type === 'delete') {
      setModalConfig({
        image: Images.Delete,
        text: 'Your journey here matters. Are you sure you want to delete your account?',
        button1: {
          text: 'Delete Account',
          onPress: async () => {
            dispatch(cleanFavourite())
            dispatch(logout());
            console.log("Account deleted");
            
            await persistor.purge();
          },
        },
        button2: {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancelled delete');
          },
        },
      });
    } else if (type === 'logout') {
      setModalConfig({
        image: Images.Logout,
        text: 'Are you sure you want to logout?',
        button1: {
          text: 'Logout',
          onPress: async () => {
            dispatch(cleanFavourite())
            dispatch(logout()); // Sets isSignIn to false, skipIntro to true
            await persistor.purge(); // Uncomment if you want to clear all persisted state
          },
        },
        button2: {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancelled logout');
          },
        },
      });
    }
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.div}></View>
      <ScrollView style={styles.container}>
        <ProfileHeader/>
        <Pressable
          onPress={navigation.navigate.bind(null, 'Favourite')}
          style={[
            styles.menuItems,
            {
              borderRadius: 10,
              marginVertical: 5,
              marginTop: 10,
              paddingHorizontal: 10,
            },
          ]}>
          <View style={styles.menuItemLeft}>
            <Image
              style={styles.img}
              source={Images.Fav}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Favorites</Text>
          </View>
          <Image
            style={styles.img}
            source={Images.Arrow}
            resizeMode="contain"
          />
        </Pressable>

        <MenuBox title={'Personalize'}>
          <MenuItems
            Img={Images.Color}
            menuName={'Appearance'}
            onPress={() => setThemeBottomSheetVisible(true)}
            extra={currentTheme}
            isLast={false}
          />
          <MenuItems
            Img={Images.Font}
            menuName={'Font Size'}
            onPress={() => setFontBottomSheetVisible(true)}
            extra={currentFontSize}
            isLast={false}
          />
          <MenuItems Img={Images.Notification} menuName={'Notifications'} isLast={true}/>
        </MenuBox>
        <MenuBox title={'General'}>
          <MenuItems Img={Images.Color} menuName={'Contact Support'} isLast={false}/>
          <MenuItems Img={Images.Font} menuName={'About Us'} isLast={false}/>
          <MenuItems Img={Images.Notification} menuName={'Terms & Privacy'} isLast={true}/>
        </MenuBox>
        <MenuBox title={'Account'}>
          <MenuItems
            Img={Images.Color}
            menuName={'Delete Account'}
            onPress={() => openModal('delete')}
            isLast={false}
          />
          <MenuItems
            Img={Images.Font}
            menuName={'Logout'}
            onPress={() => openModal('logout')}
            isLast={true}
          />
        </MenuBox>
        <View style={styles.footer}>
          <Image style={styles.logo} source={Images.Focus} />
        </View>
      </ScrollView>
      <BottomSheetTheme
        visible={isThemeBottomSheetVisible}
        onClose={() => setThemeBottomSheetVisible(false)}
        onSave={handleThemeSave}
      />
      <BottomSheetFont
        visible={isFontBottomSheetVisible}
        onClose={() => setFontBottomSheetVisible(false)}
        onSave={handleFontSave}
      />
      <Modall
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        image={modalConfig.image}
        text={modalConfig.text}
        button1={modalConfig.button1}
        button2={modalConfig.button2}
      />
    </>
  );
}