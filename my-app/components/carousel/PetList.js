import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';
import FavoriteButton from '../shared/FavoriteButton';


import Card from '../Card/Card';
import CardMedia from '../Card/CardMedia';
import CardContent from '../Card/CardContent';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const PetList = ({list}) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <Card
            key={item.id}
            style={styles.card}
           >
          
              <CardMedia source={item.image} borderBottomRadius />
         
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.location}>{item.type}</Text>
              </View>
              <FavoriteButton onPress={() => {}} />
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  media: {
    flex: 1,
  },
  content: {
    paddingRight: spacing.m / 2,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default PetList;
