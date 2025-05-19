export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'income' | 'expense';
  userId: string;
  createdAt: string;
}

