const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next){

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if (!token){
        res.status(401).json({ message: "access denied"});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        res.user = decoded;
        next();
    }catch (err){
        res.status(403).json({ message : "invalid token"});
    }
};