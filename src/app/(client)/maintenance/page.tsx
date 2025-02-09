export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            We're upgrading our systems
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We're working hard to bring you an even better experience. We'll be
            back soon!
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Estimated completion
              </span>
            </div>
          </div>
          <div className="text-center text-2xl font-semibold text-gray-900">
            2 hours
          </div>
        </div>
      </div>
      <footer className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
