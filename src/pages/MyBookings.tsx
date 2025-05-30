import React from "react";

interface Booking {
    id: string;
    flightNumber: string;
    departure: string;
    destination: string;
    date: string;
    time: string;
    status: "Upcoming" | "Completed";
}

const bookings: Booking[] = [
    {
        id: "1",
        flightNumber: "AI202",
        departure: "New York (JFK)",
        destination: "London (LHR)",
        date: "2025-06-15",
        time: "08:30",
        status: "Upcoming",
    },
    {
        id: "2",
        flightNumber: "AI301",
        departure: "Paris (CDG)",
        destination: "Rome (FCO)",
        date: "2025-04-10",
        time: "12:00",
        status: "Completed",
    },
];

const MyBookings: React.FC = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white shadow-md p-4 rounded-lg border"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {booking.departure} → {booking.destination}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {booking.date} | {booking.time}
                                </p>
                                <p className="text-sm">Flight: {booking.flightNumber}</p>
                            </div>
                            <div className="text-right">
                <span
                    className={`text-sm font-medium ${
                        booking.status === "Upcoming"
                            ? "text-blue-600"
                            : "text-gray-500"
                    }`}
                >
                  {booking.status}
                </span>
                                {booking.status === "Upcoming" && (
                                    <div className="mt-2 space-x-2">
                                        <button className="text-blue-500 hover:underline text-sm">
                                            Reschedule
                                        </button>
                                        <button className="text-red-500 hover:underline text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
