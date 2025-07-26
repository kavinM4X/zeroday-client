import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, currentUser }) => {
  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'announcements',
      name: 'Announcements',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'lost-found',
      name: 'Lost & Found',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'timetable',
      name: 'Timetable',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'complaints',
      name: 'Complaints',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'campus-map',
      name: 'Campus Map',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    }
  ];

  // Add admin-only items
  if (currentUser?.role === 'admin') {
    menuItems.push(
      {
        id: 'analytics',
        name: 'Analytics',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        ),
        roles: ['admin']
      },
      {
        id: 'user-management',
        name: 'User Management',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        ),
        roles: ['admin']
      }
    );
  }

  const bottomMenuItems = [
    {
      id: 'profile',
      name: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      roles: ['student', 'admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(currentUser?.role)
  );

  const filteredBottomMenuItems = bottomMenuItems.filter(item => 
    item.roles.includes(currentUser?.role)
  );

  return (
    <aside className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 pt-16 duration-300 transition-all ${
      isOpen ? 'w-64' : 'w-16'
    } h-full`}>
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {/* Main navigation */}
            <ul className="space-y-2 pb-2">
              {filteredMenuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`group flex items-center w-full p-2 text-base font-normal rounded-lg transition duration-75 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    }`}
                    title={!isOpen ? item.name : ''}
                  >
                    <div className={`flex-shrink-0 ${currentPage === item.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.icon}
                    </div>
                    {isOpen && (
                      <span className="ml-3 whitespace-nowrap">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Bottom navigation */}
            <div className="pt-2">
              <ul className="space-y-2">
                {filteredBottomMenuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentPage(item.id)}
                      className={`group flex items-center w-full p-2 text-base font-normal rounded-lg transition duration-75 ${
                        currentPage === item.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      }`}
                      title={!isOpen ? item.name : ''}
                    >
                      <div className={`flex-shrink-0 ${currentPage === item.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                        {item.icon}
                      </div>
                      {isOpen && (
                        <span className="ml-3 whitespace-nowrap">{item.name}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* User info at bottom */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${currentUser?.name}&background=3b82f6&color=fff`}
                alt="User avatar"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentUser?.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
