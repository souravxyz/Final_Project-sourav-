// components/MyBookings/StatusBadge.jsx
export default function StatusBadge({ status, darkMode }) {
  const getStatusColors = () => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          bg: "bg-emerald-500/10",
          text: "text-emerald-500",
        };
      case "cancelled":
        return {
          bg: "bg-red-500/10",
          text: "text-red-500",
        };
      case "confirmed":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-500",
        };
      case "pending":
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-500",
        };
      case "in_progress":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-500",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-500",
        };
    }
  };

  const colors = getStatusColors();

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
