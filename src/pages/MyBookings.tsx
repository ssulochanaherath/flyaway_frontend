import React from "react";

interface Booking {
    id: number;
    flightNumber: string;
    airline: string;
    date: string;
    from: string;
    to: string;
    seats: number[];
    price: string;
}

const sampleBookings: Booking[] = [
    {
        id: 1,
        flightNumber: "FX101",
        airline: "FlyAway Express",
        date: "2025-06-05",
        from: "New York (JFK)",
        to: "London (LHR)",
        seats: [5, 6],
        price: "$450"
    },
    {
        id: 2,
        flightNumber: "SK225",
        airline: "SkyJet",
        date: "2025-07-10",
        from: "Tokyo (HND)",
        to: "Los Angeles (LAX)",
        seats: [14, 15, 16],
        price: "$430"
    }
];

const MyBookings: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat bg-center px-6 py-10 font-sans"
            style={{ backgroundImage: `url('/flight-bg.jpg')` }}
        >
            <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-3xl max-w-5xl mx-auto p-10">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-10">
                    🧳 My Bookings
                </h1>

                {sampleBookings.length === 0 ? (
                    <p className="text-center text-gray-600">You have no bookings yet.</p>
                ) : (
                    <div className="space-y-6">
                        {sampleBookings.map(booking => (
                            <div
                                key={booking.id}
                                className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
                            >
                                <div className="mb-4 md:mb-0">
                                    <h2 className="text-lg font-semibold text-blue-700">
                                        {booking.airline} • {booking.flightNumber}
                                    </h2>
                                    <p className="text-sm text-gray-700 mt-1">
                                        {booking.from} → {booking.to}
                                    </p>
                                    <p className="text-sm text-gray-700">Date: {booking.date}</p>
                                    <p className="text-sm text-gray-700">Seats: {booking.seats.join(", ")}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-800">{booking.price}</p>
                                    <button className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
