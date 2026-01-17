export default function LoaderCard() {
  return (
    <div className="animate-pulse h-full flex flex-col shadow-sm rounded-xl bg-white border border-gray-300 p-6">
      
      {/* Judul */}
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Sub text */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

      {/* Baris icon + text */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>

    </div>
  );
}
