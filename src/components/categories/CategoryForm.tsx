import { useState } from 'react';
import { Category } from "../../types/category";
import { FaTag, FaUtensils, FaCar, FaHome, FaShoppingCart, FaMoneyBillWave, FaHeart, FaPlane } from "react-icons/fa";

const ICONS = [
  { name: "FaTag", icon: FaTag, color: "#6366f1" },           // Indigo
  { name: "FaUtensils", icon: FaUtensils, color: "#f59e42" }, // Orange
  { name: "FaCar", icon: FaCar, color: "#22d3ee" },           // Cyan
  { name: "FaHome", icon: FaHome, color: "#10b981" },         // Green
  { name: "FaShoppingCart", icon: FaShoppingCart, color: "#f43f5e" }, // Pink
  { name: "FaMoneyBillWave", icon: FaMoneyBillWave, color: "#84cc16" }, // Lime
  { name: "FaHeart", icon: FaHeart, color: "#ef4444" },       // Red
  { name: "FaPlane", icon: FaPlane, color: "#3b82f6" },       // Blue
];

interface CategoryFormProps {
  onSubmit: (category: Omit<Category, 'id' | 'userId' | 'createdAt'>) => void;
  initialValues?: Partial<Category>;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialValues, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [type, setType] = useState<'income' | 'expense'>(initialValues?.type || 'expense');
  const [icon, setIcon] = useState(initialValues?.icon || 'FaTag');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name,type, icon });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de la categoría
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Icono
        </label>
        <div className="flex space-x-3">
            {ICONS.map(({ name, icon: IconComponent, color }) => (
            <button
              type="button"
              key={name}
              onClick={() => setIcon(name)}
              className={`p-2 rounded ${icon === name ? 'ring-2 ring-blue-500' : ''}`}
              aria-label={name}
            >
              <IconComponent size={28} color={color} />
            </button>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Tipo
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialValues ? 'Actualizar' : 'Crear'} Categoría
        </button>
      </div>
    </form>
  );
};