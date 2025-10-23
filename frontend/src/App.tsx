import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ListsOverview from './pages/ListsOverview';
import ListDetail from './pages/ListDetail';

/**
 * ProtectedRoute Component
 * 
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text/60">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute Component
 * 
 * Redirects to lists if user is already authenticated
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text/60">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/lists" replace />;
  }

  return <>{children}</>;
};

/**
 * App Component
 * 
 * Main application component with routing and authentication
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Root redirect */}
          <Route 
            path="/" 
            element={
              <RootRedirect />
            } 
          />

          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/lists" 
            element={
              <ProtectedRoute>
                <ListsOverview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lists/:id" 
            element={
              <ProtectedRoute>
                <ListDetail />
              </ProtectedRoute>
            } 
          />

          {/* 404 catch-all */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

/**
 * RootRedirect Component
 * 
 * Redirects from / to either /lists or /login based on auth status
 */
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text/60">Loading...</p>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? '/lists' : '/login'} replace />;
};

export default App;
