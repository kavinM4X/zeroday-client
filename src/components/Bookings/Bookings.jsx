import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';

const Bookings = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('my-bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock bookings data for now
  const mockBookings = [
    {
      id: 'booking-1',
      serviceType: 'Study Room',
      serviceName: 'Library Study Room A-101',
      date: '2025-07-28',
      time: '14:00',
      duration: '2 hours',
      status: 'confirmed',
      bookedBy: currentUser?.name || 'John Doe',
      bookingDate: '2025-07-26',
      notes: 'Group study session for final exams'
    },
    {
      id: 'booking-2',
      serviceType: 'Lab Equipment',
      serviceName: 'Computer Lab - Station 15',
      date: '2025-07-29',
      time: '10:00',
      duration: '3 hours',
      status: 'pending',
      bookedBy: currentUser?.name || 'John Doe',
      bookingDate: '2025-07-26',
      notes: 'Programming assignment work'
    },
    {
      id: 'booking-3',
      serviceType: 'Sports Facility',
      serviceName: 'Basketball Court 1',
      date: '2025-07-30',
      time: '16:00',
      duration: '1 hour',
      status: 'confirmed',
      bookedBy: currentUser?.name || 'John Doe',
      bookingDate: '2025-07-25',
      notes: 'Basketball practice with team'
    }
  ];

  useEffect(() => {
    // Simulate loading bookings
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Study Room':
        return '📚';
      case 'Lab Equipment':
        return '💻';
      case 'Sports Facility':
        return '⚽';
      case 'Meeting Room':
        return '🏢';
      default:
        return '📅';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
            {getServiceIcon(booking.serviceType)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{booking.serviceName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{booking.serviceType}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatDate(booking.date)} at {booking.time}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.duration}</p>
        </div>
      </div>

      {booking.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{booking.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Booked on: {formatDate(booking.bookingDate)}
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            View Details
          </button>
          {booking.status === 'confirmed' && (
            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6 mt-2">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your facility and service bookings</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>New Booking</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-bookings'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('available-services')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available-services'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Available Services
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'my-bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Start by booking a facility or service</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Make Your First Booking
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </div>
      )}

      {activeTab === 'available-services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Available Services */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Study Rooms</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Book quiet study spaces in the library</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Book Now
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Computer Labs</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Reserve computer lab stations</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Book Now
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sports Facilities</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Book courts and sports equipment</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
