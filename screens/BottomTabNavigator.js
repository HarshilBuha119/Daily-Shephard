import React from 'react';
import { Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PodCastScreen from './PodCastScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import { Images } from '../assets/Images';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel:false,
        tabBarStyle: {
          height: 80,
          backgroundColor:"#18171C"
        },
        tabBarIconStyle: {
          marginVertical: 10,
        },
        tabBarIcon: ({focused}) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = focused? Images.Home : Images.Home1;
              break;
            case 'Podcast':
              iconSource = focused ? Images.Podcast : Images.Podcast1;
              break;
            case 'History':
              iconSource = focused ? Images.History : Images.History1;
              break;
            case 'Profile':
              iconSource = focused ? Images.Profile : Images.Profile1;
              break;
            default:
              iconSource = Images.Home;
          }
          return (
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#20C997' : '#8f8f8f',
              }}
              source={iconSource}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Podcast" component={PodCastScreen} options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#18171C',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShadowVisible:false,
            headerTitleStyle:{
              fontSize:25
            }
          }}/>
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#18171C',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShadowVisible:false,
            headerTitleStyle:{
              fontSize:25
            }
          }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
