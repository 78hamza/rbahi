const User = require("../models/User");
const { Pool } = require('pg');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
    const { fullName, company, address, email, phone, password } = req.body;

    try {
 
        const isExist = await User.findOne({ where: { email } });

        if (isExist) {
            return res.status(409).json({ error: "User already exists!" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        
        console.log("creating new user");

        const newUser = await User.create({
            fullName,
            company,
            address,
            email,
            phone,
            password: passwordHashed
        });
        

        res.status(201).json({ 
            message: "User signed up successfully",
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                company: newUser.company
            }
        });
        console.log("User signup success!");
    } catch (err) {
        console.log("Signup failed", err);
        res.status(500).json({ error: "Something went wrong!" });
    }
};

const SignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // searching the user email in our database postgres
        const user = await User.findOne({ where : { email }});

        if (!user) {
            return res.status(400).json({ error: "Email or password incorrect!" });
        }

        

        // Comparer le mot de passe hashé
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Email or password incorrect!" });
        }

        // Générer un token JWT (penser à adapter user id, ici c'est user.id)
        const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.fullName,  
                email: user.email
            }
        });
    } catch (err) {
        console.log("Login error", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports = { SignUp, SignIn };

