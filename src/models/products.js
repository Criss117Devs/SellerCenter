import mysql from "mysql2/promise";
import { MYSQL } from "../config.js";

const handleConnection = async () => {
  const connection = await mysql.createConnection(MYSQL);
  return connection;
};

// class Products {
//   constructor() {
//     this.connection = mysql.createPool(MYSQL);
//   }

//   async getAll() {
//     const [rows, fields] = await this.connection.query(
//       "SELECT * FROM products"
//     );
//     return rows;
//   }

//   async create({ id, name, quantity }) {
//     try {
//       const [rows, fields] = await this.connection.query(
//         "INSERT INTO products (id, name, quantity) VALUES (?, ?, ?)",
//         [id, name, quantity]
//       );
//       return rows;
//     } catch (err) {
//       return { error: err };
//     }
//   }
// }

const getAll = async () => {
  const connection = await handleConnection();
  const [rows, fields] = await connection.query("SELECT * FROM products");
  connection.end();
  return rows;
};

const create = async ({ id, name, quantity }) => {
  const connection = await handleConnection();
  try {
    const [rows, fields] = await connection.query(
      "INSERT INTO products (id, name, quantity) VALUES (?, ?, ?)",
      [id, name, quantity]
    );
    connection.end();
    return rows;
  } catch (err) {
    return { error: err };
  }
};

export default { getAll, create };
