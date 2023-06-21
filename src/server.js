const express = require('express');
const session = require("express-session")
const mongoose = require("mongoose")
const cors = require("cors")
const MongoStore = require("connect-mongo")

const app = express()

require('dotenv').config({ path: "./config.env" });
app.use(cors())
app.use(express.json())


const connectToMongodb = () => mongoose.connect(process.env.KEY_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(
    session({
      secret: "foo",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.KEY_URL,
        ttl: 3600, // Session TTL (optional)
      }),
    })
  );
app.get("/", (req,res,next) => {
    req.session.views = (req.session.views || 0) + 1;
    res.send(`Number of views: ${req.session.views}`);
})
app.listen(3001, () => {
    try{
        connectToMongodb()
        console.log(`serber is listening on port ${process.env.PORT}`)
    } catch (err){
        console.log(err)
    }
    
})