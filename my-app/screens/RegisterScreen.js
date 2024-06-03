import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import axios from "axios";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { FONTS, COLORS } from "../components/constants/profil";
import { API_URL } from '@env';
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [preference, setPreference] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile_image, setProfileimage] = useState(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const handleDateChange = (date) => {
    setBirthdate(date);
  };

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
              backgroundColor: COLORS.primary,
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
              onSelectedChange={(date) => {
                setSelectedStartDate(date);
                handleDateChange(date);
              }}
              options={{
                backgroundColor: COLORS.primary,
                textHeaderColor: "#469ab6",
                textDefaultColor: COLORS.white,
                selectedTextColor: COLORS.white,
                mainColor: "#469ab6",
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
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      setProfileimage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !firstname ||
      !tel ||
      !adresse ||
      !preference ||
      !birthdate ||
      !password ||
      !profile_image
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    console.log("Hello world");
    try {
      console.log("Hello world");
      const response = await fetch(profile_image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("firstname", firstname);
      formData.append("tel", tel);
      formData.append("adresse", adresse);
      formData.append("preference", preference);
      formData.append("birthdate", birthdate);
      formData.append("password", password);
      formData.append("profile_image", blob, "image.jpg");

      const res = await axios.post(`${API_URL}/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        setName("");
        setEmail("");
        setFirstName("");
        setTel("");
        setAdresse("");
        setPreference("");
        setBirthdate("");
        setConfirmPassword("");
        setPassword("");
        setProfileimage(null);
        console.log(res.data);
        Alert.alert("Success", "Registration successful");
        navigation.goBack();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error creating animal:", error);
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <LottieView
              source={require("../assets/lottie/flash-medit.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
            <Text style={styles.title}>
              Sign up 
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="name"
                onChangeText={setName}
                placeholder="John Doe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={name}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="user@gmail.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="name"
                onChangeText={setFirstName}
                placeholder="Doe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={firstname}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Téléphone</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="name"
                onChangeText={setTel}
                placeholder="+261 00 000 00"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={tel}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Préférences</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="name"
                onChangeText={setPreference}
                placeholder="Cute things XD"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={preference}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="name"
                onChangeText={setAdresse}
                placeholder="Lot 0 Rue "
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={adresse}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Date de naissance</Text>
                <TouchableOpacity
                  onPress={handleOnPressStartDate}
                  style={styles.inputControl}
                >
                  <Text>{selectedStartDate || birthdate}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={setConfirmPassword}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={confirmPassword}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Profile Image</Text>
              {profile_image && (
                <Image
                  source={{ uri: profile_image }}
                  style={styles.profile_image}
                />
              )}
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imagePickerButton}
              >
                <Text style={styles.imagePickerButtonText}>Select Image</Text>
              </TouchableOpacity>
            </View>

            {renderDatePicker()}
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
          style={{ marginTop: "auto" }}
        >
          <Text style={styles.formFooter}>
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },

  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
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
  profile_image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "#075eec",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  imagePickerButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
