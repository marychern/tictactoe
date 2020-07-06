{/* HomeScreen:
      initial screen after logging in where you can join/create a game
*/}
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
      <Title>Join or Create a Game Here!</Title>
      <FormButton
        modeValue='contained'
        title='Logout'
        onPress={() => logout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#292929',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
