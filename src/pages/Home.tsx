import React, { useState, useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { getProperties, getRealtors } from "../store";
import { Property, Realtor } from "../types";
import { Search, Map } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [filterType, setFilterType] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProperties(getProperties().sort((a, b) => b.createdAt - a.createdAt));
    setRealtors(getRealtors());
  }, []);

  const getRealtor = (id: string) => realtors.find((r) => r.id === id);

  const filteredProperties = properties.filter((p) => {
    const matchesFilter = filterType === "Все" || p.type === filterType;
    const matchesSearch =
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const types = ["Все", "Квартира", "Дом", "Участок", "Коммерческая"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 sm:py-32 px-4 relative flex flex-col justify-center min-h-[500px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000')] opacity-20 object-cover w-full h-full"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight px-2"
          >
            Премиальная недвижимость <br className="hidden sm:block" /> для
            вашей жизни
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light px-4"
          >
            Эксклюзивная база объектов от профессиональных брокеров VladisPro.
            Исключительный сервис на каждом этапе сделки.
          </motion.p>

          {/* Elegant Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-3xl sm:rounded-full border border-white/20 shadow-2xl"
          >
            <div className="flex-1 flex items-center bg-white rounded-2xl sm:rounded-full px-5 py-4 sm:py-5">
              <Search className="w-6 h-6 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Город, улица, ЖК или номер объекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 px-4 outline-none font-medium text-lg leading-tight"
              />
            </div>
            <button className="bg-slate-900 text-white px-10 py-4 sm:py-5 rounded-2xl sm:rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-sm shrink-0 whitespace-nowrap active:scale-[0.98]">
              Найти объект
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 sm:mb-16">
          <div className="w-full overflow-x-auto pb-4 sm:pb-0 hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-3">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    filterType === type
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 scale-105"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-sm font-semibold text-slate-500 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
            Найдено:{" "}
            <span className="text-slate-900 ml-1">
              {filteredProperties.length}
            </span>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (idx % 12) * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  realtor={getRealtor(property.realtorId)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 mt-8"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Map className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">
              Ничего не найдено
            </h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              К сожалению, по данным критериям объектов нет. Измените параметры
              фильтрации или обновите условия поиска.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
