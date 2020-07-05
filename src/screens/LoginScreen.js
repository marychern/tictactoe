{/* LoginScreen:
      initial route of app
*/}
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function Login({ navigation }) {
  {/* initial values of user email & password */}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Tic-Tac-Toe</Title>
      {/* text input fields for user’s email/password */}
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        theme={{colors: {primary: '#9bc8d4'}}}
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        theme={{colors: {primary: '#9bc8d4'}}}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      {/* login button */}
      <FormButton
        title='Login'
        modeValue='contained'
        color='#9bc8d4'
        labelStyle={styles.loginButtonLabel}
      />
      {/* signup button navigates to sign up screen */}
      <FormButton
        title='New user? Sign up'
        modeValue='text'
        uppercase={false}
        color='#9bc8d4'
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('Signup')}
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
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
});
