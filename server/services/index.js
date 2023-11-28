const express = require("express");
const app = express();

const users = [
  {
    id: 1,
    name: "Murli",
  },
  {
    id: 2,
    name: "Murli 2",
  },
  {
    id: 3,
    name: "Murli 3",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to our instagram API !");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params || {};
  const user = users.find((item) => item.id == id);

  res.json(user);
});

app.listen("3000", () => {
  console.log("Starting the sever!");
});
