import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, View, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";


import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const Treatment = ({ navigation, route }) => {
  const [treatment, setTreatment] = useState([]);
  const [treatmentRep, setTreatmentRep] = useState([]);


  const ID = route.params.id;
  const fechaFin = new Date().getDate();


  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var setCurrentDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec


  // ejecutar cuando la vista se cree
  useEffect(() => {

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Tratamientos Where Id_Tratamiento = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado        
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTreatment(temp);
        });
    });
  }, []);

  const finalizarTrat = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Tratamientos SET FechaFin = ? WHERE Id_Tratamiento = ?",
        [setCurrentDate, ID],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento actualizado");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("error");
          }
        }
      );
    });
  }






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
          title="Ver Repuestos Utilizados"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("TreatmentRepuestos", { id: item.Id_Tratamiento })}
        />
        <MySingleButton style={styles.button}
          title="Ver insumos Utilizados"
          btnColor="#DEB887"
          customPress={() => navigation.navigate("TreatmentInsumos", { id: item.vehicle_id })}
        />
        <MySingleButton style={styles.button}
          title="Modificar Tratamiento"
          btnColor="#FF8C00"
          customPress={() => navigation.navigate("UpdateTreatment", { id: item.Id_Tratamiento, name: item.Titulo })}
        />
        <MySingleButton style={styles.button}
          title="Finalizar tratamiento"
          btnColor="#006400"
          customPress={finalizarTrat}
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
              data={treatment}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Treatment;

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
