import {
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

export const getStatusIcon = (status) => {
  const statusLower = status.toLowerCase();

  const icons = {
    confirmed: <FiCheckCircle className="text-blue-400" />,
    cancelled: <FiXCircle className="text-red-400" />,
    pending: <FiLoader className="text-yellow-400 animate-spin" />,
  };

  return icons[statusLower] || <FiAlertTriangle className="text-gray-400" />;
};

// Optional: Export status colors for consistent styling
export const statusColors = {
  confirmed: "from-blue-500 to-indigo-600",
  cancelled: "from-red-500 to-rose-600",
  pending: "from-amber-500 to-yellow-600",
};
