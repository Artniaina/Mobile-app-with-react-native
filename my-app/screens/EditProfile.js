import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { FONTS, COLORS } from "../components/constants/profil";
import { colors } from "../components/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import BackButton from "../components/shared/BackButton";
import { useUser } from "../utils/AuthContext";
import axios from "axios";
import { API_URL } from '@env';
const EditProfile = ({ navigation }) => {
  const { userData, updateUserData } = useUser();

  if (!userData) {
    return <ActivityIndicator />;
  }
  const [password, setPassword] = useState(userData.password);

  const [profile_image, setProfileImage] = useState(null);
  const [name, setName] = useState(userData.name);
  const [firstname, setFirstName] = useState(userData.firstname);
  const [preference, setPreference] = useState(userData.preference);
  const [email, setEmail] = useState(userData.email);
  const [adresse, setAdresse] = useState(userData.adresse);
  const [tel, setTel] = useState(userData.tel);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: colors.primary,
                textHeaderColor: colors.light,
                textDefaultColor: colors.white,
                selectedTextColor: COLORS.white,
                mainColor: colors.white,
                textSecondaryColor: COLORS.white,
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                Fermer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }


  const updateUserProfile = async () => {
    try {
      const res = await fetch(profile_image);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("firstname", firstname);
      formData.append("tel", tel);
      formData.append("adresse", adresse);
      formData.append("preference", preference);
      formData.append("birthdate", selectedStartDate);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profile_image", blob, "profile_image.jpg");
  
   
      const response = await axios.put(
        `${API_URL}/users/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  

      if (response.status === 200) {
        updateUserData({
          ...userData,
          name,
          firstname,
          email,
          tel,
          preference,
          profile_image: profile_image,
          adresse,
          password,
          birthdate: selectedStartDate,
        });
        navigation.goBack();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.gray,
        paddingHorizontal: 22,
      }}
    >
      <BackButton onPress={navigation.goBack} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          color: COLORS.white,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 10,
            marginLeft: 50,
            height: 20,
          }}
        >
          Modifier votre profil
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{
                uri: profile_image
              }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Nom</Text>
            <View>
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Prénom</Text>
            <View>
              <TextInput
                value={firstname}
                onChangeText={(value) => setFirstName(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Préférence</Text>
            <View>
              <TextInput
                value={preference}
                onChangeText={(value) => setPreference(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View>
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Telephone</Text>
            <View>
              <TextInput
                value={tel}
                onChangeText={(value) => setTel(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Mot de passe</Text>
            <View>
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
                style={styles.inputControl}
                secureTextEntry
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Adresse</Text>
            <View>
              <TextInput
                value={adresse}
                onChangeText={(value) => setAdresse(value)}
                editable={true}
                style={styles.inputControl}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Date de naissance</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={styles.inputControl}
            >
              <Text>{selectedStartDate || userData.birthdate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            backgroundColor: "#075eec",
            borderColor: "#075eec",
          }}
          onPress={updateUserProfile}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 26,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Modifier
          </Text>
        </TouchableOpacity>

        {renderDatePicker()}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {
  inputControl: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 15,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
};

export default EditProfile;
