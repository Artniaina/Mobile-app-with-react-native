import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import LottieView from "lottie-react-native";
import BackButton from "../../components/shared/BackButton";
import { colors } from "../../components/constants/theme";
import { useAnimal } from "../../utils/AnimalContext";
import { API_URL } from '@env';

const AddNewPets = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  const { updateAnimalData, animalData } = useAnimal();

  const handleSubmit = async () => {
    if (!name || !type || !color || !description || !image) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("color", color);
      formData.append("description", description);
      formData.append("image", blob, "image.jpg");

      const res = await axios.post(`${API_URL}/animals`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });;

      const newAnimalData = res.data;

      updateAnimalData([...animalData, newAnimalData]);

      setName("");
      setColor("");
      setDescription("");
      setType("");
      setImage(null);
      Alert.alert("Success", "Registration successful");

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating animal:", error);
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.primary,
      }}
    >
      <View style={{ flex: 1, paddingBottom: 25 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <LottieView
          source={require("../../assets/lottie/cat-cloud.json")}
          autoPlay
          loop
          style={{ width: 300 ,height: 300 }}
        />
      </View>
      <ScrollView
        style={{
          flex: 2,
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
          backgroundColor: "#e8ecf4",
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 48,
            borderTopRightRadius: 48,
            padding: 22,
            paddingTop: 50,
            backgroundColor: "#e8ecf4",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20 }}>
            Add new pets
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name"
              onChangeText={(name) => setName(name)}
              placeholder="Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={name}
            />
            <TextInput
              autoCorrect={false}
              onChangeText={(type) => setType(type)}
              placeholder="Type"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={type}
            />
            <TextInput
              autoCorrect={false}
              onChangeText={(color) => setColor(color)}
              placeholder="Color"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={color}
            />
            <TextInput
              autoCorrect={false}
              onChangeText={(description) => setDescription(description)}
              placeholder="Description"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={description}
            />

            <TouchableOpacity
              title="Choose Image"
              onPress={pickImage}
              style={{ marginBottom: 20, padding: 30 }}
            >
              <Text>Choose image </Text>

              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 55, height: 55, borderRadius: 20 }}
                />
              )}
            </TouchableOpacity>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Ajouter</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#e8ecf4",
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  inputControl: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    margin: 7,
    borderRadius: 15,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
};

export default AddNewPets;
