import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen1 from './ProfileSetup/IntroScreen1';
import IntroScreen2 from './ProfileSetup/IntroScreen2';
import Login from './ProfileSetup/Login';
import Profile from './ProfileSetup/Profile';
import BottomTabNavigator from './screens/BottomTabNavigator';
import Notification from './ProfileSetup/Notification';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './ProfileScreen/FavoritesScreen';
import ProfileEditScreen from './ProfileSetup/ProfileEditScreen';
import CommentsScreen from './screens/CommentsScreen';
import {  GestureHandlerRootView } from 'react-native-gesture-handler';
import {Images} from './assets/Images';
import {Image, TouchableOpacity} from 'react-native';
import {store, persistor} from './redux/store';
import {Provider, useSelector} from 'react-redux';
import {PortalProvider} from '@gorhom/portal';
import {PersistGate} from 'redux-persist/integration/react';
import History from './screens/History';
import moment from 'moment';
import { hasSeenIntro } from './redux/slices/introSlice';
import {selectIsSignedIn} from './redux/slices/authSlice';
const Stack = createNativeStackNavigator();
const NavigationLogin = () => {
  const hasSeen=useSelector(hasSeenIntro)
  console.log(hasSeen);
  return (
    <Stack.Navigator
    initialRouteName={!hasSeen ? 'Intro1' : 'Login'}
      screenOptions={{ 
        headerShown: false,
        statusBarBackgroundColor: '#18171C',
      }}>
      <Stack.Screen name="Intro1" component={IntroScreen1} />
      <Stack.Screen name="Intro2" component={IntroScreen2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Profile Setup"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="Notification"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Notifications preference',
          headerLeft: () => false,
        }}
        component={Notification}
      />
    </Stack.Navigator>
  );
};
const NavigationStack = () => {
  const date = moment().format('ll');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: '#18171C',
      }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="Favourite"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Favourites',
        }}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="Edit Profile"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Edit Profile',
        }}
        component={ProfileEditScreen}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Comments',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Images.Cross}
                style={{height: 30, width: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="HistoryComment"
        component={History}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#18171C',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: date,
        }}
      />
    </Stack.Navigator>
  );
};
const AppContent = () => {
  const isSignIn = useSelector(selectIsSignedIn);

  return isSignIn ? <NavigationStack /> : <NavigationLogin />;
};
const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <PortalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
