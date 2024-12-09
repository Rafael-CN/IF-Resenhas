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
    auth
      .signInWithEmailAndPassword(email, senha)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logado como ", user.email);
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
        <View style={style.distancia}>
          <Text style={style.inputLabel}>Email:</Text>
          <TextInput
            placeholder="Email"
            onChangeText={(texto) => setEmail(texto)}
            style={style.input}
          />
        </View>

        <View style={style.distancia}>
          <Text style={style.inputLabel}>Senha:</Text>
          <TextInput
            placeholder="Senha"
            onChangeText={(texto) => setSenha(texto)}
            style={style.input}
            secureTextEntry
          />
        </View>
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={style.registerText} onPress={irParaRegistro}>
          Não tem uma conta? <Text style={style.registerLink}>Cadastre-se</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
