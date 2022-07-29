import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const Vehicle = ({ navigation, route }) => {
  const [vehicles, setVehicles] = useState([]);



  const ID = route.params.id;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM vehicles Where vehicle_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado        
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setVehicles(temp);
        });
    });
  }, []);

  const listItemView = (item) => {
    return (

      <View key={item.vehicle_id} style={styles.listItemView}>
        <MyText text="Id del Vehiculo" style={styles.textNegrita} />
        <MyText text={item.vehicle_id} style={styles.text} />

        <MyText text="Marca del Vehiculo" style={styles.textNegrita} />
        <MyText text={item.marca_vehicle} style={styles.text} />

        <MyText text="Matricula" style={styles.textNegrita} />
        <MyText text={item.matricula} style={styles.text}/>

        <MyText text="Color" style={styles.textNegrita} />
        <MyText text={item.color} style={styles.text}/>

        <MyText text="Serial" style={styles.textNegrita} />
        <MyText text={item.serial} style={styles.text}/>

        <MySingleButton style={styles.button}
          title="Modificar Vehiculo"
          btnColor="#FF8C00"
          customPress={() => navigation.navigate("UpdateVehicle", {id: item.vehicle_id, marca: item.marca_vehicle})}
        />
        <MySingleButton style={styles.button}
          title="Eliminar Vehiculo"
          btnColor="#8B0000"
          customPress={() => navigation.navigate("DeleteVehicle", {id: item.vehicle_id, marca: item.marca_vehicle})}
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
            data={vehicles}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Vehicle;

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
