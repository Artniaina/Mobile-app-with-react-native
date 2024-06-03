import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {sizes} from '../constants/theme';

const CardMedia = ({source, borderBottomRadius = false}) => {
  return (
    <View
      style={[styles.media].concat(
        borderBottomRadius ? styles.borderBottomRadius : null,
      )}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  borderBottomRadius: {
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
  },
});

export default CardMedia;
