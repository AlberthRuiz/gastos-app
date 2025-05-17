import { Category } from "../../types/category";

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
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 rounded-full" />
        <div>
          <p className="font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-500">
            {category.type === "income" ? "Ingreso" : "Gasto"}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
