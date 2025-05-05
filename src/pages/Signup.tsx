import React, { useState } from "react";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Sign up:", { name, email, password });
        // Handle storing user or redirect to login
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center font-sans">
            <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/40">
                <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow">Create Account</h1>
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="text-white font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 border border-white/50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/80"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 border border-white/50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/80"
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-xl"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-white mt-5 text-center text-sm">
                    Already have an account?{" "}
                    <a href="/" className="underline hover:text-blue-100">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
