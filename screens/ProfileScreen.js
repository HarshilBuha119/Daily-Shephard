import React, {useState, useEffect} from 'react';
import {View, Alert, Text, Image, Pressable, ScrollView} from 'react-native';
import {styles} from '../components/Styles';
import {Images} from '../assets/Images';
import BottomSheetTheme from '../components/BottomSheetTheme';
import BottomSheetFont from '../components/BottomSheetFont';
import Modall from '../components/Modal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import MenuItems from '../menus/MenuItems';
import MenuBox from '../menus/menuBox';
import ProfileHeader from '../ProfileScreen/ProfileHeader';
import {persistor} from '../redux/store';
import {cleanFavourite} from '../redux/slices/favSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import FloatingCloseButton from '../components/FloatingCloseButton';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
} from '@notifee/react-native';

export default function ProfileScreen() {
  useEffect(() => {
    async function setupNotifications() {
      await notifee.requestPermission();

      const id = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
      setChannelId(id);
    }

    async function setupFCM() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('🔥 FCM Token:', token);
        // Send token to backend here
      }

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('📩 Background FCM Message:', remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('📩 Foreground FCM Message:', remoteMessage);
        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: 'default',
            pressAction: {id: 'default'},
          },
        });
      });

      return unsubscribe;
    }

    setupNotifications();
    const unsubscribeFCM = setupFCM();

    return () => {
      if (unsubscribeFCM instanceof Function) unsubscribeFCM();
    };
  }, []);

  async function handleClick() {
    if (!channelId) {
      Alert.alert('Notification channel is not ready');
      return;
    }

    const triggerTime = new Date(Date.now() + 0.01 * 60 * 1000); // 10 minutes

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerTime.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Reminder',
        body: 'Welcome to Daily Shepherd! This is a reminder notification.',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );

    Alert.alert('Notification scheduled for 10 minutes from now!');
  }

  const [channelId, setChannelId] = useState();
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
            await GoogleSignin.signOut();
            dispatch(cleanFavourite());
            dispatch(logout());

            console.log('Account deleted');
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
            await GoogleSignin.signOut();
            dispatch(cleanFavourite());
            dispatch(logout());
            await persistor.purge();
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <Pressable
          onPress={() => navigation.navigate('Favourite')}
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
          <MenuItems
            Img={Images.Notification}
            menuName={'Notifications'}
            isLast={true}
            onPress={handleClick}
          />
        </MenuBox>
        <MenuBox title={'General'}>
          <MenuItems
            Img={Images.Color}
            menuName={'Contact Support'}
            isLast={false}
          />
          <MenuItems Img={Images.Font} menuName={'About Us'} isLast={false} />
          <MenuItems
            Img={Images.Notification}
            menuName={'Terms & Privacy'}
            isLast={true}
          />
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
      {isThemeBottomSheetVisible && (
        <FloatingCloseButton
          onPress={() => setThemeBottomSheetVisible(false)}
        />
      )}
      {isFontBottomSheetVisible && (
        <FloatingCloseButton onPress={() => setFontBottomSheetVisible(false)} />
      )}
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
