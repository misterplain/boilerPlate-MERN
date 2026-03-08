require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDB");
const session = require("express-session");
const passport = require("./middleware/passport");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
//routes
const authRoutes = require("./routes/authRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const requestId = require("./middleware/requestId");
const errorHandler = require("./middleware/errorHandler");

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
  }),
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
  "https://e-commerce-mern-api.onrender.com",
  "https://server-muddy-river-1999.fly.dev",
];
app.use(
  cors({
    origin: function (origin, callback) {
      logger.debug("CORS origin check", { origin });
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use(requestId);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/collection", collectionRoutes);
app.use("/product", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server listening on port ${PORT}`);
});
