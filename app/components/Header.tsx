"use client";
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = "User" }) => {
  const [timeLeft, setTimeLeft] = useState(1 * 60 * 60 + 50 * 60 + 30); // 1h 50m 30s in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <header className="bg-linear-to-r from-blue-700 to-blue-900 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AWS Certified Solutions Architect - Associate</h1>
          <p className="text-blue-100 text-sm mt-1">{userName}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-mono font-semibold">Time Remaining: {formatTime(timeLeft)}</p>
          <div className="flex gap-4 mt-2">
            {/* Placeholder for icons */}
            <div className="w-8 h-8 bg-blue-100 rounded-full opacity-70"></div>
            <div className="w-8 h-8 bg-blue-100 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
