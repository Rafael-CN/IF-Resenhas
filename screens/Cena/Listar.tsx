import { View, Text, ActivityIndicator, Image, ImageStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../js/firebase";
import { Cena } from "../../model/Cena";
import style from "../../js/style";
import { ScrollView } from "react-native-gesture-handler";
import { Filme } from "../../model/Filme";
import { Loading } from "../../components";

const Listar = () => {
    const [loading, setLoading] = useState(true);
    const [cenas, setCenas] = useState<Cena[]>([]);

    const refCena = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cena");

    const [filmes, setFilmes] = useState<Filme[]>([]);
    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    useEffect(() => {
        refCena.onSnapshot((querySnapshot) => {
            const cenas: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                cenas.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setCenas(cenas);
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
            {cenas.map((item, i) => (
                <View key={i} style={style.item}>
                    <Text style={style.titulo}>Filme: {filmes.find((f) => f.id === item.idFilme)?.titulo || ""}</Text>
                    <Text style={style.titulo}>Titulo: {item.titulo}</Text>
                    <Text style={style.titulo}>Descrição: {item.descricao}</Text>
                    <Text style={style.titulo}>Observação: {item.observacao}</Text>
                    <Text style={style.titulo}>Estrelas: {item.estrelas}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem as ImageStyle} />
                </View>
            ))}
        </ScrollView>
    );
};
export default Listar;
