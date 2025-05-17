const React = require("react");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const dotenv = require("dotenv");
dotenv.config();


//  create the server
const app = express();
const PORT = 7500;


// malware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

// default route for testing 
app.get("/", (req,res) => {
    console.log("api is running ...");
});

// start the server 
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});