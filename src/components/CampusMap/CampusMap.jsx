import React, { useState } from 'react';

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock campus locations
  const locations = [
    {
      id: 1,
      name: 'Central Library',
      category: 'academic',
      description: 'Main library with study halls and computer lab',
      coordinates: { x: 45, y: 30 },
      icon: '📚',
      color: 'bg-blue-500',
      facilities: ['WiFi', 'Study Rooms', 'Computers', 'Printing'],
      hours: '6:00 AM - 11:00 PM'
    },
    {
      id: 2,
      name: 'Student Cafeteria',
      category: 'dining',
      description: 'Main dining hall serving breakfast, lunch, and dinner',
      coordinates: { x: 25, y: 45 },
      icon: '🍽️',
      color: 'bg-green-500',
      facilities: ['Food Court', 'Seating', 'WiFi'],
      hours: '7:00 AM - 10:00 PM'
    },
    {
      id: 3,
      name: 'Hostel Block A',
      category: 'residential',
      description: 'Student accommodation with 200 rooms',
      coordinates: { x: 70, y: 20 },
      icon: '🏠',
      color: 'bg-purple-500',
      facilities: ['Laundry', 'Common Room', 'WiFi', 'Security'],
      hours: '24/7'
    },
    {
      id: 4,
      name: 'Hostel Block B',
      category: 'residential',
      description: 'Student accommodation with 180 rooms',
      coordinates: { x: 75, y: 35 },
      icon: '🏠',
      color: 'bg-purple-500',
      facilities: ['Laundry', 'Common Room', 'WiFi', 'Security'],
      hours: '24/7'
    },
    {
      id: 5,
      name: 'Computer Science Building',
      category: 'academic',
      description: 'CS department with labs and classrooms',
      coordinates: { x: 35, y: 25 },
      icon: '💻',
      color: 'bg-blue-500',
      facilities: ['Computer Labs', 'Classrooms', 'WiFi', 'Projectors'],
      hours: '8:00 AM - 8:00 PM'
    },
    {
      id: 6,
      name: 'Sports Complex',
      category: 'recreation',
      description: 'Gymnasium and outdoor sports facilities',
      coordinates: { x: 15, y: 65 },
      icon: '🏋️',
      color: 'bg-orange-500',
      facilities: ['Gym', 'Basketball Court', 'Swimming Pool', 'Lockers'],
      hours: '6:00 AM - 10:00 PM'
    },
    {
      id: 7,
      name: 'Medical Center',
      category: 'services',
      description: 'Campus health services and emergency care',
      coordinates: { x: 60, y: 55 },
      icon: '🏥',
      color: 'bg-red-500',
      facilities: ['Emergency Care', 'Pharmacy', 'Consultation'],
      hours: '24/7 Emergency'
    },
    {
      id: 8,
      name: 'Administration Building',
      category: 'services',
      description: 'Main administrative offices',
      coordinates: { x: 50, y: 40 },
      icon: '🏢',
      color: 'bg-gray-500',
      facilities: ['Admissions', 'Finance', 'Student Services'],
      hours: '9:00 AM - 5:00 PM'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Locations', icon: '📍', color: 'bg-gray-500' },
    { id: 'academic', name: 'Academic', icon: '🎓', color: 'bg-blue-500' },
    { id: 'residential', name: 'Residential', icon: '🏠', color: 'bg-purple-500' },
    { id: 'dining', name: 'Dining', icon: '🍽️', color: 'bg-green-500' },
    { id: 'recreation', name: 'Recreation', icon: '🏋️', color: 'bg-orange-500' },
    { id: 'services', name: 'Services', icon: '🏢', color: 'bg-gray-500' }
  ];

  // Filter locations
  const filteredLocations = locations.filter(location => {
    const matchesCategory = activeCategory === 'all' || location.category === activeCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const LocationPin = ({ location }) => (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
        selectedLocation?.id === location.id ? 'scale-125 z-20' : 'z-10'
      }`}
      style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
      onClick={() => setSelectedLocation(location)}
    >
      <div className={`w-8 h-8 ${location.color} rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white`}>
        <span className="text-sm">{location.icon}</span>
      </div>
      {selectedLocation?.id === location.id && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-64 z-30 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">{location.icon}</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">{location.name}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{location.description}</p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            <strong>Hours:</strong> {location.hours}
          </div>
          <div className="flex flex-wrap gap-1">
            {location.facilities.map((facility, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
              >
                {facility}
              </span>
            ))}
          </div>
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-xs"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Map</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Interactive map of campus facilities and locations</p>
        </div>
      </div>

      {/* Search and Filters */}
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
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg overflow-hidden">
              {/* Campus Background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Roads */}
                  <path d="M0 50 L100 50" stroke="#666" strokeWidth="0.5" />
                  <path d="M50 0 L50 100" stroke="#666" strokeWidth="0.5" />
                  
                  {/* Buildings outline */}
                  <rect x="30" y="20" width="15" height="10" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="20" y="40" width="10" height="10" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="65" y="15" width="10" height="15" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="70" y="30" width="10" height="15" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="45" y="35" width="10" height="10" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="10" y="60" width="15" height="10" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                  <rect x="55" y="50" width="10" height="10" fill="#ddd" stroke="#999" strokeWidth="0.2" />
                </svg>
              </div>

              {/* Location Pins */}
              {filteredLocations.map((location) => (
                <LocationPin key={location.id} location={location} />
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Legend</h4>
                <div className="space-y-1">
                  {categories.slice(1).map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Locations</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedLocation?.id === location.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${location.color} rounded-lg flex items-center justify-center text-white`}>
                    {location.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{location.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{location.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
