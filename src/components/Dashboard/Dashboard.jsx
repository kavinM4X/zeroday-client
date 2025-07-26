import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const stats = {
    student: {
      announcements: 12,
      lostItems: 3,
      foundItems: 1,
      complaints: 2,
      upcomingClasses: 4
    },
    admin: {
      totalStudents: 1250,
      activeComplaints: 23,
      pendingAnnouncements: 5,
      lostFoundItems: 18,
      systemHealth: 98
    }
  };

  const recentActivities = [
    { id: 1, type: 'announcement', title: 'New exam schedule released', time: '2 hours ago', icon: '📢' },
    { id: 2, type: 'lost-found', title: 'Lost wallet found in library', time: '4 hours ago', icon: '🔍' },
    { id: 3, type: 'complaint', title: 'Hostel WiFi issue resolved', time: '6 hours ago', icon: '✅' },
    { id: 4, type: 'timetable', title: 'Class schedule updated', time: '1 day ago', icon: '📅' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Mid-term Examinations', date: '2024-02-15', type: 'exam' },
    { id: 2, title: 'Cultural Fest Registration', date: '2024-02-20', type: 'event' },
    { id: 3, title: 'Hostel Maintenance', date: '2024-02-25', type: 'maintenance' },
    { id: 4, title: 'Guest Lecture Series', date: '2024-03-01', type: 'academic' }
  ];

  const quickActions = currentUser?.role === 'admin' ? [
    { id: 1, title: 'Post Announcement', icon: '📢', color: 'bg-blue-500', action: 'announcements' },
    { id: 2, title: 'View Complaints', icon: '📋', color: 'bg-red-500', action: 'complaints' },
    { id: 3, title: 'Manage Users', icon: '👥', color: 'bg-green-500', action: 'user-management' },
    { id: 4, title: 'System Analytics', icon: '📊', color: 'bg-purple-500', action: 'analytics' }
  ] : [
    { id: 1, title: 'View Timetable', icon: '📅', color: 'bg-blue-500', action: 'timetable' },
    { id: 2, title: 'Lost & Found', icon: '🔍', color: 'bg-green-500', action: 'lost-found' },
    { id: 3, title: 'File Complaint', icon: '📝', color: 'bg-red-500', action: 'complaints' },
    { id: 4, title: 'Announcements', icon: '📢', color: 'bg-purple-500', action: 'announcements' }
  ];

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% from last week
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
      <div className="text-2xl">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
      </div>
    </div>
  );

  const EventItem = ({ event }) => {
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > currentTime;
    const daysUntil = Math.ceil((eventDate - currentTime) / (1000 * 60 * 60 * 24));

    return (
      <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {eventDate.toLocaleDateString()} 
            {isUpcoming && daysUntil > 0 && ` (in ${daysUntil} days)`}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          event.type === 'exam' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
          event.type === 'event' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
          event.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        }`}>
          {event.type}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {currentUser?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Time</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentUser?.role === 'admin' ? (
          <>
            <StatCard title="Total Students" value={stats.admin.totalStudents} icon="👥" color="bg-blue-500" trend={5} />
            <StatCard title="Active Complaints" value={stats.admin.activeComplaints} icon="📋" color="bg-red-500" trend={-12} />
            <StatCard title="Pending Announcements" value={stats.admin.pendingAnnouncements} icon="📢" color="bg-yellow-500" trend={8} />
            <StatCard title="Lost & Found Items" value={stats.admin.lostFoundItems} icon="🔍" color="bg-green-500" trend={3} />
          </>
        ) : (
          <>
            <StatCard title="New Announcements" value={stats.student.announcements} icon="📢" color="bg-blue-500" />
            <StatCard title="Lost Items" value={stats.student.lostItems} icon="❌" color="bg-red-500" />
            <StatCard title="Found Items" value={stats.student.foundItems} icon="✅" color="bg-green-500" />
            <StatCard title="Active Complaints" value={stats.student.complaints} icon="📋" color="bg-yellow-500" />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all</button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View calendar</button>
          </div>
          <div className="space-y-1">
            {upcomingEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Weather Widget (Innovative Feature) */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Campus Weather</h3>
            <p className="text-blue-100">Perfect day for outdoor activities!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">☀️</div>
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-blue-100 text-sm">Sunny</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
