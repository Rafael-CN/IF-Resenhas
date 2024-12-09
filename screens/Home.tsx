import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../js/firebase";
import style from "../js/style";
import React from "react";

const Home = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await auth.signOut();
    navigation.navigate("Login" as never);
  };

  return (
    <View style={style.logoutIconContainer}>
      <TouchableOpacity onPress={handleSignOut}>
        <Icon name="door-open" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
