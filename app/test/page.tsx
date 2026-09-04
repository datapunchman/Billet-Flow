"use client";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <h1 className="text-white text-2xl mb-8">Layout Diagnostic Test</h1>

      {/* Test 1: Basic Grid */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 1: Grid 3 Columns</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-red-500 p-4 text-white">ONE</div>
          <div className="bg-green-500 p-4 text-white">TWO</div>
          <div className="bg-blue-500 p-4 text-white">THREE</div>
        </div>
      </div>

      {/* Test 2: Flex */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 2: Flex</h2>
        <div className="flex gap-6">
          <div className="bg-yellow-500 p-4 text-black">LEFT</div>
          <div className="bg-purple-500 p-4 text-white">RIGHT</div>
        </div>
      </div>

      {/* Test 3: Max Width Container */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 3: Max Width Container</h2>
        <div className="mx-auto max-w-7xl bg-orange-500 p-4 text-white">
          This should be constrained to max-w-7xl (1280px)
        </div>
      </div>

      {/* Test 4: Two Column Grid (Like Hero) */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 4: Two Column Grid (lg:grid-cols-2)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-pink-500 p-8 text-white">
            <h3 className="text-2xl mb-4">Left Column</h3>
            <p>This should be on the left on desktop</p>
          </div>
          <div className="bg-cyan-500 p-8 text-white">
            <h3 className="text-2xl mb-4">Right Column</h3>
            <p>This should be on the right on desktop</p>
          </div>
        </div>
      </div>

      {/* Test 5: Feature Cards Grid */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 5: Feature Cards (lg:grid-cols-3)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="bg-indigo-500 p-6 text-white rounded-lg">
              Feature {num}
            </div>
          ))}
        </div>
      </div>

      {/* Test 6: Stats Grid (4 columns) */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 6: Stats Grid (md:grid-cols-2 lg:grid-cols-4)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bg-emerald-500 p-6 text-white rounded-lg text-center">
              Stat {num}
            </div>
          ))}
        </div>
      </div>

      {/* Test 7: Container App Class */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Test 7: .container-app custom class</h2>
        <div className="container-app bg-rose-500 p-4 text-white">
          This uses .container-app (should be max-width 1280px with horizontal padding)
        </div>
      </div>
    </div>
  );
}
