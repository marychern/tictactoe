{/* JoinScreen:
      a screen to join a game
*/}
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function JoinScreen({ navigation }) {
  const [gameID, setGameID] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Join a Game!</Title>
      <FormInput
        labelName='Game ID'
        value={gameID}
        autoCapitalize='none'
        theme={{colors: {primary: '#9bc8d4'}}}
      />
      <FormButton
        title='Join'
        modeValue='contained'
        color='#9bc8d4'
      />
      <FormButton
        title='Back to game lobby'
        modeValue='text'
        uppercase={false}
        color='#9bc8d4'
        labelStyle={styles.navButtonText}
        onPress={() => navigation.goBack()}
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
  },
  titleText: {
    color: '#9bc8d4',
    fontSize: 24,
    marginBottom: 10
  },
});
