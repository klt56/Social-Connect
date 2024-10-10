const mongoose = require("mongoose");

//mongoose.set('strictQuery', false); // Ajout de la ligne pour désactiver strictQuery

mongoose
  .connect("mongodb+srv://wlinter99:xgdHTU74DBtyZ7OU@cluster0.7t0ir.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("failed to connect to MongoDB", err));

