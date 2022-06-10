const PORT = process.env.PORT || 3000;

const MYSQL = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "puntocommerce",
  database: process.env.MYSQL_DATABASE || "inventario",
};

export { PORT, MYSQL };
