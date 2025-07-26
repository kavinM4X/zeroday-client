import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import components
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Announcements from './components/Announcements/Announcements';
import LostFound from './components/LostFound/LostFound';
import Timetable from './components/Timetable/Timetable';
import Complaints from './components/Complaints/Complaints';
import Bookings from './components/Bookings/Bookings';
import Login from './components/Auth/Login';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Chatbot from './components/Chatbot/Chatbot';
import CampusMap from './components/CampusMap/CampusMap';
import ToastContainer from './components/Notifications/Toast';

// Import CreateComplaintModal from Complaints component
import { CreateComplaintModal } from './components/Complaints/Complaints';

// Mock authentication context
const AuthContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  // Initialize app
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check for saved user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Check for reset password route
    if (window.location.pathname === '/reset-password') {
      setCurrentPage('reset-password');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle login
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
    localStorage.removeItem('currentUser');
  };

  // Handle complaint creation
  const createComplaint = async (complaintData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/complaints', complaintData, {
        headers: {
          'Authorization': `Bearer ${currentUser?.token}`,
          'Content-Type': 'application/json'
        }
      });
      setShowComplaintModal(false);
      // Show success message or redirect to complaints page
      setCurrentPage('complaints');
      return response.data;
    } catch (err) {
      console.error('Error creating complaint:', err);
      throw new Error(err.response?.data?.error || 'Failed to create complaint');
    }
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'announcements':
        return <Announcements />;
      case 'lost-found':
        return <LostFound />;
      case 'timetable':
        return <Timetable />;
      case 'complaints':
        return <Complaints />;
      case 'bookings':
        return <Bookings />;
      case 'campus-map':
        return <CampusMap />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings darkMode={darkMode} toggleTheme={toggleTheme} />;
      case 'reset-password':
        return <ResetPassword />;
      default:
        return <Dashboard />;
    }
  };

  // If not logged in, show login page (unless it's reset password)
  if (!currentUser && currentPage !== 'reset-password') {
    return (
      <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <Login onLogin={handleLogin} darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
      </AuthContext.Provider>
    );
  }

  // Handle reset password page (accessible without login)
  if (currentPage === 'reset-password') {
    return (
      <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <ResetPassword />
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        {/* Navigation */}
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 pt-24">
          <div className="p-6">
            {renderCurrentPage()}
          </div>
        </main>

        {/* Floating Action Buttons */}
        {/* Raise Complaint Button */}
        <button
          onClick={() => setShowComplaintModal(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          title="Raise Complaint"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </button>

        {/* Floating Chatbot Button */}
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce-in"
          style={{ zIndex: 9999 }}
          title="Chat with CampusBot"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>

        {/* Chatbot */}
        <Chatbot
          isOpen={chatbotOpen}
          onClose={() => setChatbotOpen(false)}
        />

        {/* Global Complaint Modal */}
        <CreateComplaintModal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
          onSubmit={createComplaint}
        />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default App;
