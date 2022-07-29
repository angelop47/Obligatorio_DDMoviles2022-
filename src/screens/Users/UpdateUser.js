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

const UpdateUser = ({ navigation, route }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");

  const ID = route.params.id;
  const NAME = route.params.name;
  const NAMEID = 'ID: ' + ID + '   Name: ' + NAME


  const cargarValores = () => {
    console.log("searchUser");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE user_id = ?",
        [ID],
        (tx, results) => {
          if (results.rows.length > 0) {
            setUserName(results.rows.item(0).user_name);
            setEmail(results.rows.item(0).email);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  const updateUser = () => {
    console.log("updateUser");

    if (!userName.trim()) {
      Alert.alert("El nombre de usuario no puede estar vacio");
      return;
    }

    if (!userEmail.trim()) {
      Alert.alert("El email no puede estar vacio");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET user_name = ?, email = ? WHERE user_id = ?",
        [userName, userEmail, ID],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario actualizado");
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
              <MyText text={NAMEID} style={styles.textNegrita} />

              <MySingleButton title="Cargar Valores" customPress={cargarValores}
                btnColor="black"
              />

              <MyInputText
                placeholder="Ingrese el nombre de Usuario"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
              <MyInputText
                placeholder="Ingrese el Email"
                value={userEmail}
                onChangeText={(text) => setEmail(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateUser}
                btnColor="#FF8C00"

              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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
