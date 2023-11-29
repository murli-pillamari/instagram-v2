const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://murlipillamari6:data@123@cluster0.jawyqzr.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const dbName = "users"; // Replace with your database name

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = { connect };
