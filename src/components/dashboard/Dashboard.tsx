import React, { useState, useMemo } from 'react';
import { BalanceCard } from './BlanceCard';
import { useExpenses } from '../../hooks/useExpense';
import { useIncome } from '../../hooks/useIncome';
import { filterByMonth, getCurrentMonth, formatCurrency } from '../../utils/helper';
import { Balance } from '../../types/balance';

export const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const { expenses } = useExpenses();
  const { incomes } = useIncome();

  const balance: Balance = useMemo(() => {
    const monthExpenses = filterByMonth(expenses, selectedMonth);
    const monthIncomes = filterByMonth(incomes, selectedMonth);

    const totalExpenses = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = monthIncomes.reduce((sum, income) => sum + income.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [expenses, incomes, selectedMonth]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <BalanceCard balance={balance} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Últimos Ingresos</h3>
          <ul className="space-y-2">
            {filterByMonth(incomes, selectedMonth).slice(0, 5).map((income) => (
              <li key={income.id} className="flex justify-between items-center">
                <span className="text-gray-700">{income.description}</span>
                <span className="text-green-600 font-medium">
                  {formatCurrency(income.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Últimos Gastos</h3>
          <ul className="space-y-2">
            {filterByMonth(expenses, selectedMonth).slice(0, 5).map((expense) => (
              <li key={expense.id} className="flex justify-between items-center">
                <span className="text-gray-700">{expense.description}</span>
                <span className="text-red-600 font-medium">
                  {formatCurrency(expense.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};