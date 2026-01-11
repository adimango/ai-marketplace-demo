'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Create a simple header that doesn't use authentication initially
// This avoids the useSession hook issues
export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // We'll check authentication status after mount and periodically
  useEffect(() => {
    setMounted(true);

    // Check authentication status using a fetch request instead of useSession hook
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        setIsLoggedIn(!!session?.user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    }

    // Check immediately on mount
    checkAuth();

    // Also set up an event listener for storage changes
    // This helps catch auth state changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'next-auth.session-token' ||
        e.key === '__Secure-next-auth.session-token'
      ) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also periodically check for session updates
    const intervalId = setInterval(checkAuth, 5000);

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Use the native signOut function by redirecting to the signOut endpoint
      window.location.href = '/api/auth/signout';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-600">
            ReStyle
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-700 hover:text-teal-600 transition-colors ${
                pathname === '/' ? 'text-teal-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`text-gray-700 hover:text-teal-600 transition-colors ${
                pathname === '/search' ? 'text-teal-600' : ''
              }`}
            >
              Browse
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {mounted && isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/account/favorites"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-teal-600 transition-colors"
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
              </Link>
              <Link
                href={mounted && isLoggedIn ? "/account" : "/sign-in"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-teal-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
