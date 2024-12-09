import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, StyleSheet } from "react-native";
import Resenha from "./Resenha";
import Filme from "./Filme";
import Home from "./Home";
import Cena from "./Cena";
import React from "react";

const Drawer = createDrawerNavigator();

const CDrawerItem = (props: { name: string; icon: string; navigation: any; state: any }) => <DrawerItem focused={props.state.routeNames[props.state.index] === props.name} label={props.name} icon={(iconProps) => <Icon name={props.icon} {...iconProps} />} onPress={() => props.navigation.navigate(props.name)} />;
function CDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props}>
            <CDrawerItem name="Página Inicial" icon="home" {...props} />

            <Text style={styles.sectionTitle}>Filmes</Text>
            <CDrawerItem name="Adicionar filmes" icon="filmstrip-box" {...props} />
            <CDrawerItem name="Listar filmes" icon="filmstrip-box-multiple" {...props} />

            <Text style={styles.sectionTitle}>Resenhas</Text>
            <CDrawerItem name="Adicionar resenhas" icon="text-box" {...props} />
            <CDrawerItem name="Listar resenhas" icon="text-box-multiple" {...props} />

            <Text style={styles.sectionTitle}>Cenas</Text>
            <CDrawerItem name="Adicionar cenas" icon="video-plus" {...props} />
            <CDrawerItem name="Listar cenas" icon="video" {...props} />
        </DrawerContentScrollView>
    );
}

export default function Menu() {
    return (
        <Drawer.Navigator
            initialRouteName="Página Inicial"
            drawerContent={(props) => CDrawerContent(props)}
            screenOptions={{
                headerShown: true,
                drawerStyle: {
                    backgroundColor: "#f9f9f9",
                    width: 250,
                },
                drawerLabelStyle: {
                    fontSize: 16,
                },
            }}
        >
            <Drawer.Screen name="Página Inicial" component={Home} />
            <Drawer.Screen name="Adicionar filmes" component={Filme.Manter} />
            <Drawer.Screen name="Listar filmes" component={Filme.Listar} />
            <Drawer.Screen name="Adicionar resenhas" component={Resenha.Manter} />
            <Drawer.Screen name="Listar resenhas" component={Resenha.Listar} />
            <Drawer.Screen name="Adicionar cenas" component={Cena.Manter} />
            <Drawer.Screen name="Listar cenas" component={Cena.Listar} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerTitle: {
        backgroundColor: "#ddd",
        marginVertical: 5,
    },
    drawerTitleText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5,
    },
});
