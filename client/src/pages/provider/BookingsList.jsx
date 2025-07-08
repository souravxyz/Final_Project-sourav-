import BookingCard from "./BookingCard";

export default function BookingsList({ darkMode, paginatedRows }) {
  return (
    <div className="space-y-3">
      {paginatedRows.map((booking) => (
        <BookingCard key={booking._id} booking={booking} darkMode={darkMode} />
      ))}
    </div>
  );
}
