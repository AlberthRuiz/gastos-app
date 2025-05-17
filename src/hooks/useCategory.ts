import { useEffect, useState } from "react";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Category } from "../types/category";
import { useAuth } from "./userAuth";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      setCategories([]);
      
      if (!user || !user.id) {

        setLoading(false);
        return;
      }

      try {

        const userId = String(user.id).trim();


        const categoriesRef = collection(db, "categories");
        const q = query(
          categoriesRef,
          where("userId", "==", userId)

        );

        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        
        const sortedDocs = docs.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        
        setCategories(sortedDocs);
      } catch (err: any) {

        setError(err instanceof Error ? err : new Error("Error de firebase"));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user]);

  const addCategory = async (categoryData: Omit<Category, "id" | "userId" | "createdAt">) => {
    if (!user || !user.id) {
      console.error("No user ID available for adding category");
      return;
    }
    
    try {
      setError(null);
      const userId = String(user.id).trim();
      
      const docRef = await addDoc(collection(db, "categories"), {
        ...categoryData,
        userId: userId,
        createdAt: new Date().toISOString(),
      });
      
      console.log("Category added with ID:", docRef.id);
      return docRef.id;
    } catch (err: any) {
      console.error("Error adding category:", err);
      setError(err instanceof Error ? err : new Error("Error de firebase"));
      throw err;
    }
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    try {
      setError(null);
      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, data);
    } catch (err: any) {
      console.error("Error updating category:", err);
      setError(err instanceof Error ? err : new Error("Error de firebase"));
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setError(null);
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);
    } catch (err: any) {
      console.error("Error deleting category:", err);
      setError(err instanceof Error ? err : new Error("Error de firebase"));
      throw err;
    }
  };

  return { categories, loading, error, addCategory, updateCategory, deleteCategory };
}