export default function LoadSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-2">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-teal-600 border-r-teal-600 border-b-gray-200 border-l-gray-200"></div>
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  );
}
