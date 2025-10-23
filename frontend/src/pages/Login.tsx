import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Login;
