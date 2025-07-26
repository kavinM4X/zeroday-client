import React, { useState } from 'react';

const ForgotPassword = ({ onBack, apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    try {
      await fetch(`${apiBase}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setMessage('If that email exists, a reset link has been sent.');
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Reset your password</h2>
      {message && <p className="text-green-600 dark:text-green-400 text-center">{message}</p>}
      {error && <p className="text-red-600 dark:text-red-400 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 text-sm font-medium text-black bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to sign in
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
