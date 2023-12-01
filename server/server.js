const express = require("express");
const { createUser, getUsers } = require("./controllers/userController");
const { connect } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

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

// Endpoint to access all user
app.get("/api/users", async (req, res) => {
  // const { name, email } = req.body;
  try {
    const users = await getUsers();
    const response = {
      data: { users: users },
    };
    console.log("response::::",response)
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", err });
  }
});

// Endpoint to access a user
app.post("/api/check-user", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const users = await getUsers();
    // const response = {
    //   data: { users: users },
    // };
    console.log("response::::",email, password )
    res.status(201).json('response');
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", err });
  }
});

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Other headers you might need to allow (such as methods or headers)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
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
