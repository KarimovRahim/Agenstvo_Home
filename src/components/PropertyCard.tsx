import React from 'react';
import { MapPin, Phone, MessageCircle, Maximize, BedDouble } from 'lucide-react';
import { Property, Realtor } from '../types';

type PropertyCardProps = {
  key?: React.Key;
  property: Property;
  realtor?: Realtor;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
};

export function PropertyCard({ property, realtor, onDelete, isOwner }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden group">
        <img 
          src={property.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
          {property.type}
        </div>
        {isOwner && onDelete && (
          <button 
            onClick={() => onDelete(property.id)}
            className="absolute top-4 right-4 bg-red-500/90 text-white backdrop-blur px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition-colors"
          >
            Удалить
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{property.title}</h3>
          <div className="text-xl font-bold text-blue-600 whitespace-nowrap ml-4">
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{property.address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-gray-400" />
            <span>{property.area} м²</span>
          </div>
          {property.rooms && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4 text-gray-400" />
              <span>{property.rooms} комн.</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
          {property.description}
        </p>

        {realtor && (
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                {realtor.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{realtor.name}</p>
                <p className="text-xs text-gray-500">Риэлтор</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a 
                href={`tel:${realtor.phone}`} 
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors"
                title="Позвонить"
              >
                <Phone className="w-4 h-4" />
              </a>
              {realtor.telegram && (
                <a 
                  href={`https://t.me/${realtor.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-colors"
                  title="Написать в Telegram"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
