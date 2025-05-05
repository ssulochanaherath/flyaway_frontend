import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    if (!auth.isAuthenticated) {
        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center font-sans">
            <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/40">
                <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow">Welcome, {auth.name}</h1>
                <p className="text-white text-center">
                    You're now logged in to your dashboard.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
