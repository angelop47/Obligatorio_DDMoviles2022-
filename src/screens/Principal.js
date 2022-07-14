import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Button from '../componentes/Button'
import { CrearTablaUsuario, CrearTablaVehiculo, CrearTablaTratamiento } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Principal = ({ navigation }) => {
  useEffect(() => {
    CrearTablaUsuario();
    CrearTablaVehiculo();
    CrearTablaTratamiento();
  }, []);
  function borrarBaseDatos() {
    db.transaction((txn) => {
      txn.executeSql('DROP TABLE IF EXISTS tratamientos', []);
      txn.executeSql('DROP TABLE IF EXISTS usuarios', []);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
        
          <Button
            style={styles.button}
            title="Usuarios"
            btnColor="green"
            btnIcon="user-plus"
            customPress={() => navigation.navigate("Usuarios")}
          />
          <Button
            style={styles.button}
            title="Crear Tratamiento"
            btnColor="green"
            btnIcon="plus"
            customPress={() => navigation.navigate("CrearTratamiento")}
          />
          <Button
            style={styles.button}
            title="Tratamientos Activos"
            btnColor="orange"
            btnIcon="list"
            customPress={() => navigation.navigate("ModificarTratamiento")}
          />
          <Button
            style={styles.button}
            title="Tratamientos Finalizados"
            btnColor="orange"
            btnIcon="list"
            customPress={() => navigation.navigate("BuscarTratamiento")}
          />
          <Button
            style={styles.button}
            title="Borrar Base de Datos"
            btnColor="red"
            btnIcon="trash"
            customPress={() => borrarBaseDatos()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Principal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  generalView: {
    flex: 1,
  },
  button: {
    width: 200,
    height: 80,
  },
})