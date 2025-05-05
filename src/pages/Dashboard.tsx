import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import planeImg from "../assets/images/plane.png";

const Dashboard: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [scrollY, setScrollY] = useState(0);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const planeTranslate = Math.min(scrollY * 0.7, 500);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white relative overflow-x-hidden text-gray-800">
            {/* Background plane */}
            <img
                src={planeImg}
                alt="Plane"
                className="fixed left-1/2 top-[550px] w-[1000px] z-0 transform -translate-x-1/2"
                style={{
                    transform: `translate(-50%, calc(-50% - ${planeTranslate}px)) scale(${1 + scrollY * 0.0005})`,
                    transition: "transform 0.1s ease-out",
                }}
            />

            {/* Content */}
            <div className="relative z-10 pt-24 px-6 max-w-5xl mx-auto text-center space-y-12">
                <h1 className="text-5xl font-bold">Welcome Aboard, {auth.name} ✈️</h1>
                <p className="text-lg text-gray-700">Your personalized FlyAway Dashboard.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-2">Book a Flight</h2>
                        <p>Plan your next trip with ease and style.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-2">My Bookings</h2>
                        <p>Check and manage your recent trips.</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-16 px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition"
                >
                    Logout
                </button>
            </div>

            {/* Spacer for scroll */}
            <div className="h-[150vh]" />
        </div>
    );
};

export default Dashboard;
