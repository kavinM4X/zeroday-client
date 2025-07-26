import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import axios from 'axios';

const CreateComplaintModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
    hostelBlock: '',
    roomNumber: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const categories = [
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'internet', name: 'Internet/WiFi' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'security', name: 'Security' },
    { id: 'maintenance', name: 'General Maintenance' },
    { id: 'other', name: 'Other' }
  ];

  const priorities = {
    low: { label: 'Low' },
    medium: { label: 'Medium' },
    high: { label: 'High' },
    urgent: { label: 'Urgent' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        category: 'maintenance',
        priority: 'medium',
        hostelBlock: '',
        roomNumber: '',
        images: []
      });
      onClose();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">File a New Complaint</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please provide as much detail as possible.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              name="description" 
              id="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              rows="4" 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                name="category" 
                id="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select 
                name="priority" 
                id="priority" 
                value={formData.priority} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(priorities).map(([key, {label}]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="hostelBlock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hostel Block</label>
              <input 
                type="text" 
                name="hostelBlock" 
                id="hostelBlock" 
                value={formData.hostelBlock} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Number</label>
              <input 
                type="text" 
                name="roomNumber" 
                id="roomNumber" 
                value={formData.roomNumber} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
          {submitError && <p className="text-red-500 text-sm">Error: {submitError}</p>}
        </form>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting} 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Complaints = () => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.token;
  const [activeTab, setActiveTab] = useState('my-complaints');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalComplaints: 0
  });

  const API_BASE_URL = 'http://localhost:4000/api/complaints';

  const fetchComplaints = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        myComplaints: activeTab === 'my-complaints' ? 'true' : 'false'
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (selectedStatus !== 'all') {
        params.append('status', selectedStatus);
      }

      const response = await axios.get(`${API_BASE_URL}?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setComplaints(response.data.complaints);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError(err.response?.data?.error || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchComplaints(1);
    }
  }, [token, activeTab, selectedCategory, selectedStatus]);

  const createComplaint = async (complaintData) => {
    try {
      const response = await axios.post(API_BASE_URL, complaintData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      await fetchComplaints(1);
      return response.data;
    } catch (err) {
      console.error('Error creating complaint:', err);
      throw new Error(err.response?.data?.error || 'Failed to create complaint');
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📋', color: 'bg-gray-500' },
    { id: 'plumbing', name: 'Plumbing', icon: '🚿', color: 'bg-blue-500' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'internet', name: 'Internet/WiFi', icon: '📶', color: 'bg-green-500' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: 'bg-purple-500' },
    { id: 'security', name: 'Security', icon: '🔒', color: 'bg-red-500' },
    { id: 'maintenance', name: 'General Maintenance', icon: '🔧', color: 'bg-orange-500' },
    { id: 'other', name: 'Other', icon: '❓', color: 'bg-gray-500' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: 'bg-gray-500' },
    { id: 'pending', name: 'Pending', color: 'bg-yellow-500' },
    { id: 'in-progress', name: 'In Progress', color: 'bg-blue-500' },
    { id: 'resolved', name: 'Resolved', color: 'bg-green-500' },
    { id: 'closed', name: 'Closed', color: 'bg-gray-500' }
  ];

  const priorities = {
    low: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Low' },
    medium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Medium' },
    high: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'High' },
    urgent: { color: 'bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-200', label: 'Urgent' }
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'in-progress': return '🔄';
      case 'resolved': return '✅';
      case 'closed': return '🔒';
      default: return '📋';
    }
  };

  const ComplaintCard = ({ complaint }) => {
    const category = categories.find(cat => cat.id === complaint.category);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${category?.color} rounded-lg flex items-center justify-center text-white text-lg`}>
              {category?.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{complaint.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">#{complaint._id?.slice(-6) || 'N/A'}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{complaint.hostelBlock} - {complaint.roomNumber}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorities[complaint.priority].color}`}>
              {priorities[complaint.priority].label}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${
              complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
              complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
              complaint.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              <span>{getStatusIcon(complaint.status)}</span>
              <span className="capitalize">{complaint.status.replace('-', ' ')}</span>
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{complaint.description}</p>

        {complaint.images && complaint.images.length > 0 && (
          <div className="mb-4">
            <div className="flex space-x-2">
              {complaint.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Complaint ${complaint._id} - Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Reported by:</span>
            <span className="ml-2 text-gray-900 dark:text-white font-medium">
              {complaint.reportedBy?.name || 'Unknown'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Reported:</span>
            <span className="ml-2 text-gray-900 dark:text-white">{formatDate(complaint.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {formatDate(complaint.updatedAt)}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-2">
      <CreateComplaintModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSubmit={createComplaint} 
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hostel Complaints</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Report and track hostel maintenance issues</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Raise Complaint</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('my-complaints')}
              className={`${
                activeTab === 'my-complaints' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Complaints
            </button>
            <button
              onClick={() => setActiveTab('all-complaints')}
              className={`${
                activeTab === 'all-complaints' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              All Complaints
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm px-3 py-2"
            >
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm px-3 py-2"
            >
              {statuses.map(stat => <option key={stat.id} value={stat.id}>{stat.name}</option>)}
            </select>
          </div>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="text-center p-8">
            <div className="text-gray-500 dark:text-gray-400">Loading complaints...</div>
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">{error}</div>
        ) : (
          <div className="space-y-4 p-4">
            {complaints.length > 0 ? (
              complaints.map(complaint => (
                <ComplaintCard key={complaint._id} complaint={complaint} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No complaints found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  There are no complaints matching your current filters.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => fetchComplaints(pagination.currentPage - 1)} 
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                onClick={() => fetchComplaints(pagination.currentPage + 1)} 
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
export { CreateComplaintModal };
