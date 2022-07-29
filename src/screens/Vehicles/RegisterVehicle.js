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

const RegisterVehicle = ({ navigation }) => {
  const [marca, setMarca] = useState('');
  const [matricula, setMatricula] = useState('');
  const [color, setColor] = useState('');
  const [serial, setSerial] = useState('');

  const clearData = () => {
    setMarca("");
    setMatricula("");
    setColor("");
    setSerial("");
  };

  const registerVehicle = () => {
    console.log("states", marca, matricula, color, serial);
    // validaciones estados
    debugger;
    if (!marca.trim()) {
      Alert.alert("Ingrese marca del vehiculo");
      return;
    }

    if (!matricula.trim()) {
      Alert.alert("Ingrese la matricula");
      return;
    }

    if (!color.trim()) {
      Alert.alert("Ingrese el color");
      return;
    }

    if (!serial.trim()) {
      Alert.alert("Ingrese el serial del vehiculo");
      return;
    }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO vehicles (marca_vehicle, matricula, color, serial) VALUES (?, ?, ?, ?)`,
        [marca, matricula, color, serial],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Vehiculo registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar vehiculo");
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
                placeholder="Marca del Vehiculo"
                onChangeText={setMarca}
                style={styles.nameInput}
                value={marca}
              />
              <MyInputText
                placeholder="Matricula"
                minLength={8}
                maxLength={16}
                onChangeText={setMatricula}
                style={styles.nameInput}
                value={matricula}
              />
              <MyInputText
                placeholder="Color"
                onChangeText={setColor}
                style={styles.emailInput}
                value={color}
              />
              <MyInputText
                placeholder="Serial"
                onChangeText={setSerial}
                style={styles.emailInput}
                value={serial}
              />
              <MySingleButton
                title="Guardar Vehiculo"
                customPress={registerVehicle}
                btnColor="#006400"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterVehicle;

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
