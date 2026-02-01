require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDB");
const session = require("express-session");
const passport = require("./middleware/passport");
const bodyParser = require("body-parser");
//routes
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
//keep active
const keepActiveRoutes = require("./keepActive/keepActiveRoute");
const keepServerActive = require("./keepActive/keepServerActive");

const app = express();

//Connect to Mongo DB
connectDB();

app.use(
  session({
    secret: "privateKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//body parser for upload limits
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use("/", express.static(path.resolve(path.join(__dirname, "./build"))));

app.use(express.json());
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://accounts.google.com",
  "https://e-commerce-mern-eryu.onrender.com",
  "https://e-commerce-mern-api.onrender.com"
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin: ", origin);
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
app.use("/product", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

//keepActive
// keepServerActive()
// app.use("/keepActive", keepActiveRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server listing to port 5000 only`));
