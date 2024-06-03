import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors, shadow, sizes } from '../constants/theme';
import { AntDesign } from '@expo/vector-icons'; 

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={[styles.backButton, styles.view]} onPress={onPress}>
      <AntDesign name="left" size={24} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  view: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
});

export default BackButton;
