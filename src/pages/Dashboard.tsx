import React, { useState, useEffect } from 'react';
import { getRealtors, saveRealtor, getProperties, saveProperty, deleteProperty } from '../store';
import { Property, Realtor } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Plus, LayoutList } from 'lucide-react';

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
    if (currentUser) {
      loadMyProperties();
    }
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
        alert('Пользователь не найден. Зарегистрируйтесь.');
      }
    } else {
      if (realtors.some(r => r.phone === phone)) {
        alert('Пользователь с таким номером уже существует.');
        return;
      }
      const newUser: Realtor = {
        id: Date.now().toString(),
        name,
        phone,
        telegram
      };
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
    
    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setAddress('');
    setRooms('');
    setArea('');
    setImageUrl('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить объект?')) {
      deleteProperty(id);
      loadMyProperties();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isLogin ? 'Вход для риэлторов' : 'Регистрация риэлтора'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Иванов Иван"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
              <input 
                type="tel" 
                required 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="+7 (999) 000-00-00"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telegram (опционально)</label>
                <input 
                  type="text" 
                  value={telegram} 
                  onChange={e => setTelegram(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="@username"
                />
              </div>
            )}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutList className="w-6 h-6 text-blue-600" />
            Мои объекты
          </h1>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Отмена' : <><Plus className="w-4 h-4" /> Добавить объект</>}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Новый объект недвижимости
            </h2>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Например: Уютная 2-комнатная квартира" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тип недвижимости</label>
                <select value={type} onChange={e => setType(e.target.value as any)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white">
                  <option value="Квартира">Квартира</option>
                  <option value="Дом">Дом</option>
                  <option value="Участок">Участок</option>
                  <option value="Коммерческая">Коммерческая</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽)</label>
                <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10000000" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                <input required type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="г. Москва, ул. Пушкина, д. 10" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label>
                <input required type="number" step="0.1" min="0" value={area} onChange={e => setArea(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="50.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Количество комнат (опционально)</label>
                <input type="number" min="1" value={rooms} onChange={e => setRooms(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL фотографии</label>
                <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
                <p className="text-xs text-gray-500 mt-1">Оставьте пустым для использования стандартной картинки</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Подробное описание объекта..."></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Сохранить и опубликовать
                </button>
              </div>
            </form>
          </div>
        )}

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                realtor={currentUser}
                isOwner={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg mb-4">У вас пока нет добавленных объектов</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="text-blue-600 font-medium hover:underline"
            >
              Добавить первый объект
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
