const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const SERVER_PORT = process.env.PORT || 8080
const app = express();
const userRoutes = require("./project/routes/user");
const offerRoutes = require("./project/routes/offer");
mongoose.connect("mongodb://localhost:27017/user").then(() => {
    console.log("succesfully connected to db");
}).catch(() => {
    console.log("failed to  connect to db");
})
app.use(bodyParser.json());
app.listen(SERVER_PORT, ()=> {
    console.log("server started at" + " " + SERVER_PORT);
});
app.use("/user", userRoutes);
app.use("/offer", offerRoutes);