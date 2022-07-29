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

const RegisterTreatment = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [costo, setCosto] = useState('');

  const clearData = () => {
    setNombre("");
    setMatricula("");
    setFechaIni("");
    setFechaFin("");
    setCosto("");
  };


  const registerTreatment = () => {
    console.log("states", nombre, matricula, fechaIni, fechaFin, costo);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese nombre del tratamiento");
      return;
    }

    if (!matricula.trim()) {
      Alert.alert("Ingrese la matricula");
      return;
    }

    // if (!fechaIni.trim()) {
    //   Alert.alert("Ingrese la fecha de inicio");
    //   return;
    // }

    // if (!fechaFin.trim()) {
    //   Alert.alert("Ingrese la fecha de finalizacion");
    //   return;
    // }

    if (!costo.trim()) {
      Alert.alert("Ingrese el costo del tratamiento");
      return;
    }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Tratamientos (Titulo, matricula, FechaInicio, FechaFin, Costo) VALUES (?, ?, ?, ?, ?)`,
        [nombre, matricula, fechaIni, fechaFin, costo],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Tratamiento registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar tratamiento");
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
                placeholder="Nombre del tratamiento"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />
              <MyInputText
                placeholder="Matricula"
                onChangeText={setMatricula}
                style={styles.nameInput}
                value={matricula}
              />
              <MyInputText
                placeholder="Fecha Inicio"
                onChangeText={setFechaIni}
                style={styles.emailInput}
                value={fechaIni}
              />
              <MyInputText
                placeholder="Fecha de fin"
                onChangeText={setFechaFin}
                style={styles.emailInput}
                value={fechaFin}
              />
              <MyInputText
                placeholder="Costo del Tratamiento"
                onChangeText={setCosto}
                style={styles.emailInput}
                value={costo}
              />
              <MySingleButton
                title="Guardar Tratamiento"
                customPress={registerTreatment}
                btnColor="#006400"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterTreatment;

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
