import { Category } from "../../types/category";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { ICONS } from "../../utils/helper";

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const typeColorClass = category.type === "income"
    ? "bg-green-500"
    : "bg-red-500";
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-3 border-l-4 border-l-gray-800 hover:shadow-lg transition-all">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${typeColorClass}`} />
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          {(() => {
            const IconComponent = ICONS.find((icon) => icon.name === category.icon)?.icon;
            return IconComponent ? <IconComponent /> : null;
          })()}
        </div>
        <div>
          <p className="font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-500">
            {category.type === "income" ? "Ingreso" : "Gasto"}
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(category)}
          className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-blue-600 rounded-full transition-colors"
          aria-label="Editar"
        >
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-red-600 rounded-full transition-colors"
          aria-label="Eliminar"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};