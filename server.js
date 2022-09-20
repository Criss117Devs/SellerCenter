import express from "express";
import { PORT } from "./src/config.js";
import cors from "cors"

//import products from "./src/routes/products.js";
import users from "./src/routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());
//Adding cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(express.urlencoded({ extended: true }));

//app.use("/products", products);
app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server at:  ${PORT}`);
});
//morgan