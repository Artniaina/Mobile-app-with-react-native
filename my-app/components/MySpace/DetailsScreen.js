import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import COLORS from "../constants/config/COLORS";
import SPACING from "../constants/config/SPACING";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAnimal } from "../../utils/AnimalContext";
import { API_URL } from '@env';
const DetailsScreen = ({ navigation, route }) => {
  const pet = route.params;
  const imageUrl = pet.image.replace(/\\/g, "/");

  const { addToFav, favoriteItems } = useAnimal();

  const handleEdit = () => {
    navigation.navigate("UpdatePetsScreen", { pet });
  };

  const handleAddToFav = () => {
    const isFavorite = favoriteItems.some(
      (item) => item.image === `${API_URL}/${imageUrl}`
    );

    addToFav({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      image: `${API_URL}/${imageUrl}`,
      description: pet.description,
      color: pet.color,
    });
  };

  const favoriteIconColor = favoriteItems.some(
    (item) => item.image === `${API_URL}/${imageUrl}`
  )
    ? COLORS.red
    : COLORS.gray;

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={{ uri: `${API_URL}/${imageUrl}` }}
          style={{ width: "100%", height: 500 }}
        >
          <SafeAreaView>
            <View
              style={{
                paddingHorizontal: SPACING,
                justifyContent: "space-between",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  width: SPACING * 3,
                  height: SPACING * 3,
                  borderRadius: SPACING * 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={navigation.goBack}
              >
                <Ionicons
                  name="chevron-back"
                  color={COLORS.primary}
                  size={SPACING * 2}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingBottom: SPACING * 7,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    width: SPACING * 3,
                    height: SPACING * 3,
                    borderRadius: SPACING * 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleAddToFav}
                >
                  <Ionicons
                    name="heart"
                    color={favoriteIconColor}
                    size={SPACING * 2}
                  />
                </TouchableOpacity>
                <View></View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SPACING * 1,
            borderRadius: SPACING * 2,
            bottom: SPACING * 2,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: SPACING * 1,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              {pet.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: SPACING * 1,
                  fontWeight: "bold",
                  color: COLORS.dark,
                }}
              ></Text>
              <Text>{pet.color}</Text>
            </View>
          </View>
          <View style={{ marginVertical: SPACING * 1 }}>
            <View style={{ flexDirection: "row", marginBottom: SPACING * 1 }}>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 1 }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: "bold",
                    fontSize: SPACING * 0.7,
                  }}
                >
                  {pet.type}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}>{pet.description}</Text>
            </View>
          </View>
        </View>
        <View
        style={{  width: "100%" }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: SPACING * 1.5,
            marginHorizontal: SPACING * 1.6,
            borderRadius: SPACING * 2,
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handleEdit}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SPACING * 1.5,
              fontWeight: "bold",
              marginRight: SPACING * 5,
              marginLeft: SPACING * 5,
            }}
          >
            Mettre à jour
          </Text>
          <Ionicons
            name="arrow-forward"
            size={SPACING * 1.8}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      </ScrollView>
     
    </>
  );
};

export default DetailsScreen;
