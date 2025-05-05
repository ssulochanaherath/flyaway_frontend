// src/pages/Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("flyaway-user");

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            dispatch(login({ email, name: user.name }));
            window.location.href = "/dashboard"; // navigate to dashboard
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center font-sans">
            <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/40">
                <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow">FlyAway ✈️</h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-white font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 border border-white/50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/80"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 border border-white/50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/80"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-xl"
                    >
                        Login
                    </button>
                </form>

                <p className="text-white mt-5 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="underline hover:text-blue-100">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
