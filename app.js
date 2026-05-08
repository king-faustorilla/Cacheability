const express = require("express");
const app = express();

const drinkRoutes = require("./routes/drinks");

app.use(express.json());
app.use("/drinks", drinkRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});