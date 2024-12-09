import { createDrawerNavigator } from "@react-navigation/drawer";
import Resenha from "./Resenha";
import Filme from "./Filme";
import Home from "./Home";
import * as React from "react";
import Cena from "./Cena";

const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <Drawer.Navigator initialRouteName="Página Inicial">
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
