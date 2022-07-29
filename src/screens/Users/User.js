import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const User = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);



  const ID = route.params.id;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users Where user_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado        
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        });
    });
  }, []);

  const listItemView = (item) => {
    return (

      <View key={item.user_id} style={styles.listItemView}>
        <MyText text="Id de Usuario" style={styles.textNegrita} />
        <MyText text={item.user_id} style={styles.text} />

        <MyText text="Nombre de Usuario" style={styles.textNegrita} />
        <MyText text={item.user_name} style={styles.text} />

        <MyText text="Email" style={styles.textNegrita} />
        <MyText text={item.email} style={styles.text} />

        <MyText text="Password" style={styles.textNegrita} />
        <MyText text={item.password} style={styles.text} />

        <MyText text="ID Vehiculo Asociado" style={styles.textNegrita} />
        <MyText text={item.vehicle_id} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Asociar Vehiculo"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("ViewAllVehicles", { id: item.user_id, name: item.user_name })}
        />

        <MySingleButton style={styles.button}
          title="Modificar Usuario"
          btnColor="#FF8C00"
          customPress={() => navigation.navigate("UpdateUser", { id: item.user_id, name: item.user_name })}
        />
        <MySingleButton style={styles.button}
          title="Eliminar Usuario"
          btnColor="#8B0000"
          customPress={() => navigation.navigate("DeleteUser", { id: item.user_id, name: item.user_name })}
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
            data={users}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User;

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
