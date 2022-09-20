import mysql from "mysql2/promise";
import { 
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} from "../config.js";

const MYSQL = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
};

export const handleConnection = async () => {
  const connection = await mysql.createConnection(MYSQL);
  return connection;
};
