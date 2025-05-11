export interface Category {
  id: string;
  name: string;
  color: string;
  type: 'income' | 'expense';
  userId: string;
  createdAt: string;
}