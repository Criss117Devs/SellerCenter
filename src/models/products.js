import { handleConnection } from "../utils/handleConnection.js";
import { handleDataOrder } from "../utils/queries.js";

const productsTable = "products";

const types = {
  GET_ALL: {
    script: `SELECT * FROM ${productsTable} WHERE userId = ?`,
    dataOrder: ["userId"],
  },
  FIND: {
    script: `SELECT * FROM ${productsTable} WHERE id = ? AND userId = ?`,
    dataOrder: ["id", "userId"],
  },
  CREATE: {
    script: `INSERT INTO ${productsTable} (id, name, quantity, userId) VALUES (?, ?, ?, ?)`,
    dataOrder: ["id", "name", "quantity", "userId"],
  },
  UPDATE: {
    script: `UPDATE ${productsTable} SET name = ?, quantity = ? WHERE id = ? AND userId = ?`,
    dataOrder: ["name", "quantity", "id", "userId"],
  },
  DELETE: {
    script: `DELETE FROM ${productsTable} WHERE id = ? AND userId = ?`,
    dataOrder: ["id", "userId"],
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
