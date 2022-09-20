const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_NAME = process.env.DB_NAME || "sellercenter";
const DB_PORT= process.env.DB_PORT|| "3306";
/*
const MYSQL = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "sellercenter",
};*/

//https://www.youtube.com/watch?v=zOsO996Esck&t=1027s
//https://www.youtube.com/watch?v=3sd1H7kJ-j4&t=8s full

/*
const MYSQL = {
  host: process.env.MYSQL_HOST || "sellercenter.cuecqchkbrc2.us-east-1.rds.amazonaws.com",
  user: process.env.MYSQL_USER || "admin",
  password: process.env.MYSQL_PASSWORD || "InAmberClad117",
  database: process.env.MYSQL_DATABASE || "sellercenter",
};
*/

const JWT_SECRET = process.env.JWT_SECRET || "q4f7t5g8w9g4c5t2";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  JWT_SECRET,
  SALT_ROUNDS
};
//sellercenter.cuecqchkbrc2.us-east-1.rds.amazonaws.com
//sellercenter.cuecqchkbrc2.us-east-1.rds.amazonaws.com