'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '@/data/users.json';
import adminsData from '@/data/admins.json';

export type Role = 'initiator' | 'supporter' | 'reviewer' | 'approver' | 'admin' | 'super_admin' | 'super_staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branch: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('credit_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore corrupted data
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const allUsers = [...(usersData as any[]), ...(adminsData as any[])];
    const found = allUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const { password: _, username: __, ...userInfo } = found;
      setUser(userInfo as User);
      localStorage.setItem('credit_user', JSON.stringify(userInfo));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('credit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
