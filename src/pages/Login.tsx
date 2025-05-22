import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            setIsSubmitting(true);
            setTimeout(() => navigate("/dashboard"), 800); // Delay to complete animation
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#dbeafe] to-[#3b82f6] flex justify-center items-center p-4">
            <AnimatePresence>
                {!isSubmitting && (
                    <motion.div
                        key="loginForm"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 space-y-6 transition-all"
                    >
                        <h2 className="text-4xl font-bold text-center text-white">Welcome Back</h2>
                        <p className="text-sm text-black text-center">Login to your FlyAway account</p>
                        <form onSubmit={handleLogin} className="space-y-5">
                            <input
                                type="email"
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-white text-black-700 font-semibold rounded-xl hover:bg-blue-100 transition duration-300 shadow-md"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-black text-sm text-center mt-4">
                            Don’t have an account?{" "}
                            <a href="/signup" className="underline hover:text-blue-200">
                                Sign up
                            </a>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
