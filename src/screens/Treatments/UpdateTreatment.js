import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateTreatment = ({ navigation, route }) => {
  const [nombre, setNombre] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [Costo, setCosto] = useState("");


  const ID = route.params.id;
  const TITULO = route.params.name;
  const TITULOID = 'ID: ' + ID + '   name: ' + TITULO;


  const cargarValores = () => {
    console.log("searchVehicle");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Tratamientos WHERE Id_Tratamiento = ?",
        [ID],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).Titulo);
            setFechaFin(results.rows.item(0).FechaFin);
            setCosto(results.rows.item(0).Costo);          
          } else {
            Alert.alert("Tratamiento no encontrado");
          }
        }
      );
    });
  };

  const UpdateTreatment = () => {
    console.log("updateTreatment");

    if (!nombre.trim()) {
      Alert.alert("El nombre del tratamiento");
      return;
    }

    if (!fechaFin.trim()) {
      Alert.alert("La fecha de finalizacion no puede estar vacio");
      return;
    }

    if (!Costo.trim()) {
      Alert.alert("es costo del tratamiento no puede estar vacio");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Tratamientos SET Titulo = ?, FechaFin = ?, Costo = ? WHERE Id_Tratamiento = ?",
        [nombre, fechaFin, Costo, ID],
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardView}
            >
              <MyText text={TITULOID} style={styles.textNegrita} />
              <MySingleButton title="Cargar Valores" customPress={cargarValores}
                btnColor="black"

              />
              <MyInputText
                placeholder="Nombre del tratamiento"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />
              <MyInputText
                placeholder="Fecha de fin"
                onChangeText={setFechaFin}
                style={styles.nameInput}
                value={fechaFin}
              />
              <MyInputText
                placeholder="Costo del Tratamiento"
                onChangeText={setCosto}
                style={styles.nameInput}
                value={Costo}
              />
              <MySingleButton title="Actualizar" customPress={UpdateTreatment}
                btnColor="#FF8C00"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateTreatment;

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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  textNegrita: {
    fontWeight: "bold",
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
