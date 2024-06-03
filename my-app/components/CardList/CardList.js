import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FavouriteButton from "../shared/FavoriteButton"


const CardList = ({ name, color, image }) => {
  
  return (
    <View style={styles.item}>
    <FavouriteButton style={styles.favouriteButton} />
    <View style={styles.contentContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.breed}>{color}</Text>
      </View>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      favouriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
      },
      textContainer: {
        flex: 1,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      breed: {
        fontSize: 14,
        color: '#777',
      },
})
export default CardList

