import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const Repuesto = ({ navigation, route }) => {
  const [Repuestos, setRepuestos] = useState([]);



  const ID = route.params.id;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM repuestos Where repuesto_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado        
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setRepuestos(temp);
        });
    });
  }, []);

  const listItemView = (item) => {
    return (

      <View key={item.repuesto_id} style={styles.listItemView}>
        <MyText text="id del Repuesto" style={styles.textNegrita} />
        <MyText text={item.repuesto_id} style={styles.text} />


        <MyText text="Nombre del Repuesto" style={styles.textNegrita} />
        <MyText text={item.nombre_rep} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Eliminar Repuesto"
          btnColor="#8B0000"
          customPress={() => navigation.navigate("DeleteRepuesto", {id: item.repuesto_id, name: item.nombre_rep})}
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
            data={Repuestos}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Repuesto;

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
