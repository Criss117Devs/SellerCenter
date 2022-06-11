import mysql from "mysql2/promise";
import { MYSQL } from "../config.js";

export const handleConnection = async () => {
  const connection = await mysql.createConnection(MYSQL);
  return connection;
};
