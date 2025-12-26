export default function BlurredHospitalCard() {
  return (
    <div className="relative border rounded-xl bg-white overflow-hidden">
      <div className="p-6 blur-sm">
        <div className="h-4 bg-gray-300 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded mb-1" />
        <div className="h-3 bg-gray-200 rounded" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white/70">
        <div className="text-center">
          <p className="font-semibold text-sm">
            🔒 Premium subscription required
          </p>
          <button className="mt-2 text-blue-600 text-sm underline">
            Upgrade now
          </button>
        </div>
      </div>
    </div>
  );
}
