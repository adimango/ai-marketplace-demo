import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import SearchFilters from "@/components/search/SearchFilters";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  seller: string;
  category: string;
  condition: string;
  brand: string;
  size: string;
  color: string;
  images: string[];
}

interface SearchPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
}

async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "src/data/products.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent);
}

export default async function SearchPage({ 
  searchParams 
}: SearchPageProps) {
  // Wait for searchParams with Promise.resolve to avoid Next.js warnings
  const params = await Promise.resolve(searchParams || {});
  const q = params.q;
  const category = params.category;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;
  const sort = params.sort;
  let products = await getProducts();

  // Filter products based on search query
  if (q) {
    const searchTerms = q.toLowerCase().split(" ");
    products = products.filter((product) => {
      const searchableText = `${product.title} ${product.description} ${product.brand} ${product.color} ${product.category}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  // Filter by category
  if (category) {
    products = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price range
  if (minPrice !== undefined) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      products = products.filter((product) => product.price >= min);
    }
  }

  if (maxPrice !== undefined) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      products = products.filter((product) => product.price <= max);
    }
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // For demo purposes, we'll use ID as a proxy for "newest"
        products.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
  }

  const categories = [
    "outerwear", 
    "dresses", 
    "tops", 
    "bottoms", 
    "shoes", 
    "accessories", 
    "knitwear", 
    "jewelry",
    "one-piece"
  ];

  const totalResults = products.length;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <SearchFilters
              categories={categories}
              selectedCategory={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sort={sort}
              query={q}
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {category 
                  ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                  : "All Items"
                }
              </h1>
              <p className="text-gray-600 text-sm">
                {totalResults} {totalResults === 1 ? "result" : "results"}
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  No items found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <Link
                  href="/search"
                  className="btn bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium inline-block"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
