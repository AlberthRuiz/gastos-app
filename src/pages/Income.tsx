import React from 'react';
import { Layout } from '../components/common/Layout';
import { IncomeList } from '../components/income/IncomeList';

export const Income: React.FC = () => {
  return (
    <Layout>
      <IncomeList />
    </Layout>
  );
};