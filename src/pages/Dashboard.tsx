import React, { useState, useEffect } from 'react';
import { getRealtors, saveRealtor, getProperties, saveProperty, deleteProperty } from '../store';
import { Property, Realtor } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Plus, LayoutList, Building, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type DashboardProps = {
  currentUser: Realtor | null;
  setCurrentUser: (user: Realtor) => void;
};

export function Dashboard({ currentUser, setCurrentUser }: DashboardProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');

  const [properties, setProperties] = useState<Property[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // New Property Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<Property['type']>('Квартира');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (currentUser) loadMyProperties();
  }, [currentUser]);

  const loadMyProperties = () => {
    if (!currentUser) return;
    const all = getProperties();
    setProperties(all.filter(p => p.realtorId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const realtors = getRealtors();
    
    if (isLogin) {
      const user = realtors.find(r => r.phone === phone);
      if (user) {
        setCurrentUser(user);
      } else {
        alert('Брокер не найден. Пожалуйста, пройдите регистрацию.');
      }
    } else {
      if (realtors.some(r => r.phone === phone)) {
        alert('Брокер с таким номером уже зарегистрирован.');
        return;
      }
      const newUser: Realtor = { id: Date.now().toString(), name, phone, telegram: telegram || undefined };
      saveRealtor(newUser);
      setCurrentUser(newUser);
    }
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newProperty: Property = {
      id: Date.now().toString(),
      title,
      description,
      price: Number(price),
      type,
      address,
      rooms: rooms ? Number(rooms) : undefined,
      area: Number(area),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
      realtorId: currentUser.id,
      createdAt: Date.now()
    };

    saveProperty(newProperty);
    setShowAddForm(false);
    loadMyProperties();
    
    setTitle(''); setDescription(''); setPrice(''); setAddress(''); setRooms(''); setArea(''); setImageUrl('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Аннулировать этот объект? Восстановить будет невозможно.')) {
      deleteProperty(id);
      loadMyProperties();
    }
  };

  if (!currentUser) {
    return (
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 w-full max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-900"></div>
          
          <div className="mb-10 text-center mt-2">
            <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-slate-900/10">
               <Building className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              {isLogin ? 'Авторизация' : 'Регистрация'}
            </h2>
            <p className="text-slate-500 font-medium px-4">
              {isLogin ? 'Рабочее пространство доверенных брокеров VladisPro' : 'Откройте доступ к премиальному каталогу'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2.5">Ваше Имя и Фамилия</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                  placeholder="Иванов Иван"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2.5">Номер телефона</label>
              <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                 className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-mono text-lg text-slate-900 tracking-wide"
                placeholder="+7 (999) 000-00-00"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2.5">Telegram username <span className="text-slate-400 font-normal ml-1">опционально</span></label>
                <input type="text" value={telegram} onChange={e => setTelegram(e.target.value)}
                   className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-mono text-lg text-slate-900"
                  placeholder="@username"
                />
              </div>
            )}
            <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 mt-8 shadow-xl shadow-slate-900/20 active:scale-[0.98]">
              {isLogin ? 'Войти в кабинет' : 'Стать партнером'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 text-center border-t border-slate-100 pt-8">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">
              {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 sm:mb-16 bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-900/10">
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3 tracking-tight">
              Кабинет брокера
            </h1>
            <div className="flex items-center gap-4 text-slate-400 font-medium text-sm sm:text-base">
              <span className="text-slate-100 font-semibold">{currentUser.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden xs:block"></span>
              <span className="font-mono bg-white/10 px-3 py-1 rounded-lg tracking-wider">ID: {currentUser.id.slice(-6)}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all w-full sm:w-auto active:scale-95 ${
              showAddForm 
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                : 'bg-white text-slate-900 hover:bg-slate-50 shadow-lg'
            }`}
          >
            {showAddForm ? 'Отменить' : <><Plus className="w-6 h-6" /> Разместить объект</>}
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="bg-white p-6 sm:p-12 rounded-[2.5rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 mb-16 overflow-hidden"
            >
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-10 pb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                Заполните карточку объекта
                <span className="text-sm font-sans font-bold bg-slate-100 text-slate-600 px-4 py-2 rounded-xl uppercase tracking-wider w-fit">Публикация в каталог</span>
              </h2>
              
              <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-slate-900 mb-3">Заголовок объявления *</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900 font-medium text-lg" placeholder="Например: Роскошный пентхаус с террасой" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Категория *</label>
                  <div className="relative">
                    <select value={type} onChange={e => setType(e.target.value as any)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none appearance-none font-bold text-slate-900 transition-all cursor-pointer text-base">
                      <option value="Квартира">Квартира</option>
                      <option value="Дом">Дом / Коттедж</option>
                      <option value="Участок">Земельный участок</option>
                      <option value="Коммерческая">Коммерческая недвижимость</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg width="14" height="10" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Стоимость (₽) *</label>
                  <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-mono text-lg text-slate-900 font-bold" placeholder="100 000 000" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Точный адрес *</label>
                  <input required type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900 font-medium" placeholder="г. Москва, ..." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Общая площадь (м²) *</label>
                  <input required type="number" step="0.1" min="0" value={area} onChange={e => setArea(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-mono text-lg text-slate-900 font-bold" placeholder="100.5" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Кол-во комнат</label>
                  <input type="number" min="1" value={rooms} onChange={e => setRooms(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-mono text-lg text-slate-900 font-bold" placeholder="Оставьте пустым если нет" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">URL обложки</label>
                  <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900 font-medium" placeholder="https://..." />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-slate-900 mb-3">Детальное описание *</label>
                  <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={7} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-y transition-all text-slate-900 font-medium leading-relaxed text-base" placeholder="Опишите все преимущества объекта, архитектуру, инфраструктуру района..."></textarea>
                </div>

                <div className="md:col-span-3 pt-6 flex justify-end">
                  <button type="submit" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 active:scale-95">
                    Опубликовать объект
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Header for List */}
        <div className="flex items-center gap-4 mb-8">
          <LayoutList className="w-6 h-6 text-slate-400" />
          <h2 className="text-2xl font-serif font-bold text-slate-900">Портфель объектов</h2>
          <span className="bg-slate-900 text-white px-3 py-1 rounded-xl text-sm font-bold shrink-0">{properties.length}</span>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <AnimatePresence mode="popLayout">
              {properties.map((property) => (
                <motion.div key={property.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, y: -20 }}>
                  <PropertyCard 
                    property={property} 
                    realtor={currentUser}
                    isOwner={true}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
            <p className="text-slate-500 text-xl font-medium mb-6">В вашем портфеле пока нет объектов</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-slate-900 font-bold hover:text-slate-700 transition-colors flex items-center justify-center gap-2 mx-auto bg-slate-100 px-8 py-4 rounded-xl"
            >
              <Plus className="w-5 h-5" /> Добавить первый объект
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
