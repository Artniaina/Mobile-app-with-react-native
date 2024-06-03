import {
    View,
    Image,
    Text,
    TouchableOpacity, 
    StyleSheet,
  } from 'react-native';
 
  import { API_URL } from '@env';
  import { colors } from '../constants/theme';
import TrashButton from '../shared/TrashButton';

  
  const CardPets = ({ pet, navigation,onDelete }) => {
    // Récupérez l'URL de l'image de la propriété pet.image
    const imageUrl = pet.image.replace(/\\/g, '/');
   
  
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', pet)}>
        <View style={style.cardContainer}>
          <View style={style.cardImageContainer}>
            <Image
              source={{ uri: `${API_URL}/${imageUrl}` }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 20,
              }}
            />
          </View>
  
          {/* Render all the card details here */}
          <View style={style.cardDetailsContainer}>
            {/* Name and gender icon */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.dark,
                  fontSize: 20,
                }}>
                {pet?.name}
              </Text>
      
              <TrashButton onPress={onDelete} />
             

             
            </View>
  
            {/* Render the age and type */}
            <Text
              style={{
                fontSize: 12,
                marginTop: 5,
                color: colors.dark,
              }}>
              {pet?.type}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 5,
                color: colors.grey,
              }}>
              {pet?.color}
            </Text>
  
          
          </View>
         
         
        </View>
      </TouchableOpacity>
    );
  };
  
  const style = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
    cardImageContainer: {
      height: 150,
      width: 140,
      backgroundColor: colors.background,
      borderRadius: 20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: colors.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
      },
  });
  export default CardPets;
  