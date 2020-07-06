{/* HomeScreen:
      initial screen after logging in where you can join/create a game
*/}
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function HomeScreen({ navigation }) {
  {/* state variables for game ID and player usernames */}
  const [gameID, setGameID] = useState('');
  const [nameID, setNameID] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  {/* state variable for toggling popup */}
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  {/* updates firestore with player O username */}
  function handleJoinPress() {
    if (gameID.length>0 && nameID.length>0) {
      firestore()
        .collection('GAMES')
        .doc(gameID)
        .update({
          player_O: nameID
        })
        .then(() => {
          toggleModal;
          navigation.navigate('Game')
        });
    }
  }
  {/* creates new doc in firestore with game ID (doc ID) and player X username */}
  function handleCreatePress() {
    if (gameID.length>0 && nameID.length>0) {
      firestore()
        .collection('GAMES')
        .doc(gameID)
        .set({
          player_X: nameID,
          player_O: playerO
        })
        .then(() => {
          toggleModal;
          navigation.navigate('Game')
        });
    }
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
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Share your game ID with your friend</Text>

          <FormButton
            title="Done"
            color='#9bc8d4'
            onPress={toggleModal}
          />
        </View>
      </Modal>
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
