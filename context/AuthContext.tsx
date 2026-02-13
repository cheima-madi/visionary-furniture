
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const storedUser = localStorage.getItem('ar_retail_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simplified logic for simulation, but follows PDF roles
        if (email.includes('admin') && pass === 'admin123') {
          const adminUser: User = { id: 'admin-1', name: 'Platform Manager', email, role: Role.ADMIN };
          setUser(adminUser);
          localStorage.setItem('ar_retail_user', JSON.stringify(adminUser));
          resolve();
        } else if (email && pass) {
          // Allow any valid-looking input for customer to make it "work" as requested
          const customerUser: User = { id: 'cust-' + Date.now(), name: email.split('@')[0], email, role: Role.CUSTOMER };
          setUser(customerUser);
          localStorage.setItem('ar_retail_user', JSON.stringify(customerUser));
          resolve();
        } else {
          reject(new Error('Invalid email or password format.'));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !pass) {
          reject(new Error('All fields are required.'));
          return;
        }
        const newUser: User = { id: Date.now().toString(), name, email, role: Role.CUSTOMER };
        setUser(newUser);
        localStorage.setItem('ar_retail_user', JSON.stringify(newUser));
        resolve();
      }, 1200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ar_retail_user');
    localStorage.removeItem('ar_retail_token');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === Role.ADMIN,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
