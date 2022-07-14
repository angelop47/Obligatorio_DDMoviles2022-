import React from 'react'
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import InputText from '../../componentes/InputText'
import Button from '../../componentes/Button'
import Repuesto from '../../componentes/Repuesto'
import Insumo from '../../componentes/Insumo'
import Tratamiento from '../../componentes/Tratamiento';
import { ModTratamiento, EliminarTratamiento } from '../../database/FuncionesABM'
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

const ModificarTratamiento = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState([]);
  const [usuaruio, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [fechaInicioTratamiento, setFechaInicioTratamiento] = useState('');
  const [fechaFinalTratamiento, setFechaFinalTratamiento] = useState('');
  const [manoDeObra, setManoDeObra] = useState('');
  const [tratamientoID, setTratamientoID] = useState('');
  const [insumos, setInsumos] = useState(["Insumo 1"]);
  const [repuestos, setRepuestos] = useState(["Repuesto 1"]);
  const listarInsumos = (item) => {
    return (
      <View >
        <Insumo
          style={styles.carta}
          texto={item}
          btnColor="#7d7f7d"
          customPress={() => setVehiculo(item)}
        />
      </View>
    );
  };
  const listarRepuestos = (item) => {
    return (
      <View >
        <Repuesto
          style={styles.carta}
          texto={item}
          btnColor="#7d7f7d"
          customPress={() => setVehiculo(item)}
        />
      </View>
    );
  };
  const listarTratamiento = (item) => {
    return (
      <View >
        <Tratamiento
          style={styles.carta}
          texto={item.matricula + " - " + item.tratamiento}
          btnColor="#7d7f7d"
          customPress={() => CargoTratamiento(item)}
        />
      </View>
    );
  };
  function CargoTratamiento(pTratamiento) {
    setTratamiento(pTratamiento.tratamiento);
    setFechaInicioTratamiento(pTratamiento.fechaInicioTratamiento);
    setFechaFinalTratamiento(pTratamiento.fechaFinalTratamiento);
    setVehiculo(pTratamiento.matricula);
    setManoDeObra(pTratamiento.manoDeObra);
    setTratamientoID(pTratamiento.tratamientoID);
    setModalVisible(!modalVisible);
  }

  function EliminoTratamiento() {
    if (tratamientoID === '') {
      Alert.alert("Error", "No se ha seleccionado ningun tratamiento");
    }
    EliminarTratamiento(tratamientoID);
    navigation.navigate('Inicio');
  }

  function ActualizoTratamiento() {
    if (tratamiento === '' || fechaInicioTratamiento === '' || fechaFinalTratamiento === '' || manoDeObra === '' || vehiculo === '') {
      Alert.alert('Error', 'Debe completar todos los campos');
    }
    else {
      ModTratamiento(tratamientoID, vehiculo, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, 0);
      navigation.navigate('Inicio');
    }
  }

  useEffect(() => {
    let auxTratamientos = [];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratamientos`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          let auxTratamiento
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          temp.map((unTratamiento) => {
            auxTratamiento = {
              matricula: unTratamiento.matricula,
              tratamiento: unTratamiento.tratamiento,
              fechaFinalTratamiento: unTratamiento.fechaFinalTratamiento,
              fechaInicioTratamiento: unTratamiento.fechaInicioTratamiento,
              manoDeObra: unTratamiento.manoDeObra,
              tratamientoID: unTratamiento.tratamientoId
            }
            auxTratamientos.push(auxTratamiento);
            setTratamientos(auxTratamientos);
          })
        }
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("Inicio")
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={tratamientos}
                  renderItem={({ item }) => listarTratamiento(item)}
                />
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={() => {
              setModal2Visible(!modal2Visible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={insumos}
                  renderItem={({ item }) => listarInsumos(item)}
                />


                <InputText
                  style={styles.input}
                  placeholder="Cantidad"
                  onChangeText={(text) => setUsuario(text.trim())}
                />

                <View style={styles.line}>
                  <Button
                    style={styles.button}
                    title="Cargar"
                    btnColor="green"
                    customPress={() => setModal2Visible(!modal2Visible)}
                  />
                  <Button
                    style={styles.button}
                    title="Agregar Insumo"
                    btnColor="green"
                    btnIcon="plus"
                    customPress={() => navigation.navigate("Insumos")}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal3Visible}
            onRequestClose={() => {
              setModal3Visible(!modal3Visible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={repuestos}
                  renderItem={({ item }) => listarRepuestos(item)}
                />

                <InputText
                  style={styles.input}
                  placeholder="Cantidad"
                  onChangeText={(text) => setUsuario(text.trim())}
                />

                <View style={styles.line}>
                  <Button
                    style={styles.button}
                    title="Cargar"
                    btnColor="green"
                    customPress={() => setModal3Visible(!modal3Visible)}
                  />
                  <Button
                    style={styles.button}
                    title="Agregar Repuesto"
                    btnColor="green"
                    btnIcon="plus"
                    customPress={() => navigation.navigate("Repuestos")}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <InputText
            style={styles.input}
            placeholder="Vehiculo"
            editable={false}
            value={vehiculo}
            onChangeText={(text) => setVehiculo(text)}
          />
          <InputText
            style={styles.input}
            placeholder="Tratamiento"
            value={tratamiento}
            onChangeText={(text) => setTratamiento(text)}
          />
          <InputText
            style={styles.input}
            placeholder="Fecha Inicio"
            editable={false}
            value={fechaInicioTratamiento}
            onChangeText={(text) => setFechaInicioTratamiento(text)}
          />
          <InputText
            style={styles.input}
            placeholder="Fecha Fin"
            value={fechaFinalTratamiento}
            editable={false}
            onChangeText={(text) => setFechaFinalTratamiento(text)}
          />
          <InputText
            style={styles.input}
            placeholder="Mano De Obra"
            value={manoDeObra.toString()}
            onChangeText={(text) => setManoDeObra(text)}
          />
          <View style={styles.line}>
            <View>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={insumos}
                renderItem={({ item }) => listarInsumos(item)}
              />
              <Button
                style={styles.button2}
                title="Insumo"
                btnColor="green"
                btnIcon="plus"
                customPress={() => setModal2Visible(!modal2Visible)}
              />
            </View>
            <View>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={repuestos}
                renderItem={({ item }) => listarRepuestos(item)}
              />
              <Button
                style={styles.button2}
                title="Repuesto"
                btnColor="green"
                btnIcon="plus"
                customPress={() => setModal3Visible(!modal3Visible)}
              />
            </View>
          </View>

          <View style={styles.line}>
            <Button
              style={styles.button}
              title="Modificar"
              btnColor="orange"
              customPress={() => ActualizoTratamiento()}
            />
            <Button
              style={styles.button}
              title="Eliminar"
              btnColor="red"
              btnIcon="trash"
              customPress={() => EliminoTratamiento()}
            />
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}


export default ModificarTratamiento

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
    width: 120,
    height: 50,
  },
  button2: {
    width: 90,
    height: 50,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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