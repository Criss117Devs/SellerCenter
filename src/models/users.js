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
  CREATE: {
    script: `INSERT INTO ${usersTable} (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
    dataOrder: ["firstName", "lastName", "email", "password"],
  },
  UPDATE: {
    script: `UPDATE ${usersTable} SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`,
    dataOrder: ["firstName", "lastName", "email", "password", "id"],
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
