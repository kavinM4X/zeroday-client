import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminComplaints from './AdminComplaints';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,247', change: '+12%', color: 'bg-blue-500' },
    { title: 'Active Complaints', value: '23', change: '-8%', color: 'bg-red-500' },
    { title: 'Announcements', value: '156', change: '+5%', color: 'bg-green-500' },
    { title: 'Lost & Found Items', value: '89', change: '+15%', color: 'bg-yellow-500' }
  ];

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium">New user registered: john.doe@campus.edu</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-sm">📋</span>
            </div>
            <div>
              <p className="text-sm font-medium">New complaint filed: Hostel Block A - Plumbing</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-sm">📢</span>
            </div>
            <div>
              <p className="text-sm font-medium">Announcement published: Exam Schedule Update</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@campus.edu', role: 'student', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@campus.edu', role: 'student', status: 'active' },
    { id: 3, name: 'Admin User', email: 'admin@campus.edu', role: 'admin', status: 'active' },
    { id: 4, name: 'Bob Wilson', email: 'bob.wilson@campus.edu', role: 'student', status: 'inactive' }
  ]);

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Add New User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Analytics = () => {
  const analyticsData = [
    { metric: 'Daily Active Users', value: '342', trend: '+12%' },
    { metric: 'Complaints Resolved', value: '89%', trend: '+5%' },
    { metric: 'System Uptime', value: '99.9%', trend: '0%' },
    { metric: 'User Satisfaction', value: '4.8/5', trend: '+0.2' }
  ];

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">System Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{item.metric}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">User Activity</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Complaint Categories</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-500 dark:text-gray-400">Pie chart would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const renderCurrent = () => {
    switch (currentPage) {
      case 'user-management':
        return <UserManagement />;
      case 'complaints':
        return <AdminComplaints />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <AdminNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="transition-colors">
        {renderCurrent()}
      </div>
    </div>
  );
}
