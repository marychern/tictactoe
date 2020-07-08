{/* HomeScreen:
      initial screen after logging in where you can join/create a game
*/}
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IconButton, Title, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import range from 'lodash';

const _ = range;

export let game_ID = '';
export let name_ID = '';
export let symbol = '';

export default function HomeScreen({ navigation }) {
  {/* state variables for game ID and player usernames */}
  const [gameID, setGameID] = useState('');
  const [nameID, setNameID] = useState('');
  const [playerO, setPlayerO] = useState('');

  {/* updates firestore with player O username */}
  function handleJoinPress() {
    if (nameID.length>0 && gameID.length>0) {
      firestore()
        .collection('GAMES')
        .doc(gameID)
        .update({
          player_O: nameID
        });
      game_ID = gameID;
      name_ID = nameID;
      symbol = 'O';
      navigation.navigate('Game');
    }
    else Alert.alert('Error','Please enter a username and game ID');
  }
  {/* creates new doc in firestore with game ID (doc ID) and player X username */}
  function handleCreatePress() {
    if (nameID.length>0 && gameID.length>0) {
      firestore()
        .collection('GAMES')
        .doc(gameID)
        .set({
          player_X: nameID,
          player_O: playerO,
          turn: 'X',
          board: _.range(9).fill(''),
          count: 0,
          winner: 'E'
        });
      game_ID = gameID;
      name_ID = nameID;
      symbol = 'X';
      Alert.alert(
        'Share this game ID with your friend',
        gameID,
        [
          {text: 'Done'},
        ],
        { cancelable: false }
      );
      navigation.navigate('Waiting');
    }
    else Alert.alert('Error','Please enter a username and game ID');
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Join or Create a Game!</Title>
      <Text style={{ color:'#9bc8d4'}}>(game creator is player X, and game joiner is player O)</Text>
      <FormInput
        labelName='Username'
        value={nameID}
        autoCapitalize='none'
        onChangeText={text => setNameID(text)}
        theme={{colors: {primary: '#9bc8d4'}}}
      />
      <FormInput
        labelName='Game ID'
        value={gameID}
        autoCapitalize='none'
        onChangeText={text => setGameID(text)}
        theme={{colors: {primary: '#9bc8d4'}}}
      />
      <FormButton
        title='Join'
        modeValue='contained'
        color='#9bc8d4'
        onPress={() => handleJoinPress()}
      />
      <FormButton
        title='Create'
        modeValue='contained'
        color='#9bc8d4'
        onPress={() => handleCreatePress()}
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
