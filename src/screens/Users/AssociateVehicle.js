import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const AssociateVehicle = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);


  const ID = route.params.id;
  const MARCA = route.params.marca;
  const MATRICULA = route.params.matricula;
  const MARCAID = 'ID: ' + ID + '   Marca: ' + MARCA + '    Matricula: ' + MATRICULA;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
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

      <View key={item.user_id} style={styles.listItemView}>
        <MyText text="Nombre de Usuario" style={styles.textNegrita} />
        <MyText text={item.user_name} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Asociar al Vehiculo"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("AssociateVehicleFinal", { idUsuario: item.user_id, idVehiculo: ID})}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <View>
          <View>
            <MyText text={MARCAID} style={styles.textNegrita} />
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={users}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default AssociateVehicle;

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
