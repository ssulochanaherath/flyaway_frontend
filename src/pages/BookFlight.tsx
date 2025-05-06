import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, PlaneTakeoff, PlaneLanding, User } from "lucide-react";

const airports = ["New York (JFK)", "London (LHR)", "Dubai (DXB)", "Tokyo (HND)", "Paris (CDG)"];

const BookFlightPage: React.FC = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);

    const handleBooking = () => {
        if (!from || !to || !date) {
            alert("Please fill out all fields");
            return;
        }
        alert(`Flight booked from ${from} to ${to} on ${date} for ${passengers} passenger(s)!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white px-4 py-20 flex items-center justify-center">
            <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-2xl w-full space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900">
                    ✈️ Book Your Flight
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center gap-1">
                            <PlaneTakeoff className="w-4 h-4" /> From
                        </label>
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select origin</option>
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>
                                    {airport}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* To */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center gap-1">
                            <PlaneLanding className="w-4 h-4" /> To
                        </label>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select destination</option>
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>
                                    {airport}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Passengers */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 flex items-center gap-1">
                            <User className="w-4 h-4" /> Passengers
                        </label>
                        <input
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            min={1}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Submit */}
                <motion.button
                    onClick={handleBooking}
                    whileTap={{ scale: 0.96 }}
                    className="w-full mt-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg"
                >
                    Confirm Booking
                </motion.button>
            </motion.div>
        </div>
    );
};

export default BookFlightPage;
