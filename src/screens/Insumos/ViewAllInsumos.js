import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView,ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllInsumos = ({ navigation }) => {
  const [insumos, setInsumos] = useState([]);



  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Insumos`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setInsumos(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Insumos!!!",
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

      <View key={item.insumo_id} style={styles.listItemView}>
        <MyText text="Nombre del insumo" style={styles.textNegrita} />
        <MyText text={item.nombre_insumo} style={styles.text} />


        <MySingleButton style={styles.button}
          title="Ver Insumo"
          btnColor="#FF8C00"
          customPress={() => navigation.navigate("Insumo", { id: item.insumo_id })}
        />
        <MySingleButton style={styles.button}
          title="Agregar al tratamiento"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("InsTreatment", { id: item.insumo_id, name: item.nombre_insumo })}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <View>
          <View>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={insumos}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={styles.keyboardView}>
          <MySingleButton style={styles.button}
            title="Ingresar Insumo"
            btnColor="#006400"
            customPress={() => navigation.navigate("RegisterInsumo")}
          />
        </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default ViewAllInsumos;

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
