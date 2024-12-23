import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Registro from "./screens/Registro";
import Menu from "./screens/Menu";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#8F6277" }, headerTintColor: "#FFF" }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
