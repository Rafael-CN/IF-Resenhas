import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
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
    auth
      .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
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
      <View style={style.containerSuperiorAvatar}>
        <Image
          source={require("../assets/avatar.png")}
          style={style.avatarLogo}
        />
        <Text style={style.titleApp}>CineFy</Text>
      </View>

      <View style={style.inputContainer}>
        <Text style={style.inputLabel}>Nome:</Text>
        <TextInput
          style={style.inputLabel}
          placeholder="Nome"
          onChangeText={(texto) =>
            setFormUsuario({
              ...formUsuario,
              nome: texto,
            })
          }
          style={style.input}
        />
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
      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={handleSignUp}>
          <Text style={style.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={style.registerText}
        onPress={() => navigation.navigate("Login")}>
        Já tem uma conta? <Text style={style.registerLink}>Entrar</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Registro;
