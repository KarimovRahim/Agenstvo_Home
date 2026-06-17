export type Realtor = {
  id: string;
  name: string;
  phone: string;
  telegram: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'Квартира' | 'Дом' | 'Участок' | 'Коммерческая';
  address: string;
  rooms?: number;
  area: number;
  imageUrl: string;
  realtorId: string;
  createdAt: number;
};
