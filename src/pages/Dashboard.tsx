import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import planeImg from "../assets/images/plane.png";
import { motion } from "framer-motion";
import { LogOut, PlaneTakeoff, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            dispatch(logout());
            window.location.href = "/";
        }
    };

    const handleBookFlight = () => {
        navigate("/book-flight");
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const planeTranslate = Math.min(scrollY * 0.6, 500);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-900 via-white to-black relative text-gray-800 overflow-x-hidden font-sans">
            {/* Plane Animation */}
            <img
                src={planeImg}
                alt="Plane"
                className="fixed left-1/2 top-[550px] w-[1000px] z-0 opacity-90"
                style={{
                    transform: `translate(-50%, calc(-50% - ${planeTranslate}px)) scale(${1 + scrollY * 0.0005})`,
                    transition: "transform 0.2s ease-out",
                }}
            />

            {/* Content */}
            <div className="relative z-10 pt-24 px-6 max-w-6xl mx-auto text-center space-y-14">
                <motion.h1
                    className="text-5xl font-bold tracking-tight text-gray-900"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome Aboard, {auth.name} ✈️
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Your personalized FlyAway Dashboard. Plan, manage, and fly seamlessly.
                </motion.p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-4">
                    <motion.div
                        onClick={handleBookFlight}
                        className="cursor-pointer bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition group"
                        whileHover={{ scale: 1.03 }}
                    >
                        <PlaneTakeoff className="text-blue-500 w-8 h-8 mb-3 mx-auto" />
                        <h2 className="text-2xl font-semibold mb-2">Book a Flight</h2>
                        <p className="text-gray-700">Plan your next trip with ease and excitement.</p>
                    </motion.div>

                    <motion.div
                        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition group"
                        whileHover={{ scale: 1.03 }}
                    >
                        <CalendarCheck className="text-green-500 w-8 h-8 mb-3 mx-auto" />
                        <h2 className="text-2xl font-semibold mb-2">My Bookings</h2>
                        <p className="text-gray-700">Review and manage all your previous and upcoming trips.</p>
                    </motion.div>
                </div>

                {/* Logout Button */}
                <motion.button
                    onClick={handleLogout}
                    whileTap={{ scale: 0.95 }}
                    className="mt-20 inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all shadow-md"
                >
                    <LogOut size={20} />
                    Logout
                </motion.button>
            </div>

            {/* Spacer for Scroll */}
            <div className="h-[130vh]" />
        </div>
    );
};

export default Dashboard;
