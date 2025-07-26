import React, { useState } from 'react';

const Navbar = ({ currentUser, onLogout, darkMode, toggleTheme, currentPage, setCurrentPage }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New Announcement', message: 'Exam schedule updated', time: '2 min ago', unread: true },
    { id: 2, title: 'Lost Item Found', message: 'Your lost wallet has been found', time: '1 hour ago', unread: true },
    { id: 3, title: 'Complaint Update', message: 'Your hostel complaint is being processed', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Navigation items for general users
  const navItems = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'announcements', name: 'Announcements' },
    { id: 'lost-found', name: 'Lost & Found' },
    { id: 'timetable', name: 'Timetable' },
    { id: 'complaints', name: 'Complaints' },
    { id: 'bookings', name: 'Bookings' },
    { id: 'campus-map', name: 'Campus Map' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">CU</span>
            </div>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900 dark:text-white">
              Campus Utilities
            </span>
          </div>

          {/* Right side - Navigation buttons and action buttons */}
          <div className="flex items-center space-x-3">
            {/* Navigation buttons moved to far right */}
            <ul className="flex space-x-2 overflow-x-auto list-none">
              {navItems.map((item) => (
                <li key={item.id} className="list-none">
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 py-6 px-10 rounded-lg transition-colors ${
                      currentPage === item.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Theme toggle with emoji */}
            <button
              onClick={toggleTheme}
              className="p-4 text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Notifications with emoji */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-4 text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 relative transition-colors"
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex p-1 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 hover:bg-gray-700 transition-colors"
                title="Profile Menu"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${currentUser?.name}&background=3b82f6&color=fff`}
                  alt="User avatar"
                />
              </button>

              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-900 dark:text-white">{currentUser?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{currentUser?.email}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      currentUser?.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {currentUser?.role}
                    </span>
                  </div>
                  <ul className="py-1 list-none">
                    <li className="list-none">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </button>
                    </li>
                    <li className="list-none">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Settings
                      </button>
                    </li>
                    <li className="list-none">
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
