require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");


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


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
} )