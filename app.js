require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");


// what is it... myfun().then(runs after my fun success).catch(shows error if myfun does not run properly)


// DB connection

mongoose.connect(process.env.DATABASE, {
    // helps keep db connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateTopology: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(
    console.log("DB not connected")
);

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api/", authRoutes);
app.use("/api/", userRoutes);


// PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
} )