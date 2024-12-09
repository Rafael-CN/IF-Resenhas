import { View, Alert, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable, Image, ImageStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth, firestore, storage } from "../../js/firebase";
import React, { useEffect, useState } from "react";
import Picker from "react-native-picker-select";
import { Filme } from "../../model/Filme";
import style from "../../js/style";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage";
import { Cena } from "../../model/Cena";

const Manter = () => {
    const [formCena, setFormCena] = useState<Partial<Cena>>({});
    const [loading, setLoading] = useState(true);

    const [cenas, setCenas] = useState<Cena[]>([]);
    const refCena = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cena");

    const [filmes, setFilmes] = useState<Filme[]>([]);
    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    const [imagePath, setImagePath] = useState("https://cdn-icons-png.flaticon.com/512/3318/3318274.png");

    const Salvar = () => {
        const cena = new Cena(formCena);
        if (!cena.id) {
            const refIdCena = refCena.doc();
            cena.id = refIdCena.id;

            refIdCena
                .set(cena.toFirestore())
                .then(() => {
                    alert("Cena adicionada!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        } else {
            const refIdCena = refCena.doc(cena.id);
            refIdCena
                .update(cena.toFirestore())
                .then(() => {
                    alert("Cena editada!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        }
    };

    const Limpar = () => {
        setFormCena({ idFilme: "0" });
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

        setFormCena({ ...formCena, urlfoto: urlDownload });
    };

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
                filmes.push(documentSnapshot.data());
            });
            setFilmes(filmes);
        });
    }, []);

    if (loading) {
        return <ActivityIndicator size={60} color="#0782F9" />;
    }

    const excluir = async (item: Cena) => {
        Alert.alert("Excluir " + item.titulo + "?", "A cena não poderá ser recuperada!", [
            {
                text: "Cancelar",
            },
            {
                text: "Excluir",
                onPress: async () => {
                    await refCena
                        .doc(item.id)
                        .delete()
                        .then(() => {
                            alert("Cena excluída!");
                            Limpar();
                        });
                },
            },
        ]);
    };

    const editar = async (item: Cena) => {
        firestore
            .collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Cena")
            .doc(item.id)
            .onSnapshot((documentSnapshot) => {
                const cena = new Cena(documentSnapshot.data());
                setFormCena(cena);
                setImagePath(cena.urlfoto);
            });
    };

    return (
        <ScrollView endFillColor="#FED2E5" contentContainerStyle={style.scrollContainer}>
            <View style={style.inputContainer}>
                <Pressable onPress={() => selecionaFoto()}>
                    <View style={style.imagemView}>
                        <Image source={{ uri: imagePath }} style={style.imagem as ImageStyle} />
                    </View>
                </Pressable>

                <Picker
                    placeholder={{ label: "Selecione um filme...", color: "#666", value: 0 }}
                    style={{ viewContainer: [style.input, { padding: 0 }] }}
                    onValueChange={(valor) => {
                        setFormCena({
                            ...formCena,
                            idFilme: valor,
                        });
                    }}
                    value={formCena.idFilme}
                    items={filmes.map((filme) => ({ label: filme.titulo, value: filme.id }))}
                />

                <TextInput
                    placeholder="Título"
                    value={formCena.titulo}
                    onChangeText={(texto) =>
                        setFormCena({
                            ...formCena,
                            titulo: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Descrição"
                    value={formCena.descricao}
                    onChangeText={(texto) =>
                        setFormCena({
                            ...formCena,
                            descricao: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Observação"
                    value={formCena.observacao}
                    onChangeText={(texto) =>
                        setFormCena({
                            ...formCena,
                            observacao: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Estrelas"
                    keyboardType="numeric"
                    value={(formCena.estrelas || 0).toString()}
                    onChangeText={(texto) =>
                        setFormCena({
                            ...formCena,
                            estrelas: parseInt(texto),
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

            {cenas.map((item, i) => (
                <TouchableOpacity
                    key={i}
                    style={style.item}
                    onPress={() => {
                        editar(item);
                    }}
                    onLongPress={() => excluir(item)}
                >
                    <Text style={style.titulo}>Filme: {filmes.find((f) => f.id === item.idFilme).titulo}</Text>
                    <Text style={style.titulo}>Título: {item.titulo}</Text>
                    <Text style={style.titulo}>Descrição: {item.descricao}</Text>
                    <Text style={style.titulo}>Observação: {item.observacao}</Text>
                    <Text style={style.titulo}>Estrelas: {item.estrelas}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem as ImageStyle} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Manter;
