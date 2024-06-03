import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DetailsScreen from "../components/MySpace/DetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import UpdatePets from "../screens/utils/UpdatePets";


const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabNavigator"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfileScreen"
          component={EditProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdatePetsScreen"
          component={UpdatePets}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailsScreen"
          component={DetailsScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterScreen"
          component={RegisterScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ProfileScreen"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
