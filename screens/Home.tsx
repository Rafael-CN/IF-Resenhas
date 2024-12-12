import { View, Text, TouchableOpacity, Image } from "react-native";
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
    <View style={style.containerHome}>
      <View style={style.rectangle}>
        <Text style={style.cinefyText}>Cinefy</Text>
      </View>
      <View style={{ marginTop: 70 }}>
        <Image
          source={require("../assets/avatar.png")}
          style={style.avatarImage}
        />
        <Text style={style.textBelowAvatar}>Imortalize a magia de</Text>
        <Text style={style.textBelowAvatar}>cada filme</Text>
      </View>
      <View style={style.logoutIconContainer}>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="door-open" size={50} color="#8F6277" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
