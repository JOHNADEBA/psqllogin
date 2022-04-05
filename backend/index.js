import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    port: process.env.KNEXPORT,
    user: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    searchPath: ["knex", "public"],
  },
})
  if(db) {
    app.listen(process.env.PORT, () => {
      console.log("started", process.env.PORT);
    });
  }

// console.log(new Date());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db("logins")
    .where({
      email,
    })
    .then((response) => {
      console.log(response);
      const isValid = bcrypt.compareSync(password, response[0].password);
      isValid
        ? res.json({ msg: "successful", response })
        : res.json({ msg: "Credentials don't match" });
    })
    .catch((err) => res.status(400).json({ msg: "Wrong credentials" }));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, 5);
  //   console.log(hash);

  return db
    .transaction((trx) => {
      trx
        .insert({
          email,
          password: hash,
        })
        .into("logins")
        .returning("email")
        .then((loginEmail) => {
          console.log(loginEmail[0].email);
          return trx("users").returning("*").insert({
            name,
            email: loginEmail[0].email,
            created_on: new Date(),
          });
        })
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          res.json("Email already exist");
        });
      //   db("users")
      //     .returning("*")
      //     .insert({  name, email, created_on: new Date() })
      //     .then((user) => {
      //       res.json(user);
      //     })
      //     .catch((err) => {
      //       res.json(err);
      //     });
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.listen(process.env.PORT, () => {
//   console.log("started", process.env.DATABASE);
// });
