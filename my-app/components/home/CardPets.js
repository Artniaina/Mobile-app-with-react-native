import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/theme';

const CardPets = ({pet, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsPetsScreen', pet)}>
      <View style={style.cardContainer}>
      
        <View style={style.cardImageContainer}>
          <Image
            source={pet.image}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontWeight: 'bold', color: colors.dark, fontSize: 20}}>
              {pet?.name}
            </Text>
            <Icon name="gender-male" size={22} color={colors.grey} />
          </View>

          {/* Render the age and type */}
          <Text style={{fontSize: 12, marginTop: 5, color: colors.dark}}>
            {pet?.type}
          </Text>
          <Text style={{fontSize: 10, marginTop: 5, color: colors.grey}}>
            {pet?.age}
          </Text>

          {/* Render distance and the icon */}
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="map-marker" color={colors.primary} size={18} />
            <Text style={{fontSize: 12, color: colors.grey, marginLeft: 5}}>
              Distance:7.8km
            </Text>
          </View>
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
