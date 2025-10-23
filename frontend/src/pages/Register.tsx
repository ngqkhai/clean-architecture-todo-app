/**
 * Register Page
 * Displays registration form and link to login
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-3 tracking-tight">Join Us</h1>
          <div className="w-12 h-0.5 bg-black mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wider">Create your account</p>
        </div>

        <RegisterForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

