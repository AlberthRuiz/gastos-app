import { Expense } from '../../types/expense';
import { Category } from '../../types/category';
import { formatCurrency, formatDate, ICONS } from '../../utils/helper';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface ExpenseItemProps {
    expense: Expense;
    category?: Category;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
    expense,
    category,
    onEdit,
    onDelete
}) => {
    const typeColorClass = category?.type === "income"
        ? "bg-green-500"
        : "bg-red-500";

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-3 border-l-4 border-l-gray-800 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${typeColorClass}`} />
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    {category && (() => {
                        const IconComponent = ICONS.find((icon) => icon.name === category.icon)?.icon;
                        return IconComponent ? <IconComponent /> : null;
                    })()}
                </div>
                <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatDate(expense.date)}</span>
                        {category && <span>• {category.name}</span>}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-red-600 min-w-[90px] text-right">
                    {formatCurrency(expense.amount)}
                </span>
                <button
                    onClick={() => onEdit(expense)}
                    className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-blue-600 rounded-full transition-colors"
                    aria-label="Editar"
                >
                    <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-full transition-colors"
                    aria-label="Eliminar"
                >
                    <FiTrash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};