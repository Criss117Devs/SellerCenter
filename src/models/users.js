import { handleConnection } from "../utils/handleConnection.js";
import { handleDataOrder } from "../utils/queries.js";

const usersTable = "users";

const types = {
  GET_ALL: { script: `SELECT * FROM ${usersTable}`, dataOrder: undefined },
  SING_IN: {
    script: `SELECT * FROM ${usersTable} WHERE email = ?`,
    dataOrder: ["email"],
  },
  FIND: {
    script: `SELECT * FROM ${usersTable} WHERE id = ?`,
    dataOrder: ["id"],
  },
  FINDBYEMAIL: {
    script: `SELECT * FROM ${usersTable} WHERE email = ?`,
    dataOrder: ["email"],
  },
  CREATE: {
    script: `INSERT INTO ${usersTable} (key_value_string, c_firstName, c_lastName, c_password, c_status) VALUES (?, ?, ?, ?, ?)`,
    dataOrder: ["key_value_string", "c_firstName", "c_lastName", "c_password", "c_status"],
  },
  UPDATE: {
    script: `UPDATE ${usersTable} SET c_firstName = ?, c_lastName = ?, c_password = ?, c_status = ? WHERE id = 1`,
    dataOrder: ["c_firstName", "c_lastName", "c_password", "c_status", "id"],
  },
  
  DELETE: {
    script: `DELETE FROM ${usersTable} WHERE id = ?`,
    dataOrder: ["id"],
  },
};

export default {
  query: async ({ type, data = {} }) => {
    const connection = await handleConnection();
    let response;
    try {
      const [rows, _] = await connection.query(
        type.script,
        type.dataOrder ? handleDataOrder(type.dataOrder, data) : undefined
      );
      response = rows;
    } catch (err) {
      response = { error: err };
    }
    connection.end();
    return response;
  },
  types: {
    ...types,
  },
};
