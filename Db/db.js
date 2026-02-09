const mongoose = require("mongoose");

function connectDb() {
  const mongoUri = process.env.MONGODB_URI || "mongodb+srv://numan:123@cluster0.uk9g6.mongodb.net/CRP";
  mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("connection successfull");
  });
  connection.on("error", () => {
    console.log("connection failed");
  });
}

connectDb();
module.exports = mongoose;
