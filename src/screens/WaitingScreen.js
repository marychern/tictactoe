{/* WaitingScreen:
      screen that loads the loading spinner while game creator waits for friend
*/}
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { game_ID } from './HomeScreen'
import Loading from '../components/Loading';

export default function WaitingScreen({ navigation }) {
  {/* state variables for game ID and player usernames */}
  const [oppID, setOppID] = useState('');

  function waiting() {
    if (oppID==='') {
      return(<Loading />);
    }
    else navigation.navigate('Game');
  }
  useEffect(() => {
    const movesListener = firestore()
      .collection('GAMES')
      .doc(game_ID)
      .onSnapshot(documentSnapshot => {
        setOppID(documentSnapshot.get('player_O'));
      });
    // Stop listening for updates whenever the component unmounts
    return () => {
      movesListener();
    }
  }, []);

  return (
    <View style={styles.container}>
      {waiting()}
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
});
