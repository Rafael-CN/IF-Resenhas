import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    containerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },

    buttonContainer: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },
    buttonOutline: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#0782F9",
        alignItems: "center",
        padding: 15,
        margin: 10,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 15,
    },

    //FLATLIST
    item: {
        width: "80%",
        backgroundColor: "white",
        borderColor: "#0782F9",
        borderWidth: 2,
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
    },
    titulo: {
        fontSize: 16,
        color: "#0782F9",
        fontWeight: "500",
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignSelf: "center",
        marginTop: 15,
    },
    imagemView: {
        alignContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
});
