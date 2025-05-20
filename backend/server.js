const React = require("react");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const uploadRoute = require("./routes/uploadRoute");
const dotenv = require("dotenv");
const { Pool } = require('pg')
dotenv.config();


//  create the server
const app = express();
const PORT = 7070;


// malware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api", uploadRoute);

// default route for testing 
// app.get("/", (req,res) => {
//     console.log("api is running ...");
// });

app.get("/test", (req, res) =>{
    res.json({ message : "this is just a test"});
})


// start the server 
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});