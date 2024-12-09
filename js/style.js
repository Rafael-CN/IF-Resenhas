import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Login
  containerSuperiorAvatar: {
    backgroundColor: "rgba(173, 126, 148, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  avatarLogo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  titleApp: {
    fontSize: 28,
    fontFamily: "serif",
    color: "#fff",
    fontWeight: "bold",
  },

  inputContainer: {
    marginTop: 250,
    width: "80%",
  },
  input: {
    backgroundColor: "rgba(173, 126, 148, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#CD9CB2",
    color: "#fff",
  },
  inputPlaceholder: {
    color: "#CD9CB2",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#AD7E94",
  },

  buttonContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  button: {
    backgroundColor: "#8F6277",
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "Bold",
    fontSize: 16,
  },
  registerText: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 14,
    color: "#AD7E94",
  },
  registerLink: {
    color: "#8F6277",
    fontWeight: "bold",
  },
  distancia: {
    margimTop: 30,
  },
  logoutIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  // prof
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FED2E5",
  },

  //FLATLIST
  item: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFE1EE",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: "90%",
    // alignSelf: "center",
    borderColor: "#CD9CB2D9",
    borderWidth: 2,
  },
  titulo: {
    fontSize: 14,
    color: "#8F6277",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#AD7E944D",
    marginTop: 15,
  },
  imagemView: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
});
