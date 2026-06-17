import React, { useState, useEffect } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { getProperties, getRealtors } from '../store';
import { Property, Realtor } from '../types';
import { Search } from 'lucide-react';

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [filterType, setFilterType] = useState<string>('Все');

  useEffect(() => {
    setProperties(getProperties().sort((a, b) => b.createdAt - a.createdAt));
    setRealtors(getRealtors());
  }, []);

  const getRealtor = (id: string) => realtors.find(r => r.id === id);

  const filteredProperties = filterType === 'Все' 
    ? properties 
    : properties.filter(p => p.type === filterType);

  const types = ['Все', 'Квартира', 'Дом', 'Участок', 'Коммерческая'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Поиск по адресу..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              realtor={getRealtor(property.realtorId)} 
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Объекты не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
