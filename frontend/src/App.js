import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import TrainerRoute from './components/common/TrainerRoute';
import Link from 'react-router-dom'; // Mistake in previous edit? No, BookClass is used in Route.
// Wait, I need to import BookClass.
import MemberDashboard from './components/dashboard/member/MemberDashboard';
import BookClass from './components/dashboard/member/BookClass';

// Admin
import AdminLayout from './components/dashboard/admin/AdminLayout';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import ManageMembers from './components/dashboard/admin/ManageMembers';
import PendingRequests from './components/dashboard/admin/PendingRequests';
import ManageClasses from './components/dashboard/admin/ManageClasses';

// Trainer
import TrainerLayout from './components/dashboard/trainer/TrainerLayout';
import TrainerDashboard from './components/dashboard/trainer/TrainerDashboard';
import TrainerBookings from './components/dashboard/trainer/TrainerBookings';
import TrainerClients from './components/dashboard/trainer/TrainerClients';
import TrainerEarnings from './components/dashboard/trainer/TrainerEarnings';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <MemberDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/book-class"
                        element={
                            <PrivateRoute>
                                <BookClass />
                            </PrivateRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminLayout />
                            </AdminRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="classes" element={<ManageClasses />} />
                        <Route path="members" element={<ManageMembers />} />
                        <Route path="requests" element={<PendingRequests />} />
                    </Route>

                    {/* Trainer Routes */}
                    <Route
                        path="/trainer"
                        element={
                            <TrainerRoute>
                                <TrainerLayout />
                            </TrainerRoute>
                        }
                    >
                        <Route index element={<TrainerDashboard />} />
                        <Route path="bookings" element={<TrainerBookings />} />
                        <Route path="clients" element={<TrainerClients />} />
                        <Route path="earnings" element={<TrainerEarnings />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
