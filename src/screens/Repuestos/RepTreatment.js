import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";
import MyInputText from "../../components/MyInputText";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatments = ({ navigation,route }) => {
  const [Treatments, setTreatmentes] = useState([]);
  const [Cantidad, setCantidad] = useState([]);

  const ID = route.params.id;
  const NAME = route.params.name;
  const NAMEID = 'ID: ' + ID + '   Name: ' + NAME


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Tratamientos`, [], (tx, results) => {
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
            "No hay Tratamientos!!!",
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

        <MyText text="Titulo" style={styles.textNegrita} />
        <MyText text={item.Titulo} style={styles.text} />

        <MyText text="Matricula" style={styles.textNegrita} />
        <MyText text={item.matricula} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Agregar Al Tratamiento"
          btnColor="#006400"
          customPress={() => navigation.navigate("RepTreatmentFinal", {idTreatment: item.Id_Tratamiento, idRepuesto: ID, cantidad: Cantidad})}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <MyText text={NAMEID} style={styles.textNegrita}/>
      <MyInputText
                placeholder="Cantidad"
                onChangeText={(text) => setCantidad(text)}
              />
        <View>
          <View>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={Treatments}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
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
