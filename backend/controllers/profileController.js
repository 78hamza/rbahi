const { where } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.getProfile = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: ['id', 'fullName', 'company', 'address', 'email', 'phone', 'created_at']
        });

        if (!user) {
            return res.status(404).json({ error: "user not found"});
        }

        res.json(user);
    }catch (err) {
        console.error("error fetching user profile", err);
        res.status(500).json({ error: "failed to fetch user profile"});
    }
};

exports.updateProfile = async (req, res) => {
    try{
        const id = req.params.id;
   
        const { fullName, company, address, email, phone } = req.body;
  

        console.log('user id', req.params.id);
        console.log('updaeted user data:', { fullName, company, address, email, phone })
        const user = await User.findByPk(id);
        // check if the user in on our database
        if (!user) {
            return res.status(404).json({ error: "user not found"});
        }
        await User.update({ fullName, company, address, email, phone },{
            where: {id: id},
            returning:true, 
    });

        res.json({
            message: "profile updated successfully", 
            user
        });
        
    } catch (err) {
        console.error("error updating user profile", err);
        res.status(500).json({ error: "error updating the user profile"})
    }
}

exports.changePassword = async (req, res) => {
    try{

        const { id } = req.params;
        const { currentPassword, newPassword, confirmPassword }  = req.body;
        
        // get the user with password field
        const user = await User.findByPk(id, {
            attributes:['id', 'password']
        });
    
        if (!user) return res.status(404).json( {error: "user not found in our system "});
        
        // check th length of the password
        // if (newPassword.length < 8) {
        //     return res.status(400).json({ error: "Password must be at least 8 characters"});
        // }
        // if (newPassword !== confirmPassword){
        //     return res.status(400).json({ error: "Password do not match"})
        // }
        

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({error: "incorrect current password"})
    
        const newPass = await bcrypt.hash(newPassword, 10);
    
        await User.update(
            {password:newPass},
            {where: { id} }
        )

    
        res.json({ message: "password changed successfully"})
    }catch (err) {
        res.status(500).json({error: "password change error"});
        console.error("password change error", err);
    }
    
}