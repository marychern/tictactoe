{/* SignupScreen:
      routed from login screen if user is new
*/}
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function SignupScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Sign up to play!</Title>
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
      <FormButton
        title='Sign up'
        modeValue='contained'
        color='#9bc8d4'
        labelStyle={styles.loginButtonLabel}
        onPress={() => register(email, password)}
      />
      {/* button to navigate back to login screen */}
      <FormButton
        title='Back to login'
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
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});
