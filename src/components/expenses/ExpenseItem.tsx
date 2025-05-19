import React from 'react';
import { Expense } from '../../types/expense';
import { Category } from '../../types/category';
import { formatCurrency, formatDate } from '../../utils/helper';

interface ExpenseItemProps {
    expense: Expense;
    category?: Category;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, category, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
                {category && (
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: category.type === "income" ? "#22c55e" : "#ef4444"
                        }}
                    />
                )}
                <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatDate(expense.date)}</span>
                        {category && <span>• {category.name}</span>}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-red-600">
                    {formatCurrency(expense.amount)}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 transition"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};