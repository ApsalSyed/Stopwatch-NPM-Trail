import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
    borderWidth: 2,
    borderColor: '#fff',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
  },
});

export default CustomButton;
