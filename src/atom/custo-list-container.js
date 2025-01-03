// CustomListContainer.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomListContainer = ({title, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default CustomListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
});
