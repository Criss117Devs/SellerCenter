const PORT = process.env.PORT || 3000;

// const MYSQL = {
//   host: process.env.MYSQL_HOST || "containers-us-west-60.railway.app",
//   user: process.env.MYSQL_USER || "root",
//   password: process.env.MYSQL_PASSWORD || "VOVZDBpeFU0TV5iP0hgN",
//   database: process.env.MYSQL_DATABASE || "inventario",
// };

const MYSQL =
  "mysql://root:VOVZDBpeFU0TV5iP0hgN@containers-us-west-60.railway.app:6286/railway";

const JWT_SECRET = process.env.JWT_SECRET || "s0m3R@nd0mS3cr3t";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export { PORT, MYSQL, JWT_SECRET, SALT_ROUNDS };
