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

const RegisterRepuesto = ({ navigation }) => {
  const [nombre, setNombre] = useState('');


  const clearData = () => {
    setNombre("");
  };

  const RegisterRepuesto = () => {
    console.log("states", nombre);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese nombre del repuesto");
    
      return;
    }



    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Repuestos (nombre_rep) VALUES (?)`,
        [nombre],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          Alert.alert(
            "Exito",
            "Repuesto registrado!!!",
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
                placeholder="Nombre del Repuesto"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />
              <MySingleButton
                title="Guardar repuesto"
                btnColor="#006400"
                customPress={RegisterRepuesto}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterRepuesto;

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
