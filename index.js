import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  
 res.json({ message: "from index api" });

});


app.listen(8081, () => {

  console.log(`Server is running`);


});
