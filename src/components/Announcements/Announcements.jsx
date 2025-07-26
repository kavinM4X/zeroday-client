import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';

const Announcements = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      content: 'The mid-term examination schedule for all departments has been released. Please check your respective department notice boards for detailed timings.',
      category: 'academic',
      priority: 'high',
      author: 'Academic Office',
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z',
      views: 245,
      likes: 12,
      pinned: true
    },
    {
      id: 2,
      title: 'Cultural Fest 2024 - Registration Open',
      content: 'Annual cultural fest registration is now open! Participate in various events including dance, music, drama, and art competitions. Registration deadline: February 15th.',
      category: 'events',
      priority: 'medium',
      author: 'Student Affairs',
      createdAt: '2024-01-19T14:30:00Z',
      updatedAt: '2024-01-19T14:30:00Z',
      views: 189,
      likes: 28,
      pinned: false
    },
    {
      id: 3,
      title: 'Hostel WiFi Maintenance',
      content: 'WiFi services in all hostels will be temporarily unavailable on January 25th from 2:00 AM to 6:00 AM for routine maintenance.',
      category: 'maintenance',
      priority: 'medium',
      author: 'IT Department',
      createdAt: '2024-01-18T09:15:00Z',
      updatedAt: '2024-01-18T09:15:00Z',
      views: 156,
      likes: 5,
      pinned: false
    },
    {
      id: 4,
      title: 'Library Extended Hours',
      content: 'The central library will now remain open until 11:00 PM on weekdays to accommodate students during examination period.',
      category: 'facilities',
      priority: 'low',
      author: 'Library Administration',
      createdAt: '2024-01-17T16:45:00Z',
      updatedAt: '2024-01-17T16:45:00Z',
      views: 98,
      likes: 15,
      pinned: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'All', icon: '📋', color: 'bg-gray-500' },
    { id: 'academic', name: 'Academic', icon: '🎓', color: 'bg-blue-500' },
    { id: 'events', name: 'Events', icon: '🎉', color: 'bg-purple-500' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧', color: 'bg-yellow-500' },
    { id: 'facilities', name: 'Facilities', icon: '🏢', color: 'bg-green-500' },
    { id: 'emergency', name: 'Emergency', icon: '🚨', color: 'bg-red-500' }
  ];

  const priorities = {
    high: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'High Priority' },
    medium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Medium Priority' },
    low: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Low Priority' }
  };

  // Filter and sort announcements
  const filteredAnnouncements = announcements
    .filter(announcement => {
      const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'popular':
          return b.views - a.views;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  // Separate pinned announcements
  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const AnnouncementCard = ({ announcement, isPinned = false }) => {
    const category = categories.find(cat => cat.id === announcement.category);
    
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all ${isPinned ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
        {isPinned && (
          <div className="flex items-center mb-3">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              📌 Pinned
            </span>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${category?.color} rounded-lg flex items-center justify-center text-white text-lg`}>
              {category?.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">by {announcement.author}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(announcement.createdAt)}</span>
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorities[announcement.priority].color}`}>
            {priorities[announcement.priority].label}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{announcement.content}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span className="text-sm">{announcement.likes}</span>
            </button>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span className="text-sm">{announcement.views} views</span>
            </div>
          </div>
          
          {currentUser?.role === 'admin' && (
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay updated with the latest campus news and events</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Create Announcement</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              📌 Pinned Announcements
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} isPinned={true} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        {regularAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {regularAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No announcements found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new announcements'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
