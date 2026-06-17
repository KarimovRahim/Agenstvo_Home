import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Realtor } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [currentUser, setCurrentUser] = useState<Realtor | null>(null);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {currentView === 'home' ? (
          <Home />
        ) : (
          <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
        )}
      </main>
    </div>
  );
}
