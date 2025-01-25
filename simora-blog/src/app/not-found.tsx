export default function NotFound() {
  return (
    <div data-testid="404-page">
      <h1 data-testid="404-title" className="text-3xl font-bold mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
    </div>
  );
}
