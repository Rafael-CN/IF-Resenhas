import { View, Alert, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth, firestore } from "../../js/firebase";
import React, { useEffect, useState } from "react";
import Picker from "react-native-picker-select";
import { Resenha } from "../../model/Resenha";
import { Filme } from "../../model/Filme";
import style from "../../js/style";
import { Loading } from "../../components";

const Manter = () => {
    const [formResenha, setFormResenha] = useState<Partial<Resenha>>({});
    const [loading, setLoading] = useState(true);

    const [resenhas, setResenhas] = useState<Resenha[]>([]);
    const refResenha = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Resenha");

    const [filmes, setFilmes] = useState<Filme[]>([]);
    const refFilme = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Filme");

    const Verificar = () => {
        if (!formResenha.idFilme || formResenha.idFilme === "0") {
            alert("O filme é obrigatório para salvar a resenha.");
            return false;
        }

        if (!formResenha.titulo || formResenha.titulo.length === 0) {
            alert("O título é obrigatório para salvar a resenha.");
            return false;
        }

        if (!formResenha.texto || formResenha.texto.length === 0) {
            alert("O texto é obrigatório para salvar a resenha.");
            return false;
        }

        return true;
    };

    const Salvar = () => {
        if (!Verificar()) return;

        const resenha = new Resenha(formResenha);
        if (!resenha.id) {
            const refIdResenha = refResenha.doc();
            resenha.id = refIdResenha.id;

            refIdResenha
                .set(resenha.toFirestore())
                .then(() => {
                    alert("Resenha adicionada!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        } else {
            const refIdResenha = refResenha.doc(resenha.id);
            refIdResenha
                .update(resenha.toFirestore())
                .then(() => {
                    alert("Resenha editada!");
                    Limpar();
                })
                .catch((error) => alert(error.message));
        }
    };

    const Limpar = () => {
        setFormResenha({ idFilme: "0" });
    };

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
                filmes.push(documentSnapshot.data());
            });
            setFilmes(filmes);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    // EXCLUI E EDITAR
    const excluir = async (item: Resenha) => {
        Alert.alert("Excluir " + item.titulo + "?", "A resenha não poderá ser recuperada!", [
            {
                text: "Cancelar",
            },
            {
                text: "Excluir",
                onPress: async () => {
                    await refResenha
                        .doc(item.id)
                        .delete()
                        .then(() => {
                            alert("Resenha excluída!");
                            Limpar();
                        });
                },
            },
        ]);
    };

    const editar = async (item: Resenha) => {
        firestore
            .collection("Usuario")
            .doc(auth.currentUser?.uid)
            .collection("Resenha")
            .doc(item.id)
            .onSnapshot((documentSnapshot) => {
                const resenha = new Resenha(documentSnapshot.data());
                setFormResenha(resenha);
            });
    };

    return (
        <ScrollView endFillColor="#FED2E5" contentContainerStyle={style.scrollContainer}>
            <View style={[style.inputContainer, { marginTop: 50 }]}>
                <Picker
                    placeholder={{
                        label: "Selecione um filme...",
                        value: 0,
                    }}
                    style={{ viewContainer: [style.input, { padding: 0 }], placeholder: { color: "#444" } }}
                    onValueChange={(valor) => {
                        setFormResenha({
                            ...formResenha,
                            idFilme: valor,
                        });
                    }}
                    value={formResenha.idFilme}
                    items={filmes.map((filme) => ({
                        label: filme.titulo,
                        value: filme.id,
                    }))}
                />
                <View style={style.distancia}>
                    <TextInput
                        placeholder="Título *"
                        value={formResenha.titulo}
                        onChangeText={(texto) =>
                            setFormResenha({
                                ...formResenha,
                                titulo: texto,
                            })
                        }
                        style={style.input}
                    />
                </View>
                <View style={style.distancia}>
                    <TextInput
                        placeholder="Texto *"
                        value={formResenha.texto}
                        onChangeText={(texto) =>
                            setFormResenha({
                                ...formResenha,
                                texto: texto,
                            })
                        }
                        style={style.input}
                    />
                </View>
                <View style={style.distancia}>
                    <TextInput
                        placeholder="Estrelas"
                        keyboardType="numeric"
                        value={(formResenha.estrelas || 0).toString()}
                        onChangeText={(texto) =>
                            setFormResenha({
                                ...formResenha,
                                estrelas: parseInt(texto),
                            })
                        }
                        style={style.input}
                    />
                </View>
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.buttonOutline} onPress={Limpar}>
                    <Text style={style.buttonOutlineText}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonSave} onPress={Salvar}>
                    <Text style={style.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={style.textNews}>Clique para editar ou</Text>
                <Text style={[style.textNews, { marginBottom: 40 }]}>pressione para excluir</Text>
            </View>
            {resenhas.map((item, i) => (
                <TouchableOpacity
                    key={i}
                    style={style.item}
                    onPress={() => {
                        editar(item);
                    }}
                    onLongPress={() => excluir(item)}
                >
                    <Text style={style.titulo}>Filme: {filmes.find((f) => f.id === item.idFilme)?.titulo || ""}</Text>
                    <Text style={style.titulo}>Título: {item.titulo}</Text>
                    <Text style={style.titulo}>Texto: {item.texto}</Text>
                    <Text style={style.titulo}>Estrelas: {item.estrelas || 0}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Manter;
