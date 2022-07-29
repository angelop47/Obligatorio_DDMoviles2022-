import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatments = ({ navigation }) => {
  const [Treatments, setTreatmentes] = useState([]);

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var setCurrentDate = date + '/' + month + '/' + year


  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Tratamientos WHERE FechaFin < ?`,
        [setCurrentDate], (tx, results) => {
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

        <MyText text="Fecha inicio" style={styles.textNegrita} />
        <MyText text={item.FechaInicio} style={styles.text} />

        <MyText text="Fecha finalizacion" style={styles.textNegrita} />
        <MyText text={item.FechaFin} style={styles.text} />

        <MyText text="Costo" style={styles.textNegrita} />
        <MyText text={item.Costo} style={styles.text} />

        <MySingleButton style={styles.button}
          title="Ver Tratamiento"
          btnColor="#FF8C00"
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
          </View>
        </View>
        <KeyboardAvoidingView style={styles.keyboardView}>

          <MySingleButton style={styles.button}
            title="Ingresar Tratamiento"
            btnColor="#006400"
            customPress={() => navigation.navigate("RegisterTreatment")}
          />

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
