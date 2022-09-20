import { handleConnection } from "../utils/handleConnection.js";
import { handleDataOrder } from "../utils/queries.js";

const rolesTable = "roles";

const types = {
  FIND: {
    script: `SELECT * FROM ${rolesTable} WHERE role = ?`,
    dataOrder: ["role"],
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
      console.log(err);
      response = { error: err };
    }
    connection.end();
    return response;
  },
  types: {
    ...types,
  },
};
