import React from 'react'
import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList } from 'react-native'
import InputText from '../../componentes/InputText'
import Button from '../../componentes/Button'
import Repuesto from '../../componentes/Repuesto'

const Repuestos = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [repuestos, setRepuestos] = useState(["Repuesto 1"]);
  const listarRepuestos = (item) => {
    return (
      <View >
        <Repuesto
          style={styles.carta}
          texto={item}
          btnColor="#7d7f7d"
          customPress={() => setNombre(item)}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>

          <InputText
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text.trim())}
          />


          <InputText
            style={styles.input}
            placeholder="Precio"
            onChangeText={(text) => setPrecio(text.trim())}
          />

            <Button
              style={styles.button}
              title="Agregar"
              btnColor="green"
              btnIcon="user-plus"
              customPress={() => Alert.alert(`Agrego:${nombre}`)}
            />
            <Button
              style={styles.button}
              title="Modificar"
              btnColor="orange"
              customPress={() => Alert.alert(`Modifico:${nombre}`)}
            />
            <Button
              style={styles.button}
              btnColor="red"
              btnIcon="trash"
              customPress={() => Alert.alert(`Elimino:${nombre}`)}
            />
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={repuestos}
            renderItem={({ item }) => listarRepuestos(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Repuestos

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
  texto: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  input: {
    width: 200,
    height: 40,
  },
  button: {
    width: 100,
    height: 80,
  },
  carta: {
    width: 250,
    height: 50,
  },
  listItemView: {
    margin: 5,
    alignItems: "center",
    elevation: 5,
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})