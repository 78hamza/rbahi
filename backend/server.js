const React = require("react");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const profileRoute = require('./routes/profileRoute');
const dotenv = require("dotenv");
const { Pool } = require('pg');
const { default: mongoose } = require("mongoose");
dotenv.config();


//  create the server
const app = express();
const PORT = process.env.PORT || 7070;


// malware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api", profileRoute);


// default route for testing 
// app.get("/", (req,res) => {
//     console.log("api is running ...");
// });

app.get("/test", (req, res) =>{
    res.json({ message : "this is just a test"});
})

// mongoDB connection 
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log("✅  MongoDB connected"))
    .catch((err) => console.log('MongoDB connection error: ', err))

// start the server 
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});