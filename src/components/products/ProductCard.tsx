"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/components/SimpleFavoritesProvider";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  condition: string;
  images: string[];
}

export default function ProductCard({ id, title, price, condition, images }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <div className="product-card w-full max-w-xs">
      <div className="relative">
        <div className="product-card-image-container">
          <Link href={`/products/${id}`}>
            <Image
              src={images[0]}
              alt={title}
              className="product-card-image"
              width={300}
              height={300}
              priority={true}
            />
          </Link>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(id);
          }}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-sm z-10"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 heart-icon ${favorite ? "active fill-red-500" : "stroke-gray-600"}`}
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
        </button>
      </div>
      <div className="p-3">
        <Link href={`/products/${id}`} className="block group">
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</p>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {condition}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
