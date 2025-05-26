import  { useState } from 'react';
import { useIncome } from '../../hooks/useIncome';
import { useCategories } from '../../hooks/useCategory';
import { IncomeForm } from './IncomeForm';
import { IncomeItem } from './IncomeItem';
import { Income } from '../../types/income';
import { getCurrentMonth, filterByMonth } from '../../utils/helper';
import Swal from 'sweetalert2';
import { Modal } from '../common/Modal'; 

export const IncomeList: React.FC = () => {
  const { incomes, addIncome, updateIncome, deleteIncome } = useIncome();
  const { categories } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const filteredIncomes = filterByMonth(incomes, selectedMonth);

  const handleSubmit = async (incomeData: Omit<Income, 'id' | 'userId' | 'createdAt'>) => {
    if (editingIncome) {
      await updateIncome(editingIncome.id, incomeData);
      setEditingIncome(null);
    } else {
      await addIncome(incomeData);
    }
    setModalOpen(false);
  };

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el ingreso.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteIncome(id);
      Swal.fire("Eliminado", "El ingreso ha sido eliminado.", "success");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIncome(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ingresos</h2>
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setEditingIncome(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Nuevo Ingreso
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingIncome ? "Editar Ingreso" : "Nuevo Ingreso"}
      >
        <IncomeForm
          key={editingIncome ? editingIncome.id : "new"}
          onSubmit={handleSubmit}
          initialValues={editingIncome || undefined}
          onCancel={closeModal}
        />
      </Modal>

      <div className="space-y-2">
        {filteredIncomes.map((income) => (
          <IncomeItem
            key={income.id}
            income={income}
            category={categories.find(cat => cat.id === income.categoryId)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};