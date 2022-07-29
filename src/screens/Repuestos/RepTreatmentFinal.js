import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RepTreatmentFinal = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);


  const idTreatment = route.params.idTreatment;
  const idRepuesto = route.params.idRepuesto;
  const cantidad = route.params.cantidad;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO TratamientosRepuestos (Id_Tratamiento, repuesto_id, Cantidad) VALUES (?,?,?)`,
        [idTreatment, idRepuesto, cantidad], (tx, results) => {
          console.log("results", results);
          // validar resultado
        });
    });
    alert('Repuesto asignado con exito')
    navigation.navigate("HomeScreen")
  }, []);

  const listItemView = (item) => {
    return (
      <View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default RepTreatmentFinal;

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
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 20,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  textNegrita: {
    fontWeight: "bold",
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    height: 90,
    justifyContent: "space-between",
  },
});
