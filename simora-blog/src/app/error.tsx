'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div data-testid="500-page" className="max-w-2xl mx-auto p-4">
      <h1 data-testid="500-title" className="text-3xl font-bold mb-4">
        Server Error
      </h1>
      <p className="text-gray-600 mb-4">
        {error.message || 'Something went wrong on our end. Please try again later.'}
      </p>
      <button
        onClick={() => reset()}
        className="bg-simora-blue text-white px-4 py-2 rounded-md hover:bg-simora-blue/90"
      >
        Try Again
      </button>
    </div>
  );
}
