import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteVehicle = ({ navigation, route }) => {

  const ID = route.params.id;
  const MARCA = route.params.marca;
  const MARCAID = 'ID: ' + ID + '   Marca: ' + MARCA;

  const deleteVehicle = ({ navigation }) => {
    console.log("deleteVehicle");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM vehicles WHERE vehicle_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo eliminado");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("El Vehiculo no existe");
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
          <MyText text={MARCAID} style={styles.textNegrita}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
          
          <MySingleButton title="Borrar Vehiculo" customPress={deleteVehicle} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteVehicle;

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  textNegrita: {
    fontWeight: "bold",
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  }
});
