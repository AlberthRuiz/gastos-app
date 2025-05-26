import React from 'react';
import { Layout } from '../components/common/Layout';
import { Dashboard } from '../components/dashboard/Dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};