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
import { Income } from '../types/income';
import { useAuth } from './userAuth';

export const useIncome = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setIncomes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'incomes'),
      where('userId', '==', user.id),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const incomesData: Income[] = [];
        snapshot.forEach((doc) => {
          incomesData.push({ id: doc.id, ...doc.data() } as Income);
        });
        setIncomes(incomesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addIncome = async (incomeData: Omit<Income, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    try {
      setError(null);
      await addDoc(collection(db, 'incomes'), {
        ...incomeData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateIncome = async (id: string, data: Partial<Income>) => {
    try {
      setError(null);
      const incomeRef = doc(db, 'incomes', id);
      await updateDoc(incomeRef, data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      setError(null);
      const incomeRef = doc(db, 'incomes', id);
      await deleteDoc(incomeRef);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { incomes, loading, error, addIncome, updateIncome, deleteIncome };
};