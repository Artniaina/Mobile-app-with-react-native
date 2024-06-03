import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "./storage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const updateUserData = async (newUserData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
      setUserData(newUserData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("favoriteItems");
      setUserData(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, updateUserData , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};

export default AuthContext;
