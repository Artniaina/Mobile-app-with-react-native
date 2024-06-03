import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, shadow, sizes} from '../constants/theme';
import Icon from './Icon';

const FavoriteButton = ({active, style, onPress}) => {
  return (
    <Icon
      containerStyle={style}
      viewStyle={styles.view}
      onPress={onPress}
      icon={active ? 'FavoriteFilled' : 'Favorite'}
      size={24}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
});

export default FavoriteButton;
