import React, { useState, useEffect } from "react";

const countryAirports: Record<string, string[]> = {
    USA: ["New York (JFK)", "Los Angeles (LAX)", "Chicago (ORD)"],
    UK: ["London (LHR)", "Manchester (MAN)"],
    Japan: ["Tokyo (HND)", "Osaka (KIX)"]
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
    const [selectedCountry, setSelectedCountry] = useState("");
    const [airports, setAirports] = useState<string[]>([]);
    const [fromAirport, setFromAirport] = useState("");
    const [toAirport, setToAirport] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [flights, setFlights] = useState<typeof fakeFlights>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalStep, setModalStep] = useState<"flights" | "seats" | "confirm">("flights");
    const [selectedFlight, setSelectedFlight] = useState<typeof fakeFlights[0] | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const allSeats = Array.from({ length: 30 }, (_, i) => i + 1);
    const takenSeats = [3, 8, 12, 18, 25];

    useEffect(() => {
        setAirports(selectedCountry ? countryAirports[selectedCountry] : []);
        setFromAirport("");
        setToAirport("");
    }, [selectedCountry]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFlights(fakeFlights);
        setIsModalOpen(true);
        setModalStep("flights");
        setSelectedFlight(null);
        setSelectedSeats([]);
    };

    const handleSeatToggle = (seat: number) => {
        if (!takenSeats.includes(seat)) {
            setSelectedSeats(prev =>
                prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
            );
        }
    };

    const handleConfirm = () => {
        setModalStep("confirm");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalStep("flights");
        setSelectedFlight(null);
        setSelectedSeats([]);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat px-6 py-10 font-sans text-gray-800"
            style={{ backgroundImage: `url('/flight-bg.jpg')` }} // 🔄 Use your own image path or URL
        >
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl mx-auto p-10">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-12">
                    ✈️ Book Your Flight
                </h1>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-medium">Country</label>
                            <select
                                value={selectedCountry}
                                onChange={e => setSelectedCountry(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                                required
                            >
                                <option value="">Select Country</option>
                                {Object.keys(countryAirports).map(c => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">From Airport</label>
                            <select
                                value={fromAirport}
                                onChange={e => setFromAirport(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                                required
                            >
                                <option value="">From</option>
                                {airports.map(a => (
                                    <option key={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">To Airport</label>
                            <select
                                value={toAirport}
                                onChange={e => setToAirport(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                                required
                            >
                                <option value="">To</option>
                                {airports.map(a => (
                                    <option key={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Passengers</label>
                            <input
                                type="number"
                                value={passengers}
                                min={1}
                                onChange={e => setPassengers(parseInt(e.target.value))}
                                className="w-full p-3 border rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                        🔍 Search Flights
                    </button>
                </form>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative shadow-xl">
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 text-2xl">
                                &times;
                            </button>

                            {modalStep === "flights" && (
                                <>
                                    <h2 className="text-xl font-bold text-center mb-4">🛫 Select a Flight</h2>
                                    <div className="space-y-4">
                                        {flights.map(flight => (
                                            <div
                                                key={flight.id}
                                                className="p-4 bg-gray-100 rounded-xl flex justify-between items-center hover:shadow"
                                            >
                                                <div>
                                                    <h3 className="font-semibold text-blue-700">{flight.airline}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {flight.flightNumber} • {flight.time} • {flight.duration}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-blue-700">{flight.price}</p>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFlight(flight);
                                                            setModalStep("seats");
                                                        }}
                                                        className="text-sm mt-1 text-blue-600 hover:underline"
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {modalStep === "seats" && selectedFlight && (
                                <>
                                    <h2 className="text-xl font-bold text-center mb-4">🪑 Choose Your Seats</h2>
                                    <div className="grid grid-cols-6 gap-3 mb-6">
                                        {allSeats.map(seat => {
                                            const taken = takenSeats.includes(seat);
                                            const selected = selectedSeats.includes(seat);
                                            return (
                                                <button
                                                    key={seat}
                                                    onClick={() => handleSeatToggle(seat)}
                                                    disabled={taken}
                                                    className={`w-10 h-10 rounded-md text-sm font-medium
                                                        ${taken
                                                        ? "bg-gray-300 cursor-not-allowed"
                                                        : selected
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-green-500 hover:bg-green-600 text-white"}`}
                                                >
                                                    {seat}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={handleConfirm}
                                        disabled={selectedSeats.length === 0}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
                                    >
                                        ✅ Confirm Seats
                                    </button>
                                </>
                            )}

                            {modalStep === "confirm" && selectedFlight && (
                                <>
                                    <h2 className="text-xl font-bold text-center mb-4">🎉 Booking Confirmed!</h2>
                                    <div className="space-y-3 text-center text-gray-700">
                                        <p>Flight: <strong>{selectedFlight.flightNumber}</strong> by <strong>{selectedFlight.airline}</strong></p>
                                        <p>Date: <strong>{date}</strong></p>
                                        <p>From: <strong>{fromAirport}</strong> → To: <strong>{toAirport}</strong></p>
                                        <p>Seats: <strong>{selectedSeats.join(", ")}</strong></p>
                                        <button
                                            onClick={closeModal}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightBooking;
