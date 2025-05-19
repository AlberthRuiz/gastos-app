import React, { useState } from 'react';
import { useExpenses } from '../../hooks/useExpense';
import { useCategories } from '../../hooks/useCategory';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseItem } from './ExpenseItem';
import { Expense } from '../../types/expense';
import { getCurrentMonth, filterByMonth } from '../../utils/helper';

export const ExpensesList: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      await deleteExpense(id);
    }
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
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Nuevo Gasto
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
          </h3>
          <ExpenseForm
            onSubmit={handleSubmit}
            initialValues={editingExpense || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
          />
        </div>
      )}

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