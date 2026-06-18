import React from 'react';
import { Building2, LogIn, User, LogOut, Grid } from 'lucide-react';
import { Realtor } from '../types';

type HeaderProps = {
  currentView: 'home' | 'dashboard';
  setCurrentView: (view: 'home' | 'dashboard') => void;
  currentUser: Realtor | null;
  onLogout: () => void;
};

export function Header({ currentView, setCurrentView, currentUser, onLogout }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-slate-800 transition-colors shadow-sm">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight leading-none uppercase">
                Vladis<span className="text-slate-400 font-sans font-medium text-[0.8em]">Pro</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-widest uppercase hidden xs:block mt-0.5">
                Premium Real Estate
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`flex items-center gap-2 text-sm sm:text-base font-semibold transition-all px-3 py-2 rounded-lg ${currentView === 'home' ? 'text-slate-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <Grid className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Каталог</span>
            </button>
            
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-2 text-sm sm:text-base font-semibold transition-all px-3 py-2 rounded-lg ${currentView === 'dashboard' ? 'text-slate-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  <User className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Кабинет ({currentUser.name.split(' ')[0]})</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-all p-2 sm:px-3 rounded-lg hover:bg-red-50"
                  title="Выйти"
                >
                  <LogOut className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Вход для риэлторов</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
