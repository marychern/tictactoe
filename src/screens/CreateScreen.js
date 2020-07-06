{/* CreateScreen:
      a screen to create a new game
*/}
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function CreateScreen({ navigation }) {
  {/* state variables for game ID and popup for ID */}
  const [gameID, setGameID] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function handleButtonPress() {
    if (gameID.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: gameID
        })
        .then(() => {
          toggleModal;
        });
    }
  }

  return (
    <View style={styles.Container}>
      <Title style={styles.title}>Create a New Game</Title>
      <FormInput
        labelName='Game ID'
        value={gameID}
        theme={{colors: {primary: '#9bc8d4'}}}
        onChangeText={(text) => setGameID(text)}
        clearButtonMode='while-editing'
      />
      <FormButton
        title='Create'
        modeValue='contained'
        color='#9bc8d4'
        onPress={() => handleButtonPress()}
        disabled={gameID.length === 0}
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
  Container: {
    flex: 1,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#9bc8d4',
    fontSize: 24,
    marginBottom: 10,
  },
});
