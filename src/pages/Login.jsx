import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            setError("Invalid email or password. Please sign up if don't have account.");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/account');
    };

    return (
        <>
            <div className='h-[100vh] max-w-[400px] relative px-5 py-5 mx-auto bg-gray-100'>
                <div className="flex flex-col gap-2">
                    <h2 className='font-bold w-[60%] text-3xl'>
                        Signin to your PopX Account
                    </h2>
                    <p className='w-[75%] text-gray-400 font-semibold text-lg'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className='my-5'>
                        <div className="flex flex-col gap-1 relative">
                            <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Enter email address" 
                                className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1" 
                            />
                        </div>

                        <div className="flex flex-col gap-1 relative my-4 mt-6">
                            <label className="absolute -top-2 left-2 px-1 bg-white text-sm text-[#6C25FF] z-10">
                                Password
                            </label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder="Enter password" 
                                className="w-full p-2.5 border border-[#DCDCDC] rounded text-[#1D2939] text-sm focus:outline-none focus:border-[#6C25FF] mt-1" 
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!email || !password}
                            className={`w-full mt-2 py-3 font-semibold text-white transition rounded-lg ${
                                !email || !password ? "bg-gray-400 cursor-not-allowed" : "bg-[#7B3FF6] hover:bg-[#5b15e8]"
                            }`}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
