import React, { useEffect, useState } from 'react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch all complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/complaints`);
        if (!res.ok) throw new Error('Failed to fetch complaints');
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchComplaints();
  }, []);

  // Open edit modal
  const handleEdit = (complaint) => {
    setEditing(complaint._id);
    setEditData({ ...complaint });
  };

  // Save edit
  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/complaints/${editing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to update complaint');
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setEditing(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditing(null);
    setEditData({});
  };

  if (loading) return <div className="p-6">Loading complaints...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Complaints</h1>
      <table className="min-w-full table-auto border border-gray-300 bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="border-t">
              <td className="px-4 py-2 border">{complaint._id}</td>
              <td className="px-4 py-2 border">
                {editing === complaint._id ? (
                  <input
                    className="border px-2 py-1 rounded"
                    value={editData.title || ''}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                ) : (
                  complaint.title
                )}
              </td>
              <td className="px-4 py-2 border">
                {editing === complaint._id ? (
                  <textarea
                    className="border px-2 py-1 rounded"
                    value={editData.description || ''}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                ) : (
                  complaint.description
                )}
              </td>
              <td className="px-4 py-2 border">
                {editing === complaint._id ? (
                  <select
                    className="border px-2 py-1 rounded"
                    value={editData.status || ''}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                ) : (
                  complaint.status
                )}
              </td>
              <td className="px-4 py-2 border">
                {editing === complaint._id ? (
                  <>
                    <button className="mr-2 px-3 py-1 bg-green-600 text-white rounded" onClick={handleSave}>Save</button>
                    <button className="px-3 py-1 bg-gray-400 text-white rounded" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => handleEdit(complaint)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComplaints;
