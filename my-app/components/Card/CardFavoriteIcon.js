import React from 'react';
import {StyleSheet} from 'react-native';
import FavoriteButton from '../shared/FavoriteButton'

const CardFavoriteIcon = ({style, active, onPress}) => {
  return (
    <FavoriteButton
      style={[styles.icon, style]}
      active={active}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
});

export default CardFavoriteIcon;
