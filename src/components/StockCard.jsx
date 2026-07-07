export default function StockCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: color }}>
      <h2 className="text-gray-500 text-lg">{title}</h2>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
}