import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../js/firebase";
import { Usuario } from "../model/Usuario";
import style from "../js/style";

const Registro = () => {
    const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});
    const refUsuario = firestore.collection("Usuario");

    const navigation = useNavigation();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) navigation.navigate("Home" as never);
        });
    });

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Registrado como ", user.email);

                const refIdUsuario = refUsuario.doc(auth.currentUser.uid);
                refIdUsuario.set({
                    id: auth.currentUser.uid,
                    ...formUsuario,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={style.containerCenter}>
            <View style={style.inputContainer}>
                <TextInput
                    placeholder="Nome"
                    onChangeText={(texto) =>
                        setFormUsuario({
                            ...formUsuario,
                            nome: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(texto) =>
                        setFormUsuario({
                            ...formUsuario,
                            email: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Senha"
                    onChangeText={(texto) =>
                        setFormUsuario({
                            ...formUsuario,
                            senha: texto,
                        })
                    }
                    secureTextEntry
                    style={style.input}
                />
                <TextInput
                    placeholder="Data Nascimento"
                    onChangeText={(texto) =>
                        setFormUsuario({
                            ...formUsuario,
                            datanasc: texto,
                        })
                    }
                    style={style.input}
                />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.buttonOutline} onPress={handleSignUp}>
                    <Text style={style.buttonOutlineText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Registro;
