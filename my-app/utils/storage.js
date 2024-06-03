import AsyncStorage from '@react-native-async-storage/async-storage';
export const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString); 
      return { token, ...userData }; 
    } catch (error) {
      console.error("Error getting user data from AsyncStorage:", error);
      return null;
    }
  };
  