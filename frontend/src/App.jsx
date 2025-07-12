import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Facilities from './pages/Facilities';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import useAuthStore from './store/authStore';

function PrivateRoute({ children, adminOnly = false }) {
    const { isAuthenticated, role } = useAuthStore();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (adminOnly && role !== 'admin') return <Navigate to="/" replace />;
    return children;
}

function App() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {isAuthenticated && <Header />}
                {isAuthenticated && <Navbar />}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/facilities" element={<PrivateRoute><Facilities /></PrivateRoute>} />
                        <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
                        <Route path="/analytics" element={<PrivateRoute adminOnly><Analytics /></PrivateRoute>} />
                        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                        <Route 
                            path="/admin-dashboard" 
                            element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} 
                        />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </main>
                {isAuthenticated && <Footer />}
            </div>
        </Router>
    );
}

export default App;