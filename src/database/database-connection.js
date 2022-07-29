import * as SQLite from 'expo-sqlite';
const dbName = 'database.db';

const DatabaseConnection = {
  getConnection: () => {
    return SQLite.openDatabase(dbName);
  }
};


export const createTables = () => {
  // drop();
  createTableVehiculos();

};

const createTableVehiculos = () => {
  db.transaction((txn) => {
    txn.executeSql(
      `
      CREATE TABLE IF NOT EXISTS vehicles(
        vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca_vehicle VARCHAR(20),
        matricula VARCHAR(40),
        color VARCHAR(20),
        serial VARCHAR(30)`,
      [],
      (_, res) => {
        // console.log("table vehiculos created");
      },
      (_, error) => {
        console.log(`error while creating tables`);
        console.log(error);
      }
    );
  });
};




// export const createTables = () => {
//   // drop();
//   createTableVehiculos();
//   createTableClientes();
//   createTableRepuestos();
// };

// const createTableVehiculos = () => {
//   db.transaction((txn) => {
//     txn.executeSql(
//       `
//       CREATE TABLE IF NOT EXISTS vehicles(
//         vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,
//         marca_vehicle VARCHAR(20),
//         matricula VARCHAR(40),
//         color VARCHAR(20),
//         serial VARCHAR(30)
//   );`,
//       [],
//       (_, res) => {
//         // console.log("table vehiculos created");
//       },
//       (_, error) => {
//         console.log(`error while creating tables`);
//         console.log(error);
//       }
//     );
//   });
// };

// const createTableClientes = () => {
//   db.transaction((txn) => {
//     txn.executeSql(
//       `
//       CREATE TABLE IF NOT EXISTS users(
//         user_id INTEGER PRIMARY KEY AUTOINCREMENT(1,1),
//         user_name VARCHAR(20),
//         email VARCHAR(40),
//         password VARCHAR(20)
//         Vehiculo integer references Vehiculos(Id)
//   );`,
//       [],
//       (_, res) => {
//         // console.log("table clientes created");
//       },
//       (_, error) => {
//         console.log(`error while creating tables`);
//         console.log(error);
//       }
//     );
//   });
// };

// const createTableRepuestos = () => {
//   db.transaction((txn) => {
//     txn.executeSql(
//       `
//       CREATE TABLE IF NOT EXISTS repuestos (
//       repuesto_id int primary key,
//       nombre_rep varchar(30) unique
// );`,
//       [],
//       (_, res) => {
//         // console.log("table clientes created");
//       },
//       (_, error) => {
//         console.log(`error while creating tables`);
//         console.log(error);
//       }
//     );
//   });
// };


export default DatabaseConnection;
