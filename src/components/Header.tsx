import React from 'react';
import { Home, LogIn, UserPlus } from 'lucide-react';
import { Realtor } from '../types';

type HeaderProps = {
  currentView: 'home' | 'dashboard';
  setCurrentView: (view: 'home' | 'dashboard') => void;
  currentUser: Realtor | null;
  onLogout: () => void;
};

export function Header({ currentView, setCurrentView, currentUser, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ВЛАДИС ПРО
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('home')}
              className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Все объекты
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Личный кабинет ({currentUser.name})
                </button>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Вход для риэлторов
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
