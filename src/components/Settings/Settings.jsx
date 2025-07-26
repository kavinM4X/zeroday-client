import React, { useState } from 'react';

const Settings = ({ darkMode, toggleTheme }) => {
  const [notifications, setNotifications] = useState({
    announcements: true,
    complaints: true,
    lostFound: false,
    timetable: true,
    email: true,
    push: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    startWeek: 'monday'
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">🎨</span>
            Appearance
          </h2>
          
          <div className="space-y-4">
            <ToggleSwitch
              enabled={darkMode}
              onChange={toggleTheme}
              label="Dark Mode"
              description="Switch between light and dark themes"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">🔔</span>
            Notifications
          </h2>
          
          <div className="space-y-2">
            <ToggleSwitch
              enabled={notifications.announcements}
              onChange={() => handleNotificationChange('announcements')}
              label="Announcements"
              description="Get notified about new campus announcements"
            />
            
            <ToggleSwitch
              enabled={notifications.complaints}
              onChange={() => handleNotificationChange('complaints')}
              label="Complaint Updates"
              description="Receive updates on your complaint status"
            />
            
            <ToggleSwitch
              enabled={notifications.lostFound}
              onChange={() => handleNotificationChange('lostFound')}
              label="Lost & Found"
              description="Notifications about lost and found items"
            />
            
            <ToggleSwitch
              enabled={notifications.timetable}
              onChange={() => handleNotificationChange('timetable')}
              label="Timetable Reminders"
              description="Get reminded about upcoming classes"
            />
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Delivery Methods</h3>
              
              <ToggleSwitch
                enabled={notifications.email}
                onChange={() => handleNotificationChange('email')}
                label="Email Notifications"
                description="Receive notifications via email"
              />
              
              <ToggleSwitch
                enabled={notifications.push}
                onChange={() => handleNotificationChange('push')}
                label="Push Notifications"
                description="Receive browser push notifications"
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">🔒</span>
            Privacy
          </h2>
          
          <div className="space-y-2">
            <ToggleSwitch
              enabled={privacy.profileVisible}
              onChange={() => handlePrivacyChange('profileVisible')}
              label="Profile Visibility"
              description="Make your profile visible to other students"
            />
            
            <ToggleSwitch
              enabled={privacy.showEmail}
              onChange={() => handlePrivacyChange('showEmail')}
              label="Show Email"
              description="Display your email address on your profile"
            />
            
            <ToggleSwitch
              enabled={privacy.showPhone}
              onChange={() => handlePrivacyChange('showPhone')}
              label="Show Phone Number"
              description="Display your phone number on your profile"
            />
            
            <ToggleSwitch
              enabled={privacy.allowMessages}
              onChange={() => handlePrivacyChange('allowMessages')}
              label="Allow Messages"
              description="Allow other students to send you messages"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">⚙️</span>
            Preferences
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Format
              </label>
              <select
                value={preferences.dateFormat}
                onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Week Starts On
              </label>
              <select
                value={preferences.startWeek}
                onChange={(e) => handlePreferenceChange('startWeek', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">👤</span>
          Account
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Change Password</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Export Data</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Download a copy of your data</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Delete Account</p>
              <p className="text-xs text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
