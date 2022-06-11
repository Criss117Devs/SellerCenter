import { handleConnection } from "../utils/handleConnection.js";
import { handleDataOrder } from "../utils/productHelpers.js";

const productsTable = "products";

const types = {
  GET_ALL: { script: `SELECT * FROM ${productsTable}`, dataOrder: undefined },
  FIND: {
    script: `SELECT * FROM ${productsTable} WHERE id = ?`,
    dataOrder: ["id"],
  },
  CREATE: {
    script: `INSERT INTO ${productsTable} (id, name, quantity) VALUES (?, ?, ?)`,
    dataOrder: ["id", "name", "quantity"],
  },
  UPDATE: {
    script: `UPDATE ${productsTable} SET name = ?, quantity = ? WHERE id = ?`,
    dataOrder: ["name", "quantity", "id"],
  },
  DELETE: {
    script: `DELETE FROM ${productsTable} WHERE id = ?`,
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
