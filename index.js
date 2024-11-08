const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomakshaydhameworld";
const app = express();

app.use(express.json());

const users = [];

function generateToken() {
  let token = "";
  const options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }

  return token;
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    res.json({
      message: "You are already Signed up!",
    });
    return;
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed up!",
  });

  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    // foundUser.token = token;
    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password!",
    });
  }

  console.log(users);
});

app.get("/me", function (req, res) {
  const token = req.headers.token;
  const decodedInformation = jwt.verify(token, JWT_SECRET); // {username: akshay@gmail.com}
  const username = decodedInformation.username;
  let foundUser = null;

  foundUser = users.find((u) => u.username === username);

  if (foundUser) {
    res.json({
      username: foundUser.username,
    });
  } else {
    res.json({
      message: "Invalid Token!",
    });
  }
});

app.listen(3000);
console.log("app is listening on PORT 3000...");
