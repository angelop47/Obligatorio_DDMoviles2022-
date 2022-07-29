import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    // VEHICULOS
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS vehicles(
          vehicle_id INTEGER PRIMARY KEY,
          marca_vehicle VARCHAR(20),
          matricula VARCHAR(40),
          color VARCHAR(20),
          serial VARCHAR(30)
          )`,
        [],
        (_, res) => {
          console.log("tabla de vehiculos creada");
        },
        (_, error) => {
          console.log(`error al crear tabla de vehiculos`);
          console.log(error);
        }
      );
    });
    // USUARIOS
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS users(
          user_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name VARCHAR(20),
          email VARCHAR(40),
          password VARCHAR(20),
          vehicle_id integer references vehicles(vehicle_id)
          )`,
        [],
        (_, res) => {
          console.log("tabla de usuarios creada");
        },
        (_, error) => {
          console.log(`error al crear tabla de usuarios`);
          console.log(error);
        }
      );
    });
    // REPUESTOS
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS Repuestos(
          repuesto_id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_rep VARCHAR(30)
          )`,
        [],
        (_, res) => {
          console.log("tabla de repuestos creada");
        },
        (_, error) => {
          console.log(`error al crear tabla de repuestos`);
          console.log(error);
        }
      );
    });
    // INSUMOS
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS Insumos(
          insumo_id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_insumo VARCHAR(30)
          )`,
        [],
        (_, res) => {
          console.log("tabla de insumos creada");
        },
        (_, error) => {
          console.log(`error al crear tabla de insumos`);
          console.log(error);
        }
      );
    });

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var setCurrentDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec

    // TRATAMIENTOS
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS Tratamientos (
          Id_Tratamiento INTEGER PRIMARY KEY AUTOINCREMENT,
          Titulo varchar(30) not null,
          matricula varchar(20) references vehicles(matricula),
          FechaInicio varchar(20),
          FechaFin varchar(20),
          Costo integer
        );`,
        [],
        (_, res) => {
          // console.log("table clientes created");
        },
        (_, error) => {
          console.log(`error while creating tables`);
          console.log(error);
        }
      );
    });
    //TRATAMIENTO INSUMO
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS TratamientosInsumos (
          Id_Tratamiento INTEGER references Tratamientos(Id_Tratamiento),
          insumo_id integer references Insumos(insumo_id),
          Cantidad integer,
          primary key (Id_Tratamiento, insumo_id, Cantidad)
  );`,
        [],
        (_, res) => {
          // console.log("table clientes created");
        },
        (_, error) => {
          console.log(`error while creating tables`);
          console.log(error);
        }
      );
    });
    //TRATAMIENTO REPUESTO
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS TratamientosRepuestos (
          Id_Tratamiento INTEGER references Tratamientos(Id_Tratamiento),
          repuesto_id integer references Repuestos(repuesto_id),
          Cantidad integer,
          primary key (Id_Tratamiento, repuesto_id, Cantidad)
  );`,
        [],
        (_, res) => {
          // console.log("table clientes created");
        },
        (_, error) => {
          console.log(`error while creating tables`);
          console.log(error);
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM vehicles', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM users', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM Tratamientos', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM TratamientosRepuestos', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM TratamientosInsumos', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM Repuestos', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DELETE FROM Insumos', []);
    });
    db.transaction((txn) => {
      txn.executeSql('DROP TABLE Tratamientos', []);
    });
    // db.transaction((txn) => {
    //   txn.executeSql('DROP TABLE users', []);
    // });
    // db.transaction((txn) => {
    //   txn.executeSql('DROP TABLE repuestos', []);
    // });
    // db.transaction((txn) => {
    //   txn.executeSql('DROP TABLE insumos', []);
    // });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Usuarios"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("ViewAllUsers")}
              />
              <MyButton
                title="Vehiculos"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("ViewAllVehicles")}
              />
              <MyButton
                title="Tratamientos"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("ViewAllTreatments")}
              />
              <MyButton
                title="Repuestos"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("ViewAllRepuestos")}
              />
              <MyButton
                title="Insumos"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("ViewAllInsumos")}
              />
              <MyButton
                title="Tratamientos finalizados"
                btnColor="#D2691E"
                customPress={() => navigation.navigate("TreatmentFinalizados")}
              />
              <MyButton
                title="Borrar DB"
                btnColor="#8B0000"
                customPress={() => removeElementsOnDatabase()}
              />

            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#DEB887",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
