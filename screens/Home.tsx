import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
        <View style={style.containerCenter}>
            <Text>Usuário logado: {auth.currentUser?.email}</Text>

            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} onPress={handleSignOut}>
                    <Text style={style.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
