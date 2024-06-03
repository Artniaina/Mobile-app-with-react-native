import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';
const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [animalData, setAnimalData] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favTotalQuantity, setFavTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch(`${API_URL}/animals`);
        const data = await response.json();

        setAnimalData(data);

        await AsyncStorage.setItem("animalData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchAnimalData();
    loadFavoriteItems(); 
  }, []);

    const updateAnimalData = async (newAnimalData) => {
    try {
      await AsyncStorage.setItem("animalData", JSON.stringify(newAnimalData));
      setAnimalData(newAnimalData);
    } catch (error) {
      console.error("Error updating animal data:", error);
    }
  };

  const loadFavoriteItems = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favoriteItems");
      if (storedFavorites !== null) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavoriteItems(parsedFavorites);
        setFavTotalQuantity(parsedFavorites.length);
      }
    } catch (error) {
      console.error("Error loading favorite items:", error);
    }
  };

  const addToFav = async (newItemFav) => {
    try {
      const existingFavIndex = favoriteItems.findIndex(
        (item) => item.id === newItemFav.id
      );

      if (existingFavIndex === -1) {
        const updatedFavorites = [...favoriteItems, newItemFav];
        setFavoriteItems(updatedFavorites);
        setFavTotalQuantity(updatedFavorites.length);

      
        await AsyncStorage.setItem(
          "favoriteItems",
          JSON.stringify(updatedFavorites)
        );
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const deleteFavItem = async (id) => {
    try {
      const itemIndexToDelete = favoriteItems.findIndex(
        (item) => item.id === id
      );

      if (itemIndexToDelete !== -1) {
        const updatedFavorites = favoriteItems.filter(
          (item, index) => index !== itemIndexToDelete
        );
        setFavoriteItems(updatedFavorites);
        setFavTotalQuantity(updatedFavorites.length);

     await AsyncStorage.setItem(
          "favoriteItems",
          JSON.stringify(updatedFavorites)
        );
      }
    } catch (error) {
      console.error("Error deleting favorite item:", error);
    }
  };

  return (
    <AnimalContext.Provider
      value={{
        animalData,
        updateAnimalData,
        favoriteItems,
        addToFav,
        deleteFavItem,
        favTotalQuantity,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimal = () => {
  return useContext(AnimalContext);
};

export default AnimalContext;
