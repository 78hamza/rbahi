const { where } = require('sequelize');
const User = require('../models/User');


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

