import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../js/firebase";
import { Cachorro } from "../../model/Cachorro";
import style from "../../js/style";
import { ScrollView } from "react-native-gesture-handler";

const Listar = () => {
    const [loading, setLoading] = useState(true);
    const [cachorro, setCachorro] = useState<Cachorro[]>([]); // Array em branco

    const refCachorro = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cachorro");

    useEffect(() => {
        refCachorro.onSnapshot((querySnapshot) => {
            const cachorro: any[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                cachorro.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setCachorro(cachorro);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <ActivityIndicator size={60} color="#0782F9" />;
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {cachorro.map((item, i) => (
                <View key={i} style={style.item}>
                    <Text style={style.titulo}>Nome: {item.nome}</Text>
                    <Text style={style.titulo}>Raça: {item.raca}</Text>
                    <Text style={style.titulo}>Sexo: {item.sexo}</Text>
                    <Text style={style.titulo}>Nasc: {item.datanasc}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem} />
                </View>
            ))}
        </ScrollView>
    );
};
export default Listar;
