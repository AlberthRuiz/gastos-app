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
import { Category } from '../types/category';
import { useAuth } from './userAuth';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'categories'),
      where('userId', '==', user.id),
      orderBy('name')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const categoriesData: Category[] = [];
        snapshot.forEach((doc) => {
          categoriesData.push({ id: doc.id, ...doc.data() } as Category);
        });
        setCategories(categoriesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addCategory = async (categoryData: Omit<Category, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    try {
      setError(null);
      await addDoc(collection(db, 'categories'), {
        ...categoryData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    try {
      setError(null);
      const categoryRef = doc(db, 'categories', id);
      await updateDoc(categoryRef, data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setError(null);
      const categoryRef = doc(db, 'categories', id);
      await deleteDoc(categoryRef);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { categories, loading, error, addCategory, updateCategory, deleteCategory };
};