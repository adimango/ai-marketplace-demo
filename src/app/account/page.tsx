'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { useFavorites } from '@/components/SimpleFavoritesProvider';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  condition: string;
  images: string[];
}

export default function AccountPage() {
  // All hooks must be called on every render in the same order
  // First, define all component state
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Always call hooks - even if we don't use their values before mounting
  const { data: session, status } = useSession();
  const { favorites } = useFavorites();
  
  // Use effect to handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not logged in, redirect to sign-in
  const router = useRouter();
  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router, mounted]);

  // Fetch favorite products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        // Filter products to only include favorites
        const favoriteProducts = data.filter((product: Product) =>
          favorites.includes(product.id)
        );
        setProducts(favoriteProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // For demo purposes, we'll use this fallback approach
        // to load products from the data file when the API route isn't available
        import('@/data/products.json').then((module) => {
          const favoriteProducts = module.default.filter((product: Product) =>
            favorites.includes(product.id)
          );
          setProducts(favoriteProducts);
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchProducts();
    } else {
      setIsLoading(false);
    }
  }, [favorites]);

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                      {session?.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {session?.user?.name || 'User'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {session?.user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    <Link
                      href="/account"
                      className="flex items-center px-3 py-2 bg-teal-50 text-teal-700 rounded-md font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Favorites
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Orders
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Favorite Items
                </h2>

                {favorites.length === 0 ? (
                  <div className="py-8 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start browsing and add items to your favorites
                    </p>
                    <Link
                      href="/search"
                      className="btn bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium inline-block"
                    >
                      Browse Items
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        condition={product.condition}
                        images={product.images}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
