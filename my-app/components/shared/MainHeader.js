import React from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';
import { sizes, spacing } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from "../../utils/AuthContext"
import { API_URL } from '@env';
const MainHeader = ({ title , navigation}) => {
  const insets = useSafeAreaInsets();
  //const userAvatar = require('../../assets/hi.jpg');
  const { userData } = useUser();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <MaterialIcons name="dashboard" size={24} color="#464555" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.notificationContainer}>
        {/* Afficher l'avatar de l'utilisateur */}
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}><Image   source={{
                    uri: `${API_URL}/${userData.profile_image.replace(
                      /\\/g,
                      "/"
                    )}`,
                  }} style={styles.avatar} /></TouchableOpacity>
        
        <Icon icon="Notification" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45, 
    height: 45,
    borderRadius: 20,
    marginRight: 10, 
  },
});

export default MainHeader;
