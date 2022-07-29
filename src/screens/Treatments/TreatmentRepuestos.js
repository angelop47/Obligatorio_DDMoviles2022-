import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatments = ({ navigation, route }) => {
  const [Treatments, setTreatmentes] = useState([]);

  const ID = route.params.id;


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM TratamientosRepuestos where Id_Tratamiento = ?`, [ID], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTreatmentes(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No se han utilizado repuestos",
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

      <View key={item.Id_Tratamiento} style={styles.listItemView}>
        <MyText text="id del Tratamiento" style={styles.textNegrita} />
        <MyText text={item.Id_Tratamiento} style={styles.text} />

        <MyText text="Id Repuesto" style={styles.textNegrita} />
        <MyText text={item.repuesto_id} style={styles.text} />

        <MyText text="Cantidad" style={styles.textNegrita} />
        <MyText text={item.Cantidad} style={styles.text} />

        {/* <MySingleButton style={styles.button}
          title="Modificar Cantidad"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("Treatment", { id: item.Id_Tratamiento })}
        /> */}
        <MySingleButton style={styles.button}
          title="Eliminar del Tratamiento"
          btnColor="#8B0000"
          customPress={() => navigation.navigate("Treatment", { id: item.Id_Tratamiento })}
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
              data={Treatments}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
            <MySingleButton style={styles.button}
              title="Agregar Repuesto al Tratamiento"
              btnColor="#006400"
              customPress={() => navigation.navigate("ViewAllRepuestos")}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={styles.keyboardView}>

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAllTreatments;

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
