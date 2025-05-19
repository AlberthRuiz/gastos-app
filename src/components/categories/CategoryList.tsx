import { useCategories } from "../../hooks/useCategory";
import { CategoryForm } from "./CategoryForm";
import { Category } from "../../types/category";
import { CategoryItem } from "./CategoryItem";
import { useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "../common/Modal";
import React from "react";


export const CategoryList: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSubmit = async (
    categoryData: Omit<Category, "id" | "userId" | "createdAt">
  ) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, categoryData);
      setEditingCategory(null);
    } else {
      await addCategory(categoryData);
    }
    setModalOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la categoría.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteCategory(id);
      Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Nueva Categoría
        </button>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal}
        title={editingCategory ? "Editar Categoría" : "Nueva Categoría"}
      >
        <CategoryForm
          key={editingCategory ? editingCategory.id : "new"}
          onSubmit={handleSubmit}
          initialValues={editingCategory || undefined}
          onCancel={closeModal}
        />
      </Modal>

      <div className="space-y-2">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};