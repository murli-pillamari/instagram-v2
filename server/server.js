const express = require("express");
const { createUser } = require("./controllers/userController");
const { connect } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our instagram API !");
});

// Endpoint to create a user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    await createUser(name, email);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Connect to MongoDB and start the server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });
