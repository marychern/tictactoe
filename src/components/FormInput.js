// FormInput:
//    a component that provides a text input field for login/signup screens
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

// get user's screen dimensions
const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest} // allows the component to have other props values
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width/1.5,
    height: height/15
  }
});
