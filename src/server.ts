import * as env from "dotenv";
env.config();
const express = require("express");
import session from "express-session";
const bodyParser = require("body-parser");
const cors = require("cors");
import apiRouter from "./routes";
import mongoSession from "connect-mongodb-session";
import passport from "passport";
import { UserModel } from "./models/user";
import { Manager } from "./manager";
import local from "./auth/local-strategy";

const app = express();

app.use(cors());
app.use(bodyParser.json());
let port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log("Listening on port " + port);
});

const manager = new Manager();

const MongoSessionStore = mongoSession(session);
const sessionStore = new MongoSessionStore({
  uri: process.env.MONGOURL as string, //SET THIS FOR HOSTING
  databaseName: "cookbook",
  collection: "sessions",
});

passport.use(local);

passport.serializeUser(function (user: UserModel, callback: Function) {
  callback(null, user._id);
});

passport.deserializeUser(async function (id: string, callback: Function) {
  const user = await manager.userManager.getUserByID(id);
  if (!user) return callback("USERNOTFOUND");
  callback(null, user);
});

app.use(
  session({
    secret: process.env.SECRET as string,
    cookie: {
      maxAge: 604800000,
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);
