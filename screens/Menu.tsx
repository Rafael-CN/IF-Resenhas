import { createDrawerNavigator } from "@react-navigation/drawer";
import Cachorro from "./Cachorro";
import Filme from "./Filme";
import Home from "./Home";
import * as React from "react";

const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name="Página Inicial" component={Home} />
            <Drawer.Screen name="Manter cachorros" component={Cachorro.Manter} />
            <Drawer.Screen name="Listar cachorros" component={Cachorro.Listar} />
            <Drawer.Screen name="Manter filmes" component={Filme.Manter} />
        </Drawer.Navigator>
    );
}
