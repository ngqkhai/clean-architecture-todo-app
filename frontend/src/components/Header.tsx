/**
 * Header Component
 * Displays user info and logout button
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-tight">Tasks</h1>
            {user && (
              <p className="text-xs text-gray-600 mt-2 uppercase tracking-wider">
                {user.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-black">{user.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{user.email}</p>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-xs font-semibold text-white bg-black hover:bg-gray-900 uppercase tracking-wider transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

