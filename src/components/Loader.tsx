export default function Loader({ text = "Loading..." }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-600"></div>
      <div className="mt-4 text-xl font-semibold text-gray-600">{text}</div>
    </div>
  );
}
