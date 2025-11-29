'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import AuthApi from '@/lib/authApi';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        console.log("data is sending");
        const response = await AuthApi.Register({   email, 
                                                    password, 
                                                    name, 
                                                    gender, 
                                                    birthDate, 
                                                    phoneNumber });
        
        setIsRegistered(true);
            
    }catch (error) {
        console.error('Error during registration:', error);
    }finally {
        setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        console.log("data is sending for verify email");
        const response = await AuthApi.VerifyEmail({ email, code });
        
        setIsRegistered(false);
        onClose();
    }catch (error) {
        console.error('Error during email verification:', error);
    }finally {
        setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đăng ký">
        {!isRegistered ? (
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
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Birthdate</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">PhoneNumber</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
                    >
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
            </form>
        ) : (
            <form onSubmit={handleVerify} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Code</label>
                    <span className='text-gray-500'> code send to {email} </span>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-300 disabled:bg-gray-500 text-black py-2 px-4 rounded-md transition-colors"
                    >
                    {isLoading ? 'Verify...' : 'Verify'}
                </button>
            </form>
        )}
        
        {!isRegistered && (
            <div className="mt-4 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Đã có tài khoản? </span>
                <button onClick={onSwitchToLogin} className="text-white hover:underline">Đăng nhập</button>
            </div>
        )}
        
        
    </Modal>

  );
}