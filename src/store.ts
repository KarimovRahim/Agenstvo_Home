import { Realtor, Property } from './types';
import imgLuxuryApt from './assets/images/luxury_apt_living_1781703671930.jpg';
import imgSuburbanHouse from './assets/images/suburban_house_1781703692956.jpg';
import imgCozyStudio from './assets/images/cozy_studio_1781703711669.jpg';
import imgCommercial from './assets/images/commercial_office_1781703733651.jpg';
import imgLandPlot from './assets/images/land_plot_1781703758674.jpg';
import imgPenthouse from './assets/images/penthouse_city_1781703779972.jpg';
import imgLoft from './assets/images/industrial_loft_1781703798023.jpg';
import imgVilla from './assets/images/luxury_villa_1781703817905.jpg';
import imgTownhouse from './assets/images/classic_townhouse_1781703844695.jpg';
import imgTechApt from './assets/images/modern_hightech_apt_1781703876188.jpg';

// Initial Mock Data
const MOCK_REALTORS: Realtor[] = [
  { id: '1', name: 'Анна Смирнова', phone: '+7 (999) 123-45-67', telegram: '@anna_realty' },
  { id: '2', name: 'Иван Иванов', phone: '+7 (999) 987-65-43', telegram: '@ivan_estate' },
  { id: '3', name: 'Елена Соколова', phone: '+7 (903) 555-12-34', telegram: '@elena_lux' },
  { id: '4', name: 'Дмитрий Морозов', phone: '+7 (916) 777-88-99', telegram: '@dmitry_vladis' }
];

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Роскошная 4-комнатная квартира в Хамовниках',
    description: 'Эксклюзивное предложение. Дизайнерский ремонт, панорамные окна, дорогая отделка и мебель премиум-класса. Закрытая охраняемая территория.',
    price: 85000000,
    type: 'Квартира',
    address: 'г. Москва, ул. Остоженка, 25',
    rooms: 4,
    area: 165,
    imageUrl: imgLuxuryApt,
    realtorId: '3',
    createdAt: Date.now() - 100000
  },
  {
    id: '2',
    title: 'Современный загородный дом у леса',
    description: 'Двухэтажный дом с предчистовой отделкой. Панорамное остекление, высокие потолки, теплые полы. Все коммуникации централизованные.',
    price: 32000000,
    type: 'Дом',
    address: 'пос. Барвиха, Лесной проезд, 14',
    rooms: 6,
    area: 320,
    imageUrl: imgSuburbanHouse,
    realtorId: '2',
    createdAt: Date.now() - 50000
  },
  {
    id: '3',
    title: 'Уютная студия рядом с метро',
    description: 'Светлая студия с качественным ремонтом и эргономичной планировкой. Идеально под сдачу в аренду или для студента.',
    price: 9500000,
    type: 'Квартира',
    address: 'г. Москва, проспект Мира, 102',
    rooms: 1,
    area: 32.5,
    imageUrl: imgCozyStudio,
    realtorId: '1',
    createdAt: Date.now() - 85000
  },
  {
    id: '4',
    title: 'Видовой офисный блок в Москва-Сити',
    description: 'Офисное пространство open-space с несколькими переговорными комнатами. Панорамный вид на реку.',
    price: 155000000,
    type: 'Коммерческая',
    address: 'г. Москва, Пресненская наб., 12',
    area: 250,
    imageUrl: imgCommercial,
    realtorId: '4',
    createdAt: Date.now() - 120000
  },
  {
    id: '5',
    title: 'Земельный участок у водоема',
    description: 'Участок правильной формы в охраняемом коттеджном поселке. Отличная транспортная доступность, газ и электричество по границе.',
    price: 18500000,
    type: 'Участок',
    address: 'д. Жуковка, ул. Речная, 5',
    area: 1500,
    imageUrl: imgLandPlot,
    realtorId: '2',
    createdAt: Date.now() - 25000
  },
  {
    id: '6',
    title: 'Пентхаус с террасой и видом на Кремль',
    description: 'Уникальный двухуровневый пентхаус. Собственная терраса на крыше, дровяной камин, система "Умный дом".',
    price: 450000000,
    type: 'Квартира',
    address: 'г. Москва, Тверская ул., 3',
    rooms: 5,
    area: 420,
    imageUrl: imgPenthouse,
    realtorId: '3',
    createdAt: Date.now() - 60000
  },
  {
    id: '7',
    title: 'Стильный лофт на территории бывшей фабрики',
    description: 'Аутентичный лофт с высокими потолками 4.5м, открытая кирпичная кладка, панорамные окна в пол. Подходит для творческой мастерской.',
    price: 42000000,
    type: 'Квартира',
    address: 'г. Москва, пер. Расковой, 14',
    rooms: 2,
    area: 130,
    imageUrl: imgLoft,
    realtorId: '1',
    createdAt: Date.now() - 90000
  },
  {
    id: '8',
    title: 'Трехуровневая вилла с бассейном',
    description: 'Престижное направление. Закрытый поселок на 15 домов. На участке ландшафтный дизайн, собственный SPA-комплекс и переливной бассейн.',
    price: 210000000,
    type: 'Дом',
    address: 'пос. Николина Гора, ул. Элитная, 1',
    rooms: 8,
    area: 750,
    imageUrl: imgVilla,
    realtorId: '4',
    createdAt: Date.now() - 40000
  },
  {
    id: '9',
    title: 'Классический таунхаус в тихом районе',
    description: 'Светлый таунхаус с камином и небольшим внутренним двориком. Кирпичные стены, отличная шумоизоляция.',
    price: 52000000,
    type: 'Дом',
    address: 'г. Москва, ул. Серебряный бор, 21',
    rooms: 4,
    area: 210,
    imageUrl: imgTownhouse,
    realtorId: '1',
    createdAt: Date.now() - 150000
  },
  {
    id: '10',
    title: 'Умная хай-тек квартира',
    description: 'Квартира с полной интеграцией системы "Умный дом", голосовым управлением и современной встроенной техникой.',
    price: 28000000,
    type: 'Квартира',
    address: 'г. Москва, Шелепихинская наб., 34',
    rooms: 3,
    area: 95,
    imageUrl: imgTechApt,
    realtorId: '2',
    createdAt: Date.now() - 30000
  }
];

export const getRealtors = (): Realtor[] => {
  const data = localStorage.getItem('realtors');
  return data ? JSON.parse(data) : MOCK_REALTORS;
};

export const getProperties = (): Property[] => {
  const data = localStorage.getItem('properties');
  return data ? JSON.parse(data) : MOCK_PROPERTIES;
};

export const saveRealtor = (realtor: Realtor) => {
  const realtors = getRealtors();
  realtors.push(realtor);
  localStorage.setItem('realtors', JSON.stringify(realtors));
};

export const saveProperty = (property: Property) => {
  const properties = getProperties();
  properties.push(property);
  localStorage.setItem('properties', JSON.stringify(properties));
};

export const deleteProperty = (id: string) => {
  let properties = getProperties();
  properties = properties.filter(p => p.id !== id);
  localStorage.setItem('properties', JSON.stringify(properties));
};
