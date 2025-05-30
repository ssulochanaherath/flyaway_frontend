import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BookFlight from "./pages/BookFlight.tsx";
import MyBookings from "./pages/MyBookings.tsx";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/book-flight" element={<BookFlight />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
