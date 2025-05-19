import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Expense } from '../types/expense';
import { useAuth } from './userAuth';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', user.id),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expensesData: Expense[] = [];
        snapshot.forEach((doc) => {
          expensesData.push({ id: doc.id, ...doc.data() } as Expense);
        });
        setExpenses(expensesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    try {
      setError(null);
      await addDoc(collection(db, 'expenses'), {
        ...expenseData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateExpense = async (id: string, data: Partial<Expense>) => {
    try {
      setError(null);
      const expenseRef = doc(db, 'expenses', id);
      await updateDoc(expenseRef, data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setError(null);
      const expenseRef = doc(db, 'expenses', id);
      await deleteDoc(expenseRef);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense };
};