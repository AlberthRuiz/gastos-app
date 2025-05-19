import React from 'react';
import { Income } from '../../types/income';
import { Category } from '../../types/category';
import { formatCurrency, formatDate } from '../../utils/helper';

interface IncomeItemProps {
  income: Income;
  category?: Category;
  onEdit: (income: Income) => void;
  onDelete: (id: string) => void;
}

export const IncomeItem: React.FC<IncomeItemProps> = ({ income, category, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {category && (
          <div 
            className="w-3 h-3 rounded-full"
          />
        )}
        <div>
          <p className="font-medium text-gray-900">{income.description}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{formatDate(income.date)}</span>
            {category && <span>• {category.name}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold text-green-600">
          {formatCurrency(income.amount)}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(income)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(income.id)}
            className="text-red-600 hover:text-red-800 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};