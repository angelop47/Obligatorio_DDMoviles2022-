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

const RegisterInsumo = ({ navigation }) => {
  const [nombre, setNombre] = useState('');


  const clearData = () => {
    setNombre("");

  };

  const RegisterInsumo = () => {
    console.log("states", nombre);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese el nombre del Insumo");
      return;
    }


    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Insumos (nombre_insumo) VALUES (?)`,
        [nombre],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Insumo registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
            );
          }
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
                placeholder="Nombre de insumo"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />

              <MySingleButton
                title="Guardar Insumo"
                customPress={RegisterInsumo}
                btnColor="#006400"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterInsumo;

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
