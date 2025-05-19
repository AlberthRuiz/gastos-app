import React from 'react';
import { Layout } from '../components/common/Layout';
import { ExpensesList } from '../components/expenses/ExpenseList';

export const Expenses: React.FC = () => {
  return (
    <Layout>
      <ExpensesList />
    </Layout>
  );
};