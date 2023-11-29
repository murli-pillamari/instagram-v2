const { connect } = require("../config/db");
const User = require("../model/user");
// const User = require("../models/user");

async function createUser(name, email) {
  try {
    const db = await connect();
    const collection = db.collection("users");
    const newUser = new User(name, email);
    const result = await collection.insertOne(newUser);
    console.log("User created:", result.insertedId);
  } catch (err) {
    console.error("Error creating user:", err);
  }
}

module.exports = { createUser };
