import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../components/constants/profil";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../utils/AuthContext";
import { API_URL } from "@env";
import { ActivityIndicator } from "react-native";
import bg from "../assets/bg.png";
import BackButton from "../components/shared/BackButton";

const Profile = ({ navigation }) => {
  const { userData, logout } = useUser();
  const handleLogout = async () => {
    await logout();
    navigation.navigate("LoginScreen");
  };
  console.log(userData);

  if (!userData) {
    return <ActivityIndicator />;
  }

  const imageUrl = userData.profile_image.replace(/\\/g, "/");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ position: "relative" }}>
        <Image
          source={bg}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: `${API_URL}/${imageUrl}` }}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            color: COLORS.primary,
            marginVertical: 8,
            fontWeight: "bold",
          }}
        >
          {userData.name} {userData.firstname}
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20 ,fontWeight: "bold",}}>Email: </Text>
          {userData.email}
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20, fontWeight: "bold",}}>Telephone: </Text>
          {userData.tel}
        </Text>

    
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 6,
          }}
        >
          <Text style={{ padding: 20 ,fontWeight: "bold",}}>Adresse: </Text>
          {userData.adresse}
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            fontSize: 20,
            marginVertical: 8,
          }}
        >
          {" "}
          <Text style={{ padding: 20,fontWeight: "bold", }}>Prefence: </Text>
          {userData.preference}
        </Text>
      </View>

      <View
        style={{ flexDirection: "column", marginLeft: 50, marginRight: 50 }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfileScreen");
          }}
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            backgroundColor: "#075eec",
            borderColor: "#075eec",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 26,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Modifier le profil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            backgroundColor: "#075eec",
            borderColor: "#075eec",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 26,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.primary,
    marginVertical: 8,
  },
});

export default Profile;
