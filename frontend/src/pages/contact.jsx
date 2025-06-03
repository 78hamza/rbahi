import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TbSettingsCheck } from 'react-icons/tb';


export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message : ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setErrorMessage("")
        setSuccessMessage("");

        try {
            const response = await 
        }catch {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        ""
    );
}   