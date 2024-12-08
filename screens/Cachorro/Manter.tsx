import { View, Alert, Text, TextInput, TouchableOpacity, Pressable, Image, ActivityIndicator } from "react-native";
import { auth, firestore, storage } from "../../js/firebase";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes } from "firebase/storage";
import { Cachorro } from "../../model/Cachorro";
import style from "../../js/style";

const Manter = () => {
    const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});
    const [loading, setLoading] = useState(true);
    const [cachorro, setCachorro] = useState<Cachorro[]>([]); // Array em branco

    const [imagePath, setImagePath] = useState("https://cdn-icons-png.flaticon.com/512/3318/3318274.png");

    const refCachorro = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Cachorro");

    const Salvar = () => {
        const cachorro = new Cachorro(formCachorro);
        if (!cachorro.id) {
            const refIdCachorro = refCachorro.doc();
            cachorro.id = refIdCachorro.id;

            refIdCachorro
                .set(cachorro.toFirestore())
                .then(() => {
                    alert("Cachorro adicionado!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        } else {
            const refIdCachorro = refCachorro.doc(cachorro.id);
            refIdCachorro
                .update(cachorro.toFirestore())
                .then(() => {
                    alert("Cachorro editado!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        }
    };

    const Limpar = () => {
        setFormCachorro({});
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

        setFormCachorro({ ...formCachorro, urlfoto: urlDownload });
    };

    //FLATLIST
    useEffect(() => {
        const subscriber = refCachorro.onSnapshot((querySnapshot) => {
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
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator size={60} color="#0782F9" />;
    }

    // EXCLUI E EDITAR
    const excluir = async (item: Cachorro) => {
        Alert.alert("Excluir " + item.nome + "?", "Cachorro não poderá ser recuperado!", [
            {
                text: "Cancelar",
            },
            {
                text: "Excluir",
                onPress: async () => {
                    const resultado = await refCachorro
                        .doc(item.id)
                        .delete()
                        .then(() => {
                            alert("Cachorro excluído!");
                            Limpar();
                        });
                },
            },
        ]);
    };

    const editar = async (item: Cachorro) => {
        const resultado = firestore
            .collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Cachorro")
            .doc(item.id)
            .onSnapshot((documentSnapshot) => {
                const cachorro = new Cachorro(documentSnapshot.data());
                setFormCachorro(cachorro);
                setImagePath(cachorro.urlfoto);
            });
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={style.inputContainer}>
                <Pressable onPress={() => selecionaFoto()}>
                    <View style={style.imagemView}>
                        <Image source={{ uri: imagePath }} style={style.imagem} />
                    </View>
                </Pressable>

                <TextInput
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={(texto) =>
                        setFormCachorro({
                            ...formCachorro,
                            nome: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Raca"
                    value={formCachorro.raca}
                    onChangeText={(texto) =>
                        setFormCachorro({
                            ...formCachorro,
                            raca: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Pelo"
                    value={formCachorro.pelo}
                    onChangeText={(texto) =>
                        setFormCachorro({
                            ...formCachorro,
                            pelo: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Sexo"
                    value={formCachorro.sexo}
                    onChangeText={(texto) =>
                        setFormCachorro({
                            ...formCachorro,
                            sexo: texto,
                        })
                    }
                    style={style.input}
                />
                <TextInput
                    placeholder="Data Nascimento"
                    value={formCachorro.datanasc}
                    onChangeText={(texto) =>
                        setFormCachorro({
                            ...formCachorro,
                            datanasc: texto,
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

            {cachorro.map((item, i) => (
                <TouchableOpacity key={i} style={style.item} onPress={() => editar(item)} onLongPress={() => excluir(item)}>
                    <Text style={style.titulo}>Nome: {item.nome}</Text>
                    <Text style={style.titulo}>Raça: {item.raca}</Text>
                    <Text style={style.titulo}>Sexo: {item.sexo}</Text>
                    <Text style={style.titulo}>Nasc: {item.datanasc}</Text>
                    <Image source={{ uri: item.urlfoto }} style={style.imagem} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Manter;
