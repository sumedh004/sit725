const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();
const uri =
  "mongodb+srv://s223654321:H7uDcmOy0UTjPVAl@cluster0.opevcdh.mongodb.net/";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/api", contactRoutes);
app.use("/api", scheduleRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
