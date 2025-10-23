/**
 * RegisterForm Component
 * User registration form with name, email, password validation
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
          placeholder="••••••••"
        />
        <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">Min. 8 characters</p>
      </div>

      {error && (
        <div className="p-4 bg-black text-white text-sm border-2 border-black">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-4 bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
};

