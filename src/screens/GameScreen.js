{/* GameScreen:
      the screen of the tic-tac-toe game
*/}
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Tic-Tac-Toe Game Will Display Here</Title>
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
  }
});
