import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

import Principal from "../screens/Principal";
import Usuarios from "../screens/Usuarios/Usuarios";
import CrearUsuarios from "../screens/Usuarios/CrearUsuarios";
import GestionarUsuarios from "../screens/Usuarios/GestionarUsuarios";
import AgregarVehiculo from "../screens/Vehiculos/AgregarVehiculo";
import ModificarVehiculo from "../screens/Vehiculos/ModificarVehiculo";
import CrearTratamiento from "../screens/Tratamientos/CrearTratamiento";
import ModificarTratamiento from "../screens/Tratamientos/ModificarTratamiento";
import BuscarTratamiento from "../screens/Tratamientos/BuscarTratamiento";
import Tratamiento from "../screens/Tratamientos/Tratamiento";
import Insumos from "../screens/Insumos/Insumos";
import Repuestos from "../screens/Repuestos/Repuestos";


const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen
          name="Inicio"
          component={Principal}
          options={{
            title: "Obligatorio D D Moviles",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="Usuarios"
          component={Usuarios}
          options={{
            title: "Usuarios",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="CrearUsuarios"
          component={CrearUsuarios}
          options={{
            title: "Crear Usuarios",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="GestionarUsuarios"
          component={GestionarUsuarios}
          options={{
            title: "Gestionar",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="AgregarVehiculo"
          component={AgregarVehiculo}
          options={{
            title: "Vehículos",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="ModificarVehiculo"
          component={ModificarVehiculo}
          options={{
            title: "Modificar Vehiculo",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="CrearTratamiento"
          component={CrearTratamiento}
          options={{
            title: "Tratamiento",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="ModificarTratamiento"
          component={ModificarTratamiento}
          options={{
            title: "Tratamiento",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="BuscarTratamiento"
          component={BuscarTratamiento}
          options={{
            title: "Buscar Tratamiento",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="Tratamiento"
          component={Tratamiento}
          options={{
            title: "Tratamiento",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="Insumos"
          component={Insumos}
          options={{
            title: "Insumos",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />
        <Stack.Screen
          name="Repuestos"
          component={Repuestos}
          options={{
            title: "Repuestos",
            headerStyle: {
              backgroundColor: "#ff8000"
            },
            headerTintColor: "#FFFF00",
            headerTitleStyle: {
              color: 'white',
              textShadowOffset: { width: 5, height: 5 },
              textShadowRadius: 5,
              fontSize: 25,
            }
          }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default RootStack
