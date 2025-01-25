export default function Error500Page() {
  return (
    <div data-testid="500-page">
      <h1 data-testid="500-title" className="text-3xl font-bold mb-4">
        Server Error
      </h1>
      <p className="text-gray-600">Something went wrong on our end. Please try again later.</p>
    </div>
  );
}
