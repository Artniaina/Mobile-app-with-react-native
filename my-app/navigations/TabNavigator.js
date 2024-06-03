import React from "react";
import { Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../components/constants/theme";
import FavoriteScreen from "../screens/FavoriteScreen";
import AddNewPets from "../screens/utils/AddNewPets";
import HomeScreen from "../screens/HomeScreen";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 40,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? colors.primary : "#464555"}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={AddNewPets}
          options={({ route }) => ({
            tabBarStyle: { display: "none" },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: Platform.OS == "android" ? 50 : 30,
                }}
              >
                <FontAwesome5 name="plus" size={20} color="white" />
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="heart"
                  size={20}
                  color={focused ? colors.primary : "#464555"}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
