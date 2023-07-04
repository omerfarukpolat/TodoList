const mongoose = require("mongoose").default;

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const connect = await mongoose.connect(uri);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
