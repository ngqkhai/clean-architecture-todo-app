/**
 * Login Page
 * Displays login form and link to registration
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-3 tracking-tight">Welcome</h1>
          <div className="w-12 h-0.5 bg-black mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wider">Sign in to continue</p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-black font-semibold hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

