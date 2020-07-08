{/* GameScreen:
      the screen of the tic-tac-toe game
*/}
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { game_ID, name_ID, symbol } from './HomeScreen'
import firestore from '@react-native-firebase/firestore';
import range from 'lodash';

const _ = range;

export default function HomeScreen({ navigation }) {
  // Winning combinations
  const win_combos = [
    [0, 3, 6],
    [1, 4, 7],
    [0, 1, 2],
    [3, 4, 5],
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // Corresponds to the cell number on the board
  const ids = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  // board for UI
  let rows = [
    _.range(3).fill(''),
    _.range(3).fill(''),
    _.range(3).fill(''),
  ];
  const gameID = game_ID;
  const nameID = name_ID;
  const player = symbol;
  let game_over = false; // changes to true when game is over
  const [board, setBoard] = useState({}); // tictactoe board tracks player's moves
  const [turn, setTurn] = useState('X'); // Changes every time a player makes a move
  // keeps track of # of moves made so far and used to check if the game ends in a draw
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState('E'); // changes to player who wins
  let win = 'E';

  function generateRows() {
    if (winner!=='E') {
      console.log("count: "+count);
      console.log("winner: "+winner);
      announceWinner();
      firestore() // resets the game in case players want to use the same game ID
        .collection('GAMES')
        .doc(gameID)
        .delete();
      navigation.navigate('Home');
    }
    else {
      return rows.map((row, col_index) => {
        return (
          <View style={styles.row} key={col_index}>
            {generateCells(row, col_index)}
          </View>
        );
      });
    }
  }
  function generateCells(row, row_index) {
    return row.map((cell, col_index) => {
      let id = ids[row_index][col_index];
      return (
        <TouchableHighlight
          key={col_index}
          onPress={() => makeMove(id)}
          underlayColor={"#CCC"}
          style={styles.cell}>
          <Text style={styles.cell_text}>{board[id]}</Text>
        </TouchableHighlight>
      );
    });
  }

  function showTurn() {
    if (turn===player) {
      return(
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfo_text}>Your Turn!</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfo_text}>Opponent is thinking...</Text>
        </View>
      )
    }
  }

  function makeMove(id) {
    if(!board[id] && (turn===player)){
      // update board, turn, count
      const moves = board;
      moves[id] = player;
      const newTurn = (turn==='X') ? 'O' : 'X';
      const newCount = count+1;
      isGameOver();
      onMakeMove(moves, newTurn, newCount);
      console.log(player+' in makeMove after move: '+win);
      firestore()
        .collection('GAMES')
        .doc(gameID)
        .get()
        .then(documentSnapshot => documentSnapshot.get('winner'))
        .then(winn => {
          console.log(player+' in firestore after move: ', winn);
        });
      showTurn();
      // generateRows();
      // announceWinner();
    }
  }
  async function onMakeMove(moves, newTurn, newCount) {
    await firestore()
      .collection('GAMES')
      .doc(gameID)
      .update({
        board: moves,
        turn: newTurn,
        count: newCount,
        winner: win
      });
  }
  useEffect(() => {
    const movesListener = firestore()
      .collection('GAMES')
      .doc(gameID)
      .onSnapshot(documentSnapshot => {
        setBoard(documentSnapshot.get('board'));
        setTurn(documentSnapshot.get('turn'));
        setCount(documentSnapshot.get('count'));
        setWinner(documentSnapshot.get('winner'));
      });
    // Stop listening for updates whenever the component unmounts
    return () => {
      movesListener();
    }
  }, []);

  function isGameOver() { // check to see if the game is over
    for (let i=0; i<win_combos.length; i++) {
      const [a, b, c] = win_combos[i];
      if (board[a] && board[a]===board[b] && board[a]===board[c]) {
        game_over = true;
        win = board[a];
      }
    }
    // Check if the game ends in a tie
    console.log("before tie check: "+count);
    if(count===9){
      console.log("in tie check");
      game_over = true;
      win = 'T';
    }
  }
  function announceWinner() { // function to announce the winner
    if (winner!=='E') {
      console.log(winner);
      if(player===winner){
        Alert.alert(
          'Congratulations, you won!! :)',
          'Play again to see if you will win again!',
          [
            {text: 'Yay!'},
          ],
          { cancelable: false }
        );
      }
      else if (winner!=='T'){
        Alert.alert(
          'You lost :/',
          'Play again to see if you will win!',
          [
            {text: 'Okay'},
          ],
          { cancelable: false }
        );
      }
      else {
        Alert.alert(
          'It\'s a tie!',
          'Who will win next time? Play again to see!',
          [
            {text: 'Okay'},
          ],
          { cancelable: false }
        );
      }
      // firestore() // resets the game in case players want to use the same game ID
      //   .collection('GAMES')
      //   .doc(gameID)
      //   .delete();
      // navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.board_container}>
      <View style={styles.board}>
        {generateRows()}
      </View>
      <View style={styles.gameInfo_container}>
        {showTurn()}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  board_container: {
    backgroundColor: '#292929',
    flex: 9
  },
  board: {
    flex: 7,
    flexDirection: 'column',
    color: '#9bc8d4'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#9bc8d4',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#9bc8d4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell_text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#9bc8d4'
  },
  gameInfo_container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  gameInfo: {
    flex: 1,
    alignItems: 'center',
  },
  gameInfo_text: {
    fontSize: 20,
    color: '#9bc8d4'
  }
});
