import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'owner' | 'staff';

type AuthState = {
  isLoggedIn: boolean;
  user: string;
  role: Role;
  login: (user: string, role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState<Role>('owner');

  const login = (u: string, r: Role) => {
    setUser(u);
    setRole(r);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser('');
    setRole('owner');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
