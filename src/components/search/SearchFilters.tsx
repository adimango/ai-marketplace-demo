"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchFiltersProps {
  categories: string[];
  selectedCategory?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  query?: string;
}

export default function SearchFilters({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  sort,
  query,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [formData, setFormData] = useState({
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
    sort: sort || "",
    category: selectedCategory || "",
  });
  
  // Update state when props change (e.g., when URL parameters change)
  useEffect(() => {
    setFormData({
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      sort: sort || "",
      category: selectedCategory || "",
    });
  }, [minPrice, maxPrice, sort, selectedCategory]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (query) params.set("q", query);
    if (formData.category) params.set("category", formData.category);
    if (formData.minPrice) params.set("minPrice", formData.minPrice);
    if (formData.maxPrice) params.set("maxPrice", formData.maxPrice);
    if (formData.sort) params.set("sort", formData.sort);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Category Filter */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="" className="text-gray-700">All Categories</option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category} value={category} className="text-gray-700">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))
            ) : (
              <>
                <option value="outerwear" className="text-gray-700">Outerwear</option>
                <option value="dresses" className="text-gray-700">Dresses</option>
                <option value="tops" className="text-gray-700">Tops</option>
                <option value="bottoms" className="text-gray-700">Bottoms</option>
                <option value="shoes" className="text-gray-700">Shoes</option>
                <option value="accessories" className="text-gray-700">Accessories</option>
                <option value="knitwear" className="text-gray-700">Knitwear</option>
                <option value="jewelry" className="text-gray-700">Jewelry</option>
                <option value="one-piece" className="text-gray-700">One-piece</option>
              </>
            )}
          </select>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </h3>
          <div className="flex items-center gap-2">
            <div>
              <label htmlFor="minPrice" className="sr-only">
                Minimum Price
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  placeholder="Min"
                  value={formData.minPrice}
                  onChange={handleChange}
                  min="0"
                  className="block w-full pl-7 p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <span className="text-gray-500">-</span>
            <div>
              <label htmlFor="maxPrice" className="sr-only">
                Maximum Price
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="Max"
                  value={formData.maxPrice}
                  onChange={handleChange}
                  min="0"
                  className="block w-full pl-7 p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sort By */}
        <div className="mb-6">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={formData.sort}
            onChange={handleChange}
            className="block w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="" className="text-gray-700">Relevance</option>
            <option value="price-asc" className="text-gray-700">Price: Low to High</option>
            <option value="price-desc" className="text-gray-700">Price: High to Low</option>
            <option value="newest" className="text-gray-700">Newest First</option>
          </select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="btn bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md font-medium w-full"
          >
            Apply Filters
          </button>
          
          <button
            type="button"
            onClick={clearFilters}
            className="btn bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md font-medium border border-gray-300 w-full"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
}
