import { View, Alert, Text, TextInput, TouchableOpacity, Pressable, Image, ActivityIndicator, ImageStyle } from "react-native";
import { auth, firestore, storage } from "../../js/firebase";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage";
import { Filme } from "../../model/Filme";
import style from "../../js/style";

const Manter = () => {
    const [formFilme, setFormFilme] = useState<Partial<Filme>>({});
    const [loading, setLoading] = useState(true);
    const [filmes, setFilmes] = useState<Filme[]>([]);

    const [imagePath, setImagePath] = useState("https://cdn-icons-png.flaticon.com/512/3318/3318274.png");

    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    const Salvar = () => {
        const filme = new Filme(formFilme);
        if (!filme.id) {
            const refIdFilme = refFilme.doc();
            filme.id = refIdFilme.id;

            refIdFilme
                .set(filme.toFirestore())
                .then(() => {
                    alert("Filme adicionado!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        } else {
            const refIdFilme = refFilme.doc(filme.id);
            refIdFilme
                .update(filme.toFirestore())
                .then(() => {
                    alert("Filme editado!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        }
    };

    const Limpar = () => {
        setFormFilme({});
        setImagePath("https://cdn-icons-png.flaticon.com/512/3318/3318274.png");
    };

    // FUNÇÕES FOTO
    const selecionaFoto = () => {
        Alert.alert("Selecionar Foto", "Escolha uma alternativa:", [
            {
                text: "Câmera",
                onPress: () => abrirCamera(),
            },
            {
                text: "Abrir Galeria",
                onPress: () => abrirGaleria(),
            },
        ]);
    };

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou o acesso à câmera");
            return;
        }
        const foto = await ImagePicker.launchCameraAsync();
        enviaFoto(foto);
    };

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissao.granted === false) {
            alert("Você recusou o acesso à câmera");
            return;
        }
        const foto = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        enviaFoto(foto);
    };

    const enviaFoto = async (foto: ImagePicker.ImagePickerResult) => {
        setImagePath(foto.assets[0].uri);
        const filename = foto.assets[0].fileName;
        const ref = storage.ref(`imagens/${filename}`);

        const img = await fetch(foto.assets[0].uri);
        const bytes = await img.blob();
        const fbResult = await uploadBytes(ref, bytes);

        const urlDownload = await storage.ref(fbResult.metadata.fullPath).getDownloadURL();

        setFormFilme({ ...formFilme, urlfoto: urlDownload });
    };

    //FLATLIST
    useEffect(() => {
        const subscriber = refFilme.onSnapshot((querySnapshot) => {
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
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator size={60} color="#0782F9" />;
    }

    // EXCLUI E EDITAR
    const excluir = async (item: Filme) => {
        Alert.alert("Excluir " + item.titulo + "?", "O filme não poderá ser recuperado!", [
            {
                text: "Cancelar",
            },
            {
                text: "Excluir",
                onPress: async () => {
                    const resultado = await refFilme
                        .doc(item.id)
                        .delete()
                        .then(() => {
                            alert("Filme excluído!");
                            Limpar();
                        });
                },
            },
        ]);
    };

    const editar = async (item: Filme) => {
        firestore
            .collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Filme")
            .doc(item.id)
            .onSnapshot((documentSnapshot) => {
                const filme = new Filme(documentSnapshot.data());
                setFormFilme(filme);
                setImagePath(filme.urlfoto);
            });
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={style.inputContainer}>
                <Pressable onPress={() => selecionaFoto()}>
                    <View style={style.imagemView}>
                        <Image source={{ uri: imagePath }} style={style.imagem as ImageStyle} />
                    </View>
                </Pressable>

                <TextInput
                    placeholder="Título"
                    value={formFilme.titulo}
                    onChangeText={(texto) =>
                        setFormFilme({
                            ...formFilme,
                            titulo: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Gênero"
                    value={formFilme.genero}
                    onChangeText={(texto) =>
                        setFormFilme({
                            ...formFilme,
                            genero: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Sinopse"
                    value={formFilme.sinopse}
                    onChangeText={(texto) =>
                        setFormFilme({
                            ...formFilme,
                            sinopse: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Data de lançamento"
                    value={formFilme.datalancamento}
                    onChangeText={(texto) =>
                        setFormFilme({
                            ...formFilme,
                            datalancamento: texto,
                        })
                    }
                    style={style.input}
                />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.buttonOutline} onPress={Limpar}>
                    <Text style={style.buttonOutlineText}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={Salvar}>
                    <Text style={style.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            {filmes.map((item, i) => (
                <TouchableOpacity key={i} style={style.item} onPress={() => editar(item)} onLongPress={() => excluir(item)}>
                    <Text style={style.titulo}>Título: {item.titulo}</Text>
                    <Text style={style.titulo}>Gênero: {item.genero}</Text>
                    <Text style={style.titulo}>Sinopse: {item.sinopse}</Text>
                    <Text style={style.titulo}>Data de lançamento: {item.datalancamento}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem as ImageStyle} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Manter;
