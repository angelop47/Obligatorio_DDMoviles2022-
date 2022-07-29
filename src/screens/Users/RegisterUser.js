import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const clearData = () => {
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const registerUser = () => {
    console.log("states", userName, password, email);
    // validaciones estados
    debugger;
    if (!userName.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Ingrese su contraseña");
      return;
    }

    if (!email.trim() && email.indexOf("@") == -1) {
      Alert.alert("Ingrese su email");
      return;
    }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (user_name, password, email) VALUES (?, ?, ?)`,
        [userName, password, email],
        (tx, results) => {
          console.log("results", results);
            Alert.alert(
              "Exito",
              "Usuario registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
            );
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre de Usuario"
                onChangeText={setUserName}
                style={styles.nameInput}
                value={userName}
              />

              <MyInputText
                placeholder="Contraseña"
                minLength={8}
                maxLength={16}
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.passwordInput}
                value={password}
              />

              <MyInputText
                placeholder="Correo Electronico"
                keyboardType="email-address"
                onChangeText={setEmail}
                style={styles.emailInput}
                value={email}
              />

              <MySingleButton
                title="Guardar Usuario"
                customPress={registerUser}
                btnColor="#006400"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  passwordInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  emailInput: {
    padding: 15,
    textAlignVertical: "top",
  },
});
