// CustomInputField.js
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomInputField = ({value, onChangeText, placeholder, style}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
    />
  );
};

export default CustomInputField;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
});
