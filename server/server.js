require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { logger } = require("./middleware/logger");
const { logEvents } = require("./middleware/logger");
//config
const connectDB = require("./config/connectDB");
//boilerPlate
const session = require("express-session");
const passport = require("./middleware/passport");
//boilerPlate routes
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
//model
const UserModel = require("./models/userModel");

const app = express();

//Connect to Mongo DB
connectDB();

//express-sessions rather than cookie-session
app.use(
  session({
    secret: "privateKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//custom middleware logger
app.use(logger);
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

app.use("/", express.static(path.resolve(path.join(__dirname, "./build"))));

app.use(express.json());
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://accounts.google.com",
  "https://hpnotepad.onrender.com",
  "https://fantasticfy.onrender.com",
  "https://patrickobrien.onrender.com",
  "https://bcnminimalista.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin: ", origin); // Log the origin
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/collection", collectionRoutes);
app.use("/product", productRoutes)
app.use("/review", reviewRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server listing to port 5000 only`));
