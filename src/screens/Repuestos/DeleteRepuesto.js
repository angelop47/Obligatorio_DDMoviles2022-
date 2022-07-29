import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation, route }) => {

  const ID = route.params.id;
  const NAME = route.params.name;
  const NAMEID = 'ID: ' + ID + '   Name: ' + NAME

  const inicio = () => {
    navigation.navigate("HomeScreen");
  };

  const deleteUser = ({ navigation }) => {
    console.log("deleteUser");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Repuestos WHERE repuesto_id = ?`,
        [ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Exito",
              "Repuesto eliminado!!!",
              [
                {
                  text: "Ok",
                  onPress: inicio()
                },
              ],
            );
          } else {
            Alert.alert("El repuesto no existe");
          }
        }
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text={NAMEID} style={styles.textNegrita} />
            <KeyboardAvoidingView style={styles.keyboardView}>

              <MySingleButton title="Borrar Repuesto" customPress={deleteUser}
                btnColor="#8B0000"
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;

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
  inputStyle: {
    padding: 15,
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
  }
});
