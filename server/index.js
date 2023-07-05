const express = require("express");
const Users = require("./models/Users");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3001;

connectDb();
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/api/userRoutes"));
app.use("/api/items", require("./routes/api/itemRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
