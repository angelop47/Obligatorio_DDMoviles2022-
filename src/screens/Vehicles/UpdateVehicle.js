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

const UpdateVehicle = ({ navigation, route }) => {
  const [vehicleMarca, setMarca] = useState("");
  const [vehicleMatricula, setMatricula] = useState("");
  const [vehicleColor, setColor] = useState("");
  const [vehicleSerial, setSerial] = useState("");

  const ID = route.params.id;
  const MARCA = route.params.marca;
  const MARCAID = 'ID: ' + ID + '   Marca: ' + MARCA;


  const cargarValores = () => {
    console.log("searchVehicle");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM vehicles WHERE vehicle_id = ?",
        [ID],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMarca(results.rows.item(0).marca_vehicle);
            setMatricula(results.rows.item(0).matricula);
            setColor(results.rows.item(0).color);
            setSerial(results.rows.item(0).serial);
          } else {
            Alert.alert("Vehiculo no encontrado");
          }
        }
      );
    });
  };

  const updateVehicle = () => {
    console.log("updateVehicle");

    if (!vehicleMarca.trim()) {
      Alert.alert("La marca del vehiculo no puede estar vacio");
      return;
    }

    if (!vehicleMatricula.trim()) {
      Alert.alert("La matricula del vehiculo no puede estar vacio");
      return;
    }

    if (!vehicleColor.trim()) {
      Alert.alert("El color del vehiculo no puede estar vacio");
      return;
    }

    if (!vehicleSerial.trim()) {
      Alert.alert("El serial del vehiculo no puede estar vacio");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE vehicles SET marca_vehicle = ?, matricula = ?, color = ?, serial = ? WHERE vehicle_id = ?",
        [vehicleMarca, vehicleMatricula, vehicleColor, vehicleSerial, ID],
        (tx, results) => {
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo actualizado");
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
              <MyText text={MARCAID} style={styles.textNegrita} />
              <MySingleButton title="Cargar Valores" customPress={cargarValores} 
                btnColor="black"
              />
                <MyInputText
                placeholder="Marca del Vehiculo"
                value={vehicleMarca}
                onChangeText={(text) => setMarca(text)}
              />
              <MyInputText
                placeholder="Matricula"
                value={vehicleMatricula}
                onChangeText={(text) => setMatricula(text)}
              />
              <MyInputText
                placeholder="Color"
                value={vehicleColor}
                onChangeText={(text) => setColor(text)}
              />
              <MyInputText
                placeholder="Serial"
                value={vehicleSerial}
                onChangeText={(text) => setSerial(text)}
              />
              <MySingleButton title="Actualizar" customPress={updateVehicle} 
                btnColor="#FF8C00"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateVehicle;

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
