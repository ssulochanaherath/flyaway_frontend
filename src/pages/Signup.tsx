import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [exit, setExit] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        localStorage.setItem("flyaway-user", JSON.stringify({ name, email, password }));
        alert("Signup successful! You can now log in.");

        // Trigger exit animation
        setExit(true);

        // Redirect after animation
        setTimeout(() => {
            window.location.href = "/";
        }, 600); // match animation duration
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#dbeafe] to-[#3b82f6] flex justify-center items-center p-4">
            <AnimatePresence>
                {!exit && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 space-y-6 transition-all"
                    >
                        <h2 className="text-4xl font-bold text-center text-white">Create Account</h2>
                        <p className="text-sm text-white text-center">Join FlyAway today</p>
                        <form onSubmit={handleSignup} className="space-y-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white/80 border border-white/40 focus:ring-2 focus:ring-white/60 outline-none"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition duration-300 shadow-md"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="text-white text-sm text-center mt-4">
                            Already have an account?{" "}
                            <a href="/" className="underline hover:text-blue-200">
                                Log in
                            </a>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Signup;
