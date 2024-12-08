import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { auth } from "../js/firebase";
import style from "../js/style";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) navigation.navigate("Menu" as never);
        });
    });

    const irParaRegistro = () => {
        navigation.navigate("Registro" as never);
    };

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, senha)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logado como ", user.email);
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={style.containerCenter}>
            <View style={style.inputContainer}>
                <TextInput placeholder="Email" onChangeText={(texto) => setEmail(texto)} style={style.input} />
                <TextInput placeholder="Senha" onChangeText={(texto) => setSenha(texto)} style={style.input} secureTextEntry />
            </View>

            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} onPress={handleLogin}>
                    <Text style={style.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.buttonOutline} onPress={irParaRegistro}>
                    <Text style={style.buttonOutlineText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
