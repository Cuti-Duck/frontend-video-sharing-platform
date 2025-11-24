'use client';

import { useState } from 'react';
import Modal from './Modal';
import AuthApi from '@/lib/authApi';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
      
    // TODO: Implement actual login logic
    try {
      console.log("data is sending");
      const response = await AuthApi.Login({ email, password });
      
      login(response.data.accessToken);
      onClose();
    }catch (error) {
      console.error('Error during login:', error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đăng nhập">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Chưa có tài khoản? </span>
        <button onClick={onSwitchToRegister} className="text-white hover:underline">Đăng ký</button>
      </div>
    </Modal>
  );
}