const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const port = 3000;

mongoose
  .connect(process.env.DB_CONNECTION_LINK)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB connection error");
  });
  
app.use(express.json());

// calling routes
app.use("/mybooks", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
