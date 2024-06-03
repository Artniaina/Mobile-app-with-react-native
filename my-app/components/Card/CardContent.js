import React from 'react';
import {View, StyleSheet} from 'react-native';
import {spacing} from '../constants/theme';

const CardContent = ({children, style}) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.l / 2,
  },
});

export default CardContent;
