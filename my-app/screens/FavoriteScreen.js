import React from "react";
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import CardList from "../components/CardList/CardList";
import MainHeader from "../components/shared/MainHeader";
import TopPetsCarousel from "../components/carousel/TopPetsCarousel";
import { TOP_PETS } from "../components/carousel/data";
import { colors } from "../components/constants/theme";
import ScreenHeader from "../components/shared/ScreenHeader";
import SectionHeader from "../components/shared/SectionHeader";
import { useAnimal } from "../utils/AnimalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteScreen = ({ navigation }) => {
  const clearFavoriteItems = async () => {
    try {
      await AsyncStorage.removeItem("favoriteItems");
      setFavoriteItems([]);
      setFavTotalQuantity(0);
    } catch (error) {
      console.error("Erreur lors de la suppression de favoriteItems:", error);
    }
  };

  const { favoriteItems } = useAnimal();
  console.log(favoriteItems);

  return (
    <View style={styles.container}>
      <MainHeader title="Favorite" navigation={navigation} />
      <ScreenHeader mainTitle="Find here" secondTitle="your favorite pets" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPetsCarousel list={TOP_PETS} />
        <SectionHeader
          title="Latest update"
          buttonTitle="See All"
          onPress={() => {}}
        />
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardList name={item.name} color={item.color} image={item.image} id={item.id} />
          )}
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default FavoriteScreen;
