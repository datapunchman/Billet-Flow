export default function TailwindTest() {
  return (
    <div className="bg-gray-900 text-white p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Tailwind CSS Test</h1>

      {/* Test 1: Grid */}
      <div className="mb-12">
        <h2 className="text-xl mb-4">Test 1: Grid (should show 3 columns)</h2>
        <div className="grid grid-cols-3 gap-4 bg-red-900 p-4">
          <div className="bg-blue-500 p-4">ONE</div>
          <div className="bg-blue-500 p-4">TWO</div>
          <div className="bg-blue-500 p-4">THREE</div>
        </div>
      </div>

      {/* Test 2: Flex */}
      <div className="mb-12">
        <h2 className="text-xl mb-4">Test 2: Flex (should show horizontal)</h2>
        <div className="flex gap-4 bg-red-900 p-4">
          <div className="bg-green-500 p-4">ONE</div>
          <div className="bg-green-500 p-4">TWO</div>
        </div>
      </div>

      {/* Test 3: Max Width */}
      <div className="mb-12">
        <h2 className="text-xl mb-4">Test 3: Max-width (should be constrained)</h2>
        <div className="mx-auto w-full max-w-md bg-purple-500 p-4">
          TEST CONTAINER - Should be max 448px wide
        </div>
      </div>

      {/* Test 4: Responsive Grid */}
      <div className="mb-12">
        <h2 className="text-xl mb-4">Test 4: Responsive Grid (1 col mobile, 3 col desktop)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-red-900 p-4">
          <div className="bg-yellow-500 p-4">A</div>
          <div className="bg-yellow-500 p-4">B</div>
          <div className="bg-yellow-500 p-4">C</div>
        </div>
      </div>

      {/* Test 5: 12-column grid like Hero */}
      <div className="mb-12">
        <h2 className="text-xl mb-4">Test 5: 12-column grid (5+7 like Hero)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-red-900 p-4">
          <div className="lg:col-span-5 bg-blue-500 p-4">
            LEFT - 5 columns
          </div>
          <div className="lg:col-span-7 bg-green-500 p-4">
            RIGHT - 7 columns
          </div>
        </div>
      </div>
    </div>
  );
}
