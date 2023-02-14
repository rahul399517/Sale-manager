const express = require("express");
const app = express();
//Adding Cors middleware to connect backend and front end
const cors = require("cors");
//powershell-npm i mongoose
const mongoose = require("mongoose");
const userRoute = require("./routes/user_route");
const dataRoute = require("./routes/post_route");

const { MONGOBD_URL } = require("./config");
mongoose.set("strictQuery", true);
mongoose.connect(MONGOBD_URL);
mongoose.connection.on("connected", () => {
  console.log("DataBase successfully connected ");
});
mongoose.connection.on("error", () => {
  console.log("DataBase Not connected ");
});
app.use(cors());
app.use(express.json());
app.use("/", userRoute);

app.use("/", dataRoute);
app.listen(5000, () => {
  console.log("Terminal connected to port 5000");
});
