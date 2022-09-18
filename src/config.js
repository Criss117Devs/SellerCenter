const PORT = process.env.PORT || 3000;

const MYSQL = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "sellercenter",
};

const JWT_SECRET = process.env.JWT_SECRET || "q4f7t5g8w9g4c5t2";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export { PORT, MYSQL, JWT_SECRET, SALT_ROUNDS };
