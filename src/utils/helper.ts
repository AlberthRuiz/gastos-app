import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaTag, FaUtensils, FaCar, FaHome, FaShoppingCart, FaMoneyBillWave, FaHeart, FaPlane } from "react-icons/fa";

export const ICONS = [
  { name: "FaTag", icon: FaTag, color: "#6366f1" },           
  { name: "FaUtensils", icon: FaUtensils, color: "#f59e42" },
  { name: "FaCar", icon: FaCar, color: "#22d3ee" },
  { name: "FaHome", icon: FaHome, color: "#10b981" },
  { name: "FaShoppingCart", icon: FaShoppingCart, color: "#f43f5e" },
  { name: "FaMoneyBillWave", icon: FaMoneyBillWave, color: "#84cc16" },
  { name: "FaHeart", icon: FaHeart, color: "#ef4444" },
  { name: "FaPlane", icon: FaPlane, color: "#3b82f6" },
];


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: es });
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};

export const filterByMonth = <T extends { date: string }>(
  items: T[],
  month: string
): T[] => {
  return items.filter(item => item.date.startsWith(month));
};