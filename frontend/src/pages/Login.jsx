import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/ContextProvider';
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${process.env.API_URL}/api/auth/login`, {
                email,
                password
            });
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
        }
        catch(error){
                    const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
                    toast.error(errorMessage);
                }
    }


    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border shadow p-6 w-80 bg-white">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email"  onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-3 border" placeholder=" Enter Email" required />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-3 border" placeholder="*******" required />

                </div>

                <div className="mb-4">
                <button type="submit" className="w-full bg-teal-600 text-white py-2">Login</button>
                <p className="text-center">Don't Have Account? <Link to="/signup">Register</Link></p>
                </div>

                
                

            </form>
        </div>

        </div>
    )
    
    }

    export default Login;