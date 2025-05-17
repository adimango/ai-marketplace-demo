import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link
          href="/search"
          className="btn bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium inline-block"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
