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
    const [fromCountry, setFromCountry] = useState<string>("");
    const [toCountry, setToCountry] = useState<string>("");
    const [fromAirports, setFromAirports] = useState<string[]>([]);
    const [toAirports, setToAirports] = useState<string[]>([]);
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
        setFromAirports(fromCountry ? countryAirports[fromCountry] : []);
    }, [fromCountry]);

    useEffect(() => {
        setToAirports(toCountry ? countryAirports[toCountry] : []);
    }, [toCountry]);

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
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-8 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-10 text-center text-blue-800">✈️ Flight Booker</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-semibold">From Country</label>
                            <select
                                value={fromCountry}
                                onChange={(e) => setFromCountry(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">Select</option>
                                {Object.keys(countryAirports).map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">From Airport</label>
                            <select
                                value={fromAirport}
                                onChange={(e) => setFromAirport(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">Select</option>
                                {fromAirports.map((airport) => (
                                    <option key={airport} value={airport}>{airport}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">To Country</label>
                            <select
                                value={toCountry}
                                onChange={(e) => setToCountry(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">Select</option>
                                {Object.keys(countryAirports).map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">To Airport</label>
                            <select
                                value={toAirport}
                                onChange={(e) => setToAirport(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">Select</option>
                                {toAirports.map((airport) => (
                                    <option key={airport} value={airport}>{airport}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Passengers</label>
                            <input
                                type="number"
                                min={1}
                                value={passengers}
                                onChange={(e) => setPassengers(parseInt(e.target.value))}
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition w-full md:w-auto"
                    >
                        🔍 Search Flights
                    </button>
                </form>

                {flights.length > 0 && (
                    <div className="mt-10 space-y-5">
                        <h2 className="text-2xl font-bold text-blue-700">Available Flights</h2>
                        {flights.map((flight) => (
                            <div
                                key={flight.id}
                                className="p-5 bg-white rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
                            >
                                <div>
                                    <p className="text-lg font-bold">{flight.airline}</p>
                                    <p className="text-sm text-gray-600">{flight.flightNumber} • {flight.time} • {flight.duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-700 font-semibold text-lg">{flight.price}</p>
                                    <button
                                        onClick={() => setSelectedFlight(flight.id)}
                                        className="text-sm text-blue-600 underline hover:text-blue-800 mt-1"
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedFlight && (
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-4 text-blue-700">🎟️ Select Your Seats</h2>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
                            {allSeats.map((seat) => (
                                <button
                                    key={seat}
                                    disabled={takenSeats.includes(seat)}
                                    onClick={() => handleSeatSelect(seat)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                                        takenSeats.includes(seat)
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : selectedSeats.includes(seat)
                                                ? "bg-blue-600 text-white"
                                                : "bg-green-400 hover:bg-green-500"
                                    }`}
                                >
                                    {seat}
                                </button>
                            ))}
                        </div>
                        {selectedSeats.length > 0 && (
                            <div className="mt-6 text-center">
                                <p className="font-medium text-lg">
                                    Selected Seats: <span className="text-blue-700">{selectedSeats.join(", ")}</span>
                                </p>
                                <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
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
