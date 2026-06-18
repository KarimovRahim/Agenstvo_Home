import React from 'react';
import { MapPin, Phone, Expand, Bed, MessageCircle } from 'lucide-react';
import { Property, Realtor } from '../types';
import { motion } from 'motion/react';

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
    <motion.div 
      whileHover={{ y: -4 }}
      className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-300"
    >
      <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-100 animate-pulse"></div>
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-slate-900 shadow-sm uppercase">
            {property.type}
          </span>
        </div>

        {isOwner && onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(property.id); }}
            className="absolute top-5 right-5 bg-red-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-red-600 transition-colors shadow-sm"
          >
            Удалить
          </button>
        )}

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <div className="text-white font-serif text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-md">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 line-clamp-2 leading-tight mb-4">
          {property.title}
        </h3>

        <div className="flex items-start gap-2.5 text-slate-500 text-sm font-medium mb-6">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
          <span className="line-clamp-2 leading-relaxed">{property.address}</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-600 font-semibold mb-6 pb-6 border-b border-slate-100 mt-auto">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Expand className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{property.area} м²</span>
          </div>
          {property.rooms && (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Bed className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{property.rooms} комн.</span>
            </div>
          )}
        </div>

        <div>
          {realtor ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                  {realtor.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">{realtor.name}</p>
                  <p className="text-xs text-slate-500 font-semibold truncate">Брокер • ID: {realtor.id.slice(-4)}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-2">
                {realtor.telegram && (
                  <a 
                    href={`https://t.me/${realtor.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#E5F1FB] text-[#0088CC] flex items-center justify-center hover:bg-[#D5EAF8] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
                <a 
                  href={`tel:${realtor.phone}`} 
                  className="w-11 h-11 rounded-full bg-slate-50 text-slate-700 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          ) : (
             <div className="h-11"></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
