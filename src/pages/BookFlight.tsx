import React, { useState, useEffect } from "react";

const countryAirports: Record<string, string[]> = {
    USA: ["New York (JFK)", "Los Angeles (LAX)", "Chicago (ORD)"],
    UK: ["London (LHR)", "Manchester (MAN)"],
    Japan: ["Tokyo (HND)", "Osaka (KIX)"],
    France: ["Paris (CDG)", "Nice (NCE)"],
    UAE: ["Dubai (DXB)", "Abu Dhabi (AUH)"]
};

const fakeFlights = [
    {
        id: 1,
        flightNumber: "FX101",
        airline: "FlyAway Express",
        time: "10:00 AM",
        duration: "6h",
        price: "$450"
    },
    {
        id: 2,
        flightNumber: "SK225",
        airline: "SkyJet",
        time: "2:00 PM",
        duration: "7h",
        price: "$430"
    }
];

const FlightBooking: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [airports, setAirports] = useState<string[]>([]);
    const [fromAirport, setFromAirport] = useState<string>("");
    const [toAirport, setToAirport] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [passengers, setPassengers] = useState<number>(1);
    const [flights, setFlights] = useState<typeof fakeFlights>([]);
    const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const allSeats = Array.from({ length: 30 }, (_, i) => i + 1);
    const takenSeats = [2, 7, 14, 23];

    useEffect(() => {
        setAirports(selectedCountry ? countryAirports[selectedCountry] : []);
    }, [selectedCountry]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFlights(fakeFlights);
        setSelectedFlight(null);
        setSelectedSeats([]);
    };

    const handleSeatSelect = (seat: number) => {
        if (!takenSeats.includes(seat) && !selectedSeats.includes(seat)) {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10">✈️ Book Your Flight</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-lg p-8 space-y-6 transition-all"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Select Country</label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">Select Country</option>
                                {Object.keys(countryAirports).map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">From Airport</label>
                            <select
                                value={fromAirport}
                                onChange={(e) => setFromAirport(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">From Airport</option>
                                {airports.map((airport) => (
                                    <option key={airport} value={airport}>
                                        {airport}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">To Airport</label>
                            <select
                                value={toAirport}
                                onChange={(e) => setToAirport(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="">To Airport</option>
                                {airports.map((airport) => (
                                    <option key={airport} value={airport}>
                                        {airport}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Travel Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Passengers</label>
                            <input
                                type="number"
                                min={1}
                                value={passengers}
                                onChange={(e) => setPassengers(parseInt(e.target.value))}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        🔍 Search Flights
                    </button>
                </form>

                {flights.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">🛫 Available Flights</h2>
                        <div className="space-y-4">
                            {flights.map((flight) => (
                                <div
                                    key={flight.id}
                                    className="bg-white p-5 rounded-xl shadow flex justify-between items-center hover:shadow-md transition-all"
                                >
                                    <div>
                                        <p className="font-bold text-lg text-blue-700">{flight.airline}</p>
                                        <p className="text-gray-500">
                                            {flight.flightNumber} • {flight.time} • {flight.duration}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-blue-600 font-bold text-lg">{flight.price}</p>
                                        <button
                                            onClick={() => setSelectedFlight(flight.id)}
                                            className="mt-1 text-sm text-blue-700 hover:underline"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedFlight && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">🪑 Select Your Seats</h2>
                        <div className="grid grid-cols-6 gap-4">
                            {allSeats.map((seat) => (
                                <button
                                    key={seat}
                                    disabled={takenSeats.includes(seat)}
                                    onClick={() => handleSeatSelect(seat)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                        takenSeats.includes(seat)
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : selectedSeats.includes(seat)
                                                ? "bg-blue-600 text-white"
                                                : "bg-green-400 hover:bg-green-500 text-white"
                                    }`}
                                >
                                    {seat}
                                </button>
                            ))}
                        </div>

                        {selectedSeats.length > 0 && (
                            <div className="mt-6 bg-white p-4 rounded-lg shadow">
                                <p className="font-medium text-gray-700 mb-2">
                                    Selected Seats:{" "}
                                    <span className="text-blue-700">{selectedSeats.join(", ")}</span>
                                </p>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                                    ✅ Confirm Booking
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightBooking;
