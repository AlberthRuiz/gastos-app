import { useState, useEffect, useCallback } from 'react';
import { Category } from '../types/category';
import { db } from '../utils/firebase';
import { 
  collection, 
  query,
  where,
  addDoc, 
  updateDoc,
  deleteDoc, 
  doc, 
  serverTimestamp, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { useAuth } from './userAuth';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Función para cargar categorías en tiempo real usando onSnapshot
  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Crear la consulta para obtener categorías del usuario actual
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('userId', '==', user.id));
    
    // Configurar listener en tiempo real
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Transformar la marca de tiempo a string si es necesario
          const createdAt = data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate().toISOString() 
            : data.createdAt;
            
          return {
            id: doc.id,
            name: data.name,
            icon: data.icon,
            type: data.type,
            userId: data.userId,
            createdAt
          } as Category;
        });
        
        setCategories(categoriesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error cargando categorías:', err);
        setError('Error al cargar categorías. Por favor intenta de nuevo.');
        setLoading(false);
      }
    );
    

    return () => unsubscribe();
  }, [user]);

  const addCategory = useCallback(async (categoryData: Omit<Category, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return null;
    
    try {
      const newCategoryRef = await addDoc(collection(db, 'categories'), {
        ...categoryData,
        userId: user.id,
        createdAt: serverTimestamp()
      });
      
      return newCategoryRef.id;
    } catch (err) {
      console.error('Error al agregar categoría:', err);
      setError('Error al agregar la categoría. Por favor intenta de nuevo.');
      return null;
    }
  }, [user]);

  const updateCategory = useCallback(async (
    id: string, 
    categoryData: Omit<Category, 'id' | 'userId' | 'createdAt'>
  ) => {
    if (!user) return false;
    
    try {
      const categoryRef = doc(db, 'categories', id);
      await updateDoc(categoryRef, {
        ...categoryData,
      });
      
      return true;
    } catch (err) {
      console.error('Error al actualizar categoría:', err);
      setError('Error al actualizar la categoría. Por favor intenta de nuevo.');
      return false;
    }
  }, [user]);

  const deleteCategory = useCallback(async (id: string) => {
    if (!user) return false;
    
    try {
      const categoryRef = doc(db, 'categories', id);
      await deleteDoc(categoryRef);
      
      return true;
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      setError('Error al eliminar la categoría. Por favor intenta de nuevo.');
      return false;
    }
  }, [user]);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory
  };
};