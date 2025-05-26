import React, { useState } from 'react';
import { useExpenses } from '../../hooks/useExpense';
import { useCategories } from '../../hooks/useCategory';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseItem } from './ExpenseItem';
import { Expense } from '../../types/expense';
import { getCurrentMonth, filterByMonth } from '../../utils/helper';
import Swal from 'sweetalert2';
import { Modal } from '../common/Modal'; // Asegúrate de tener este componente

export const ExpensesList: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const filteredExpenses = filterByMonth(expenses, selectedMonth);

  const handleSubmit = async (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      await addExpense(expenseData);
    }
    setModalOpen(false);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el gasto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteExpense(id);
      Swal.fire("Eliminado", "El gasto ha sido eliminado.", "success");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gastos</h2>
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setEditingExpense(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Nuevo Gasto
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingExpense ? "Editar Gasto" : "Nuevo Gasto"}
      >
        <ExpenseForm
          key={editingExpense ? editingExpense.id : "new"}
          onSubmit={handleSubmit}
          initialValues={editingExpense || undefined}
          onCancel={closeModal}
        />
      </Modal>

      <div className="space-y-2">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            category={categories.find(cat => cat.id === expense.categoryId)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};