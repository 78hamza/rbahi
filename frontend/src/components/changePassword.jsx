import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const handleChangePassword = async (e) => {
    const userId = localStorage.getItem('userId')
    e.preventDefault();

    if (newPass !== confirmPass) {
        alert("password do not match");
    }

    try{
        await axios.put(`http://localhost:7070/api/user/profile/change-password/${userId}`,
            {
                currentPassword : current,
                newPassword : newPass
            }
        );
        alert("password chenged successfully");
    }catch (err) {
        alert('Error: '+ err.response.data.error);
        console.log("error: " + err);
    }

    return (
        <form onSubmit={handleChangePassword}>
            <input type="password" placeholder="Current Password" value={current} onChange={handleChangePassword} />
            <input type="password" placeholder="New Password" value={newPass} onChange={handleChangePassword} />
            <input type="password" placeholder="Confirm New Password" value={confirm} onChange={handleChangePassword} />
            <button type="submit">Change Password</button>
        </form>

    )
} 