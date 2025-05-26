import React from 'react';
import { Balance } from '../../types/balance';
import { formatCurrency } from '../../utils/helper';

interface BalanceCardProps {
  balance: Balance;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const isPositive = balance.balance >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Balance del Mes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Ingresos</p>
          <p className="text-xl font-semibold text-green-600">
            {formatCurrency(balance.totalIncome)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Gastos</p>
          <p className="text-xl font-semibold text-red-600">
            {formatCurrency(balance.totalExpenses)}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isPositive ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <p className="text-sm text-gray-600">Balance</p>
          <p className={`text-xl font-semibold ${isPositive ? 'text-blue-600' : 'text-orange-600'}`}>
            {formatCurrency(balance.balance)}
          </p>
        </div>
      </div>
    </div>
  );
};