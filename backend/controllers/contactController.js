const nodemailer = require("nodemailer")
const dotenv= require('dotenv');
dotenv.config()

exports.ContactController = async (req, res) => {
    const { fullName, email, message } = req.body;

    const auth = {
        user: process.env.USER_EMAIL,
        pass : process.env.USER_PASS
    };


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth : {user: auth.user, pass: auth.pass},
    });

    const mailOption = {
        from: email,
        to: auth.user,
        subject : `New message from ${fullName}`,
        text : `User: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
    };

    try{
        await transporter.sendMail(mailOption);
        res.status(200).json({message : "Message sent successfully"});
    } catch (err){
        console.error("email send error", err);
        res.status(500).json({error: "Failed to send email"})
    }
}