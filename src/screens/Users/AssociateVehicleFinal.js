import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const AssociateVehicleFinal = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);


  const IDVEHICULO = route.params.idVehiculo;
  const IDUSUARIO = route.params.idUsuario;
  const total = IDVEHICULO + '  ' + IDUSUARIO;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`UPDATE users SET vehicle_id = ? WHERE user_id = ?`,
        [IDVEHICULO,IDUSUARIO], (tx, results) => {
        console.log("results", results);
        // validar resultado
      });
    });
    alert('vehiculo asignado con exito')
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
        <MyText text={total} style={styles.textNegrita} />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default AssociateVehicleFinal;

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
