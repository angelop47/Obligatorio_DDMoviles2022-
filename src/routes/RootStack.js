import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// vamos a importar los componentes que vamoar a crear
import HomeScreen from "../screens/HomeScreen";
import UpdateUser from "../screens/Users/UpdateUser";
import DeleteUser from "../screens/Users/DeleteUser";

import RegisterUser from "../screens/Users/RegisterUser";
import ViewAllUsers from "../screens/Users/ViewAllUsers";
import User from "../screens/Users/User";
import AssociateVehicle from "../screens/Users/AssociateVehicle";
import AssociateVehicleFinal from "../screens/Users/AssociateVehicleFinal";

import ViewAllVehicles from "../screens/Vehicles/ViewAllVehicles";
import RegisterVehicle from "../screens/Vehicles/RegisterVehicle";
import Vehicle from "../screens/Vehicles/Vehicle";
import DeleteVehicle from "../screens/Vehicles/DeleteVehicle";
import UpdateVehicle from "../screens/Vehicles/UpdateVehicle";

import RegisterRepuesto from "../screens/Repuestos/RegisterRepuesto";
import ViewAllRepuestos from "../screens/Repuestos/ViewAllRepuestos";
import Repuesto from "../screens/Repuestos/Repuesto";
import DeleteRepuesto from "../screens/Repuestos/DeleteRepuesto";
import RepTreatment from "../screens/Repuestos/RepTreatment";
import RepTreatmentFinal from "../screens/Repuestos/RepTreatmentFinal";

import RegisterInsumo from "../screens/Insumos/RegisterInsumo";
import ViewAllInsumos from "../screens/Insumos/ViewAllInsumos";
import Insumo from "../screens/Insumos/Insumo";
import DeleteInsumo from "../screens/Insumos/DeleteInsumo";
import InsTreatment from "../screens/Insumos/InsTreatment";
import InsTreatmentFinal from "../screens/Insumos/InsTreatmentFinal";

import ViewAllTreatments from "../screens/Treatments/ViewAllTreatment";
import RegisterTreatment from "../screens/Treatments/RegisterTreatment";
import UpdateTreatment from "../screens/Treatments/UpdateTreatment";
import Treatment from "../screens/Treatments/Treatment";
import TreatmentRepuestos from "../screens/Treatments/TreatmentRepuestos";
import TreatmentInsumos from "../screens/Treatments/TreatmentInsumos";
import TreatmentFinalizados from "../screens/Treatments/TreatmentFinalizados";

// crear componente de rutas
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* USUARIOS */}
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUsers}
          options={{
            title: "Ver todos los Usuario",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            title: "Usuario",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: "Modificar Usuario",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title: "Borrar Usuario",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AssociateVehicle"
          component={AssociateVehicle}
          options={{
            title: "Asociar Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AssociateVehicleFinal"
          component={AssociateVehicleFinal}
          options={{
            title: "Asociar Vehiculo Final",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* VEHICULOS */}
        <Stack.Screen
          name="RegisterVehicle"
          component={RegisterVehicle}
          options={{
            title: "Registrar Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Vehicle"
          component={Vehicle}
          options={{
            title: "Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ViewAllVehicles"
          component={ViewAllVehicles}
          options={{
            title: "Ver todos los Vehiculos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteVehicle"
          component={DeleteVehicle}
          options={{
            title: "ELiminar Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateVehicle"
          component={UpdateVehicle}
          options={{
            title: "Modificar Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/*REPUESTOS */}
        <Stack.Screen
          name="ViewAllRepuestos"
          component={ViewAllRepuestos}
          options={{
            title: "Ver todos los repuestos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Repuesto"
          component={Repuesto}
          options={{
            title: "Repuesto",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterRepuesto"
          component={RegisterRepuesto}
          options={{
            title: "Registar repuesto",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteRepuesto"
          component={DeleteRepuesto}
          options={{
            title: "Eliminar repuesto",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RepTreatment"
          component={RepTreatment}
          options={{
            title: "Agregar Rep al tratamiento",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RepTreatmentFinal"
          component={RepTreatmentFinal}
          options={{
            title: "Agregar Rep al tratamiento",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />


        {/* INSUMOS */}
        <Stack.Screen
          name="RegisterInsumo"
          component={RegisterInsumo}
          options={{
            title: "Registrar Insumo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllInsumos"
          component={ViewAllInsumos}
          options={{
            title: "Ver todos los insumos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Insumo"
          component={Insumo}
          options={{
            title: "Ver insumo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteInsumo"
          component={DeleteInsumo}
          options={{
            title: "Eliminar Vehiculo",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="InsTreatment"
          component={InsTreatment}
          options={{
            title: "Agregar Ins al tratamiento",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="InsTreatmentFinal"
          component={InsTreatmentFinal}
          options={{
            title: "Agregar Ins al tratamiento",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        {/* TRATAMIENTOS */}
        <Stack.Screen
          name="ViewAllTreatments"
          component={ViewAllTreatments}
          options={{
            title: "Ver tratamientos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterTreatment"
          component={RegisterTreatment}
          options={{
            title: "Registrar tratamientos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateTreatment"
          component={UpdateTreatment}
          options={{
            title: "Modificar tratamientos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Treatment"
          component={Treatment}
          options={{
            title: "Tratamiento",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="TreatmentRepuestos"
          component={TreatmentRepuestos}
          options={{
            title: "Tratamiento Repuestos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="TreatmentInsumos"
          component={TreatmentInsumos}
          options={{
            title: "Tratamiento Insumos",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="TreatmentFinalizados"
          component={TreatmentFinalizados}
          options={{
            title: "Tratamiento Finalizados",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
