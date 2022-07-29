import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllVehicles = ({ navigation }) => {
  const [Vehicles, setVehicles] = useState([]);

  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM vehicles`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setVehicles(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Vehiculos!!!",
            [
              {
                text: "Ok",
                // onPress: () => navigation.navigate("HomeScreen"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => {
    return (

      <View key={item.id} style={styles.listItemView}>
        <MyText text="Marca del Vehiculo" style={styles.textNegrita} />
        <MyText text={item.marca_vehicle} style={styles.text} />

        <MyText text="Matricula" style={styles.textNegrita} />
        <MyText text={item.matricula} style={styles.text} />

        <MyText text="Color" style={styles.textNegrita} />
        <MyText text={item.color} style={styles.text} />

        <MyText text="Serial" style={styles.textNegrita} />
        <MyText text={item.serial} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Ver Vehiculo"
          btnColor="#FF8C00"
          customPress={() => navigation.navigate("Vehicle", { id: item.vehicle_id })}
        />
        <MySingleButton style={styles.button}
          title="Asociar al Usuario"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("AssociateVehicle", { id: item.vehicle_id, marca: item.marca_vehicle, matricula: item.matricula })}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={Vehicles}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={styles.keyboardView}>

          <MySingleButton style={styles.button}
            title="Ingresar Vehiculo"
            btnColor="#006400"
            customPress={() => navigation.navigate("RegisterVehicle")}
          />
          
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAllVehicles;

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
