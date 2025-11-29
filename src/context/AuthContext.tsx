'use client';

import UserApi from '@/lib/userApi';
import { User, UserResponse } from '@/types/user';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try{
      const response = await UserApi.GetMe();
      console.log("nội dung api",response.data)
      setUser({
        userId: response.data.data.userId,
        email: response.data.data.email,
        name: response.data.data.name,
        gender: response.data.data.gender,
        birthDate: response.data.data.birthDate,
        phoneNumber: response.data.data.phoneNumber,
        avatarUrl: response.data.data.avatarUrl || `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`,
        channelId: response.data.data.channelId,
        createdAt: response.data.data.createdAt,
      })
      console.log(user)

      setIsAuthenticated(true);
    }catch(error){
      console.error("Error fetching user:", error);
      logout();
    }finally{
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      fetchUser();
    }else{
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = async (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    await fetchUser();
  };

  const logout = () => {
    console.log("Trước khi xóa:", localStorage.getItem("accessToken"));
    localStorage.removeItem('accessToken');
    
    console.log("Sau khi xóa:", localStorage.getItem("accessToken"));
    setIsAuthenticated(false);
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      accessToken,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};