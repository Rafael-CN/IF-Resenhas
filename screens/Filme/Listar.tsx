import { View, Text, ActivityIndicator, Image, ImageStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../js/firebase";
import { Filme } from "../../model/Filme";
import style from "../../js/style";
import { ScrollView } from "react-native-gesture-handler";

const Listar = () => {
    const [loading, setLoading] = useState(true);
    const [filmes, setFilmes] = useState<Filme[]>([]);

    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    useEffect(() => {
        refFilme.onSnapshot((querySnapshot) => {
            const filmes: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                filmes.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setFilmes(filmes);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <ActivityIndicator size={60} color="#0782F9" />;
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {filmes.map((item, i) => (
                <View key={i} style={style.item}>
                    <Text style={style.titulo}>Título: {item.titulo}</Text>
                    <Text style={style.titulo}>Gênero: {item.genero}</Text>
                    <Text style={style.titulo}>Sinopse: {item.sinopse}</Text>
                    <Text style={style.titulo}>Data de lançamento: {item.datalancamento}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem as ImageStyle} />
                </View>
            ))}
        </ScrollView>
    );
};
export default Listar;
