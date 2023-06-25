require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();

// what is it... myfun().then(runs after my fun success).catch(shows error if myfun does not run properly)

mongoose.connect(process.env.DATABASE, {
    // helps keep db connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateTopology: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(
    console.log("DB could not connected")
);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
} )