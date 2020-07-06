{/* HomeStack:
      stack navigator for screens after logging in
*/}
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import JoinScreen from '../screens/JoinScreen';
import CreateScreen from '../screens/CreateScreen';
import GameScreen from '../screens/GameScreen';

{/* stack navigators */}
const LobbyStackNav = createBottomTabNavigator();
const ModalStack = createStackNavigator();

{/* LobbyStack holds the screens/stacks when user is out of game */}
function LobbyStack() {
  return (
    <LobbyStackNav.Navigator>
      <LobbyStackNav.Screen name='Home' component={HomeScreen} />
      <LobbyStackNav.Screen name='Settings' component={SettingsScreen} />
    </LobbyStackNav.Navigator>
  );
}

{/* AppStack holds the screens/stacks when user is logged in */}
export default function AppStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='Lobby' component={LobbyStack} />
      <ModalStack.Screen name='Game' component={GameScreen} />
    </ModalStack.Navigator>
  );
}
