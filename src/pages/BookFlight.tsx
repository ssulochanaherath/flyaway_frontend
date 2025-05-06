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
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-6 text-gray-800">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">Book Your Flight</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="p-3 border rounded"
                            required
                        >
                            <option value="">Select Country</option>
                            {Object.keys(countryAirports).map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <select
                            value={fromAirport}
                            onChange={(e) => setFromAirport(e.target.value)}
                            className="p-3 border rounded"
                            required
                        >
                            <option value="">From Airport</option>
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>{airport}</option>
                            ))}
                        </select>
                        <select
                            value={toAirport}
                            onChange={(e) => setToAirport(e.target.value)}
                            className="p-3 border rounded"
                            required
                        >
                            <option value="">To Airport</option>
                            {airports.map((airport) => (
                                <option key={airport} value={airport}>{airport}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-3 border rounded"
                            required
                        />
                        <input
                            type="number"
                            min={1}
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                            className="p-3 border rounded"
                            placeholder="Passengers"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Search Flights
                    </button>
                </form>

                {flights.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-2xl font-semibold">Available Flights</h2>
                        {flights.map((flight) => (
                            <div
                                key={flight.id}
                                className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold text-lg">{flight.airline}</p>
                                    <p className="text-sm">{flight.flightNumber} • {flight.time} • {flight.duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-600 font-bold">{flight.price}</p>
                                    <button
                                        onClick={() => setSelectedFlight(flight.id)}
                                        className="text-blue-700 underline text-sm mt-1"
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedFlight && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
                        <div className="grid grid-cols-6 gap-2">
                            {allSeats.map((seat) => (
                                <button
                                    key={seat}
                                    disabled={takenSeats.includes(seat)}
                                    onClick={() => handleSeatSelect(seat)}
                                    className={`w-10 h-10 rounded ${
                                        takenSeats.includes(seat)
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : selectedSeats.includes(seat)
                                                ? "bg-blue-500 text-white"
                                                : "bg-green-400 hover:bg-green-500"
                                    }`}
                                >
                                    {seat}
                                </button>
                            ))}
                        </div>
                        {selectedSeats.length > 0 && (
                            <div className="mt-4">
                                <p className="font-medium">Selected Seats: {selectedSeats.join(", ")}</p>
                                <button className="mt-2 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                                    Confirm Booking
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
