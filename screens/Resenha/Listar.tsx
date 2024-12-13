import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../js/firebase";
import { Resenha } from "../../model/Resenha";
import style from "../../js/style";
import { ScrollView } from "react-native-gesture-handler";
import { Filme } from "../../model/Filme";
import { Loading } from "../../components";

const Listar = () => {
    const [loading, setLoading] = useState(true);
    const [resenhas, setResenhas] = useState<Resenha[]>([]);

    const refResenha = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Resenha");

    const [filmes, setFilmes] = useState<Filme[]>([]);
    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    useEffect(() => {
        refResenha.onSnapshot((querySnapshot) => {
            const resenhas: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                resenhas.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setResenhas(resenhas);
            setLoading(false);
        });

        refFilme.onSnapshot((querySnapshot) => {
            const filmes: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                filmes.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setFilmes(filmes);
        });
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <ScrollView endFillColor="#FED2E5" contentContainerStyle={style.scrollContainer}>
            {resenhas.map((item, i) => (
                <View key={i} style={style.item}>
                    <Text style={style.titulo}>Filme: {filmes.find((f) => f.id === item.idFilme)?.titulo || ""}</Text>
                    <Text style={style.titulo}>Título: {item.titulo}</Text>
                    <Text style={style.titulo}>Texto: {item.texto}</Text>
                    <Text style={style.titulo}>Estrelas: {item.estrelas}</Text>
                </View>
            ))}
        </ScrollView>
    );
};
export default Listar;
