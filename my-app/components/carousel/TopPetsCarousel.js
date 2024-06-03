import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sizes, colors} from '../constants/theme'; // Import sizes and colors from your theme file
import Carousel from '../shared/Carousel';
import Card from '../Card/Card';
import CardMedia from '../Card/CardMedia';
import CardFavoriteIcon from '../Card/CardFavoriteIcon';

const CARD_HEIGHT = 200;

const TopPetsCarousel = ({list}) => {
  return (
    <Carousel
      items={list}
      renderItem={({item, style}) => {
        return (
          <Card
            style={[styles.card, style]}
            shadowType="dark"
            onPress={() => {
             
            }}>
            <CardFavoriteIcon active={false} onPress={() => {}} />
              <CardMedia source={item.image} borderBottomRadius />
          
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.location}>{item.type}</Text>
            </View>
          </Card>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2, // Use sizes object here
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3, // Use sizes object here
    color: colors.white,
  },
});

export default TopPetsCarousel;
