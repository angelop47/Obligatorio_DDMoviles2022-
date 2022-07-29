import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const Insumo = ({ navigation, route }) => {
  const [insumo, setInsumos] = useState([]);



  const ID = route.params.id;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Insumos Where insumo_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado        
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setInsumos(temp);
        });
    });
  }, []);

  const listItemView = (item) => {
    return (

      <View key={item.insumo_id} style={styles.listItemView}>
        <MyText text="Id de insumo" style={styles.textNegrita} />
        <MyText text={item.insumo_id} style={styles.text} />

        <MyText text="Nombre de insumo" style={styles.textNegrita} />
        <MyText text={item.nombre_insumo} style={styles.text} />

      

        <MySingleButton style={styles.button}
          title="Agregar al tratamiento"
          btnColor="#DEB887"
          // customPress={() => navigation.navigate("ViewAllVehicles", { id: item.user_id, name: item.user_name })}
        />
        <MySingleButton style={styles.button}
          title="Eliminar Insumo"
          btnColor="#8B0000"
          customPress={() => navigation.navigate("DeleteInsumo", { id: item.insumo_id, name: item.nombre_insumo })}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={insumo}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Insumo;

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
