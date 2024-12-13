import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ImageStyle, ScrollView } from "react-native";
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
            if (user) navigation.navigate("Menu" as never);
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
        <ScrollView contentContainerStyle={style.scrollContainer}>
            <View style={style.containerSuperiorAvatar}>
                <Image source={require("../assets/avatar.png")} style={style.avatarLogo as ImageStyle} />
                <Text style={style.titleApp}>CineFy</Text>
            </View>

            <View style={style.formContainer}>
                <View style={style.inputContainer}>
                    <View style={style.distancia}>
                        <Text style={style.inputLabel}>Nome:</Text>
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
                    </View>
                    <View style={style.distancia}>
                        <Text style={style.inputLabel}>E-mail:</Text>
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
                    </View>
                    <View style={style.distancia}>
                        <Text style={style.inputLabel}>Senha:</Text>
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
                    </View>
                    <View style={style.distancia}>
                        <Text style={style.inputLabel}>Data de Nascimento:</Text>
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
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.button} onPress={handleSignUp}>
                        <Text style={style.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Registro;
