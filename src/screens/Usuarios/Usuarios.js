import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Button from '../../componentes/Button'

const Usuarios = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <Button
            style={styles.button}
            title="Crear Usuario"
            btnColor="green"
            btnIcon="user-plus"
            customPress={() => navigation.navigate("CrearUsuarios")}
          />
          <Button
            style={styles.button}
            title="Gestion"
            btnColor="orange"
            btnIcon="users"
            customPress={() => navigation.navigate("GestionarUsuarios")}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Usuarios

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