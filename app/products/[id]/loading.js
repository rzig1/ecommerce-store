// app/products/[id]/loading.js

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Layout 2 colonnes skeleton */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>

        {/* Info skeleton */}
        <div className="space-y-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-1/4"></div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          <div className="space-y-3">
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}