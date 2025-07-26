import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import axios from 'axios';

const AddTaskModal = ({ onSave, onCancel, schedule, editingTask = null, selectedSlot = null }) => {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [day, setDay] = useState(editingTask?.day || selectedSlot?.day || 'monday');
  const [startTime, setStartTime] = useState(editingTask?.startTime || selectedSlot?.time || '09:00');
  const [endTime, setEndTime] = useState(editingTask?.endTime || '10:00');

  const handleSave = (e) => {
    e.preventDefault();
    const taskData = {
      id: editingTask?.id || schedule.length + 1, // Use existing ID or generate new one
      title,
      day,
      startTime,
      endTime,
      color: editingTask?.color || 'bg-pink-500', // Keep existing color or default
      type: editingTask?.type || 'task',
      instructor: editingTask?.instructor || '',
      room: editingTask?.room || ''
    };
    onSave(taskData, editingTask ? 'edit' : 'add');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSave}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Timetable = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Check if user is authenticated
        if (!currentUser) {
          // Use mock data for demo when not authenticated
          setSchedule([
            { id: 1, title: 'Data Structures', subject: 'Computer Science', instructor: 'Dr. Smith', room: 'CS-101', day: 'monday', startTime: '09:00', endTime: '10:30', color: 'bg-blue-500', type: 'lecture' },
            { id: 2, title: 'Mathematics', subject: 'Mathematics', instructor: 'Dr. Wilson', room: 'MATH-201', day: 'tuesday', startTime: '10:00', endTime: '11:30', color: 'bg-purple-500', type: 'lecture' },
            { id: 3, title: 'Study Session', instructor: '', room: '', day: 'wednesday', startTime: '14:00', endTime: '15:30', color: 'bg-pink-500', type: 'task' },
          ]);
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          // Fallback to mock data if no token
          setSchedule([
            { id: 1, title: 'Data Structures', subject: 'Computer Science', instructor: 'Dr. Smith', room: 'CS-101', day: 'monday', startTime: '09:00', endTime: '10:30', color: 'bg-blue-500', type: 'lecture' },
            { id: 2, title: 'Mathematics', subject: 'Mathematics', instructor: 'Dr. Wilson', room: 'MATH-201', day: 'tuesday', startTime: '10:00', endTime: '11:30', color: 'bg-purple-500', type: 'lecture' },
            { id: 3, title: 'Study Session', instructor: '', room: '', day: 'wednesday', startTime: '14:00', endTime: '15:30', color: 'bg-pink-500', type: 'task' },
          ]);
          return;
        }

        const response = await axios.get('/api/timetable', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        // Fallback to mock data if API fails
        setSchedule([
          { id: 1, title: 'Data Structures', subject: 'Computer Science', instructor: 'Dr. Smith', room: 'CS-101', day: 'monday', startTime: '09:00', endTime: '10:30', color: 'bg-blue-500', type: 'lecture' },
          { id: 2, title: 'Mathematics', subject: 'Mathematics', instructor: 'Dr. Wilson', room: 'MATH-201', day: 'tuesday', startTime: '10:00', endTime: '11:30', color: 'bg-purple-500', type: 'lecture' },
          { id: 3, title: 'Study Session', instructor: '', room: '', day: 'wednesday', startTime: '14:00', endTime: '15:30', color: 'bg-pink-500', type: 'task' },
        ]);
      }
    };
    fetchSchedule();
  }, [currentUser]);

  const handleAddTask = async (taskData, action = 'add') => {
    try {
      // Check if user is authenticated and has token
      const token = localStorage.getItem('token');

      if (!currentUser || !token) {
        // For demo purposes, work with local state only
        console.log(`${action === 'edit' ? 'Updating' : 'Adding'} task locally (demo mode):`, taskData);

        if (action === 'edit') {
          setSchedule(schedule.map(item => item.id === taskData.id ? taskData : item));
        } else {
          // Generate a unique ID for the new task
          const existingIds = schedule.length > 0 ? schedule.map(item => item.id) : [0];
          const newId = Math.max(...existingIds) + 1;
          const newTask = { ...taskData, id: newId };
          setSchedule([...schedule, newTask]);
        }

        setShowAddModal(false);
        setEditingTask(null);
        setSelectedSlot(null);
        return;
      }

      // Try API call if authenticated
      if (action === 'edit') {
        const response = await axios.put(`/api/timetable/${taskData.id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedule(schedule.map(item => item.id === taskData.id ? response.data : item));
      } else {
        const response = await axios.post('/api/timetable', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedule([...schedule, response.data]);
      }

      setShowAddModal(false);
      setEditingTask(null);
      setSelectedSlot(null);
    } catch (error) {
      console.error(`Error ${action}ing task:`, error);
      // Fallback for demo - update local state
      if (action === 'edit') {
        setSchedule(schedule.map(item => item.id === taskData.id ? taskData : item));
      } else {
        // Generate a unique ID for the new task
        const existingIds = schedule.length > 0 ? schedule.map(item => item.id) : [0];
        const newId = Math.max(...existingIds) + 1;
        const newTask = { ...taskData, id: newId };
        setSchedule([...schedule, newTask]);
      }
      setShowAddModal(false);
      setEditingTask(null);
      setSelectedSlot(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');

      if (!currentUser || !token) {
        // For demo purposes, work with local state only
        console.log('Deleting task locally (demo mode):', taskId);
        setSchedule(schedule.filter(item => item.id !== taskId));
        return;
      }

      // Try API call if authenticated
      await axios.delete(`/api/timetable/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedule(schedule.filter(item => item.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Fallback for demo - update local state
      setSchedule(schedule.filter(item => item.id !== taskId));
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddModal(true);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setEditingTask(null);
    setShowAddModal(true);
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  const getClassesForDay = (day) => {
    if (!Array.isArray(schedule)) return [];
    return schedule.filter(cls => cls.day === day);
  };

  const getTimePosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = 8; // 8 AM
    const totalMinutes = (hours - startHour) * 60 + minutes;
    return (totalMinutes / 60) * 80; // 80px per hour
  };

  const getClassDuration = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    return ((endTotalMinutes - startTotalMinutes) / 60) * 80; // 80px per hour
  };

  const ClassCard = ({ classItem, isCompact = false }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <div
        className={`${classItem.color} text-white ${isCompact ? 'p-2' : 'p-4'} rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all ${
          isCompact ? 'text-xs' : 'text-sm'
        } relative group`}
        style={{
          position: 'absolute',
          top: `${getTimePosition(classItem.startTime)}px`,
          height: `${getClassDuration(classItem.startTime, classItem.endTime)}px`,
          left: '6px',
          right: '6px',
          zIndex: 10
        }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Action buttons - show on hover */}
        {showActions && (
          <div className="absolute top-1 right-1 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditTask(classItem);
              }}
              className="w-6 h-6 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
              title="Edit"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Are you sure you want to delete this task?')) {
                  handleDeleteTask(classItem.id);
                }
              }}
              className="w-6 h-6 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
              title="Delete"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        )}

        <div className="font-semibold truncate mb-1">{classItem.title}</div>
        {!isCompact && classItem.type !== 'task' && (
          <>
            <div className="text-xs opacity-90 truncate mb-1">{classItem.instructor}</div>
            <div className="text-xs opacity-90 truncate mb-1">{classItem.room}</div>
          </>
        )}
         {!isCompact && (
           <div className="text-xs opacity-90">
              {classItem.startTime} - {classItem.endTime}
            </div>
         )}
      </div>
    );
  };

  const stats = {
    totalClasses: Array.isArray(schedule) ? schedule.filter(item => item.type !== 'task').length : 0,
    thisWeekClasses: Array.isArray(schedule) ? schedule.filter(item => item.type !== 'task').length : 0, // Simplified for demo
    completedClasses: Array.isArray(schedule) ? Math.floor(schedule.length * 0.7) : 0,
    upcomingClasses: Array.isArray(schedule) ? Math.ceil(schedule.length * 0.3) : 0
  };

  return (
    <div className="space-y-6 mt-2">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          onCancel={() => {
            setShowAddModal(false);
            setEditingTask(null);
            setSelectedSlot(null);
          }}
          schedule={schedule}
          editingTask={editingTask}
          selectedSlot={selectedSlot}
        />
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Timetable</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your class schedule efficiently</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Day
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📚</div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalClasses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Classes</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📅</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.thisWeekClasses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.completedClasses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏰</div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.upcomingClasses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekDates[5].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>

          <button
            onClick={() => navigateWeek(1)}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid" style={{ gridTemplateColumns: '60px repeat(6, 1fr)'}}>
              <div className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                Time
              </div>
              {days.map((day, index) => (
                <div key={day} className="p-4 text-center bg-gray-50 dark:bg-gray-700 border-b border-l border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {dayNames[index]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {weekDates[index].toLocaleDateString('en-US', { day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              <div className="grid" style={{ gridTemplateColumns: '60px repeat(6, 1fr)'}}>
                {/* Time Column */}
                <div className="bg-gray-50 dark:bg-gray-700">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="h-20 p-2 border-b border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                    >
                      {time}
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {days.map((day) => (
                  <div key={day} className="relative border-l border-gray-200 dark:border-gray-700">
                    {timeSlots.map((time) => (
                      <div
                        key={`${day}-${time}`}
                        className="h-20 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors relative group"
                        onClick={() => handleSlotClick({ day, time })}
                      >
                        {/* Add indicator on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Classes for this day */}
                    {getClassesForDay(day).map((classItem) => (
                      <ClassCard key={classItem.id} classItem={classItem} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {getClassesForDay(days[new Date().getDay() -1]).length > 0 ? (
            getClassesForDay(days[new Date().getDay() -1]).map((classItem) => (
              <div key={classItem.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-10 ${classItem.color} rounded-full`}></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{classItem.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {classItem.startTime} - {classItem.endTime}
                    {classItem.type !== 'task' && ` • ${classItem.room} • ${classItem.instructor}`}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  classItem.type === 'lecture' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  classItem.type === 'lab' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  classItem.type === 'task' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                }`}>
                  {classItem.type}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-gray-500 dark:text-gray-400">No classes or tasks today! Enjoy your free time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;