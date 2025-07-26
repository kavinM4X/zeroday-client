import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';

const LostFound = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('lost');

  // Mock data
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Black Leather Wallet',
      description: 'Black leather wallet with student ID and some cash. Lost near the library.',
      category: 'wallet',
      type: 'lost',
      location: 'library',
      dateReported: '2024-01-20T14:30:00Z',
      reportedBy: 'John Doe',
      contact: 'john.doe@campus.edu',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      status: 'active',
      views: 45
    },
    {
      id: 2,
      title: 'iPhone 13 Pro',
      description: 'Blue iPhone 13 Pro with a clear case. Found in the cafeteria.',
      category: 'electronics',
      type: 'found',
      location: 'cafeteria',
      dateReported: '2024-01-19T16:45:00Z',
      reportedBy: 'Jane Smith',
      contact: 'jane.smith@campus.edu',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      status: 'active',
      views: 78
    },
    {
      id: 3,
      title: 'Red Backpack',
      description: 'Red Nike backpack with textbooks and notebooks. Lost in the parking lot.',
      category: 'bag',
      type: 'lost',
      location: 'parking',
      dateReported: '2024-01-18T10:15:00Z',
      reportedBy: 'Mike Johnson',
      contact: 'mike.johnson@campus.edu',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      status: 'claimed',
      views: 32
    },
    {
      id: 4,
      title: 'Silver Watch',
      description: 'Silver Casio watch with metal strap. Found in the gym locker room.',
      category: 'accessories',
      type: 'found',
      location: 'gym',
      dateReported: '2024-01-17T18:20:00Z',
      reportedBy: 'Sarah Wilson',
      contact: 'sarah.wilson@campus.edu',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop',
      status: 'active',
      views: 23
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Items', icon: '📦' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'wallet', name: 'Wallets', icon: '💳' },
    { id: 'bag', name: 'Bags', icon: '🎒' },
    { id: 'accessories', name: 'Accessories', icon: '⌚' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'keys', name: 'Keys', icon: '🔑' },
    { id: 'other', name: 'Other', icon: '❓' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations', icon: '📍' },
    { id: 'library', name: 'Library', icon: '📚' },
    { id: 'cafeteria', name: 'Cafeteria', icon: '🍽️' },
    { id: 'gym', name: 'Gym', icon: '🏋️' },
    { id: 'parking', name: 'Parking Lot', icon: '🚗' },
    { id: 'hostel', name: 'Hostel', icon: '🏠' },
    { id: 'classroom', name: 'Classroom', icon: '🎓' },
    { id: 'auditorium', name: 'Auditorium', icon: '🎭' },
    { id: 'ground', name: 'Sports Ground', icon: '⚽' }
  ];

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'browse' || 
                      (activeTab === 'lost' && item.type === 'lost') ||
                      (activeTab === 'found' && item.type === 'found') ||
                      (activeTab === 'my-reports' && item.reportedBy === currentUser?.name);
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesCategory && matchesLocation && matchesSearch;
  });

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

  const ItemCard = ({ item }) => {
    const category = categories.find(cat => cat.id === item.category);
    const location = locations.find(loc => loc.id === item.location);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              item.type === 'lost' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            }`}>
              {item.type === 'lost' ? '❌ Lost' : '✅ Found'}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              item.status === 'claimed' 
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            }`}>
              {item.status === 'claimed' ? '✓ Claimed' : '🔍 Active'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>{item.views}</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{category?.icon}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{category?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{location?.icon}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{location?.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span>Reported {formatDate(item.dateReported)}</span>
              <br />
              <span>by {item.reportedBy}</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    );
  };

  const stats = {
    totalItems: items.length,
    lostItems: items.filter(item => item.type === 'lost' && item.status === 'active').length,
    foundItems: items.filter(item => item.type === 'found' && item.status === 'active').length,
    claimedItems: items.filter(item => item.status === 'claimed').length
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lost & Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Help reunite lost items with their owners</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Report Item</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📦</div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalItems}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">❌</div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.lostItems}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lost Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.foundItems}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Found Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🎉</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.claimedItems}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reunited</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'browse', name: 'Browse All', icon: '🔍' },
              { id: 'lost', name: 'Lost Items', icon: '❌' },
              { id: 'found', name: 'Found Items', icon: '✅' },
              { id: 'my-reports', name: 'My Reports', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6">
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
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.icon} {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria or report a new item
          </p>
        </div>
      )}
    </div>
  );
};

export default LostFound;
