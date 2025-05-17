import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/products/ProductCard';
import { promises as fs } from 'fs';
import path from 'path';

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

async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export default async function Home() {
  const products = await getProducts();

  // Sample categories with their images
  const categories = [
    { name: 'Outerwear', image: '/images/products/denim-jacket-1.jpg' },
    { name: 'Dresses', image: '/images/products/floral-dress-1.jpg' },
    { name: 'Shoes', image: '/images/products/leather-sneakers-1.jpg' },
    { name: 'Tops', image: '/images/products/silk-blouse-1.jpg' },
    { name: 'Bottoms', image: '/images/products/mom-jeans-1.jpg' },
    { name: 'Accessories', image: '/images/products/leather-bag-1.jpg' },
  ];

  const featuredProducts = products.slice(0, 8);
  const newArrivals = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  const popularItems = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 max-w-3xl">
            Sustainable Fashion at Your Fingertips
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Buy and sell pre-loved clothing from your favorite brands. Join
            thousands making fashion more sustainable, one garment at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/search"
              className="btn bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium shadow-sm"
            >
              Browse Items
            </Link>
            <Link
              href="/sign-in"
              className="btn bg-white hover:bg-gray-50 text-teal-600 px-8 py-3 rounded-md font-medium shadow-sm border border-gray-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Featured Items
          </h2>
          <div className="scroll-lane pb-4">
            {featuredProducts.map((product) => (
              <div
                key={`featured-${product.id}`}
                className="w-64 md:w-72 flex-shrink-0"
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  condition={product.condition}
                  images={product.images}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            New Arrivals
          </h2>
          <div className="scroll-lane pb-4">
            {newArrivals.map((product) => (
              <div
                key={`new-${product.id}`}
                className="w-64 md:w-72 flex-shrink-0"
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  condition={product.condition}
                  images={product.images}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Popular Items
          </h2>
          <div className="scroll-lane pb-4">
            {popularItems.map((product) => (
              <div
                key={`popular-${product.id}`}
                className="w-64 md:w-72 flex-shrink-0"
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  condition={product.condition}
                  images={product.images}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/search?category=${category.name.toLowerCase()}`}
                className="category-card aspect-square hover-scale"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
                <div className="category-card-overlay">
                  <h3 className="category-card-title">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Banner */}
      <section className="py-12 md:py-16 bg-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-teal-50 text-lg mb-8 max-w-2xl mx-auto">
            Connect with fashion lovers, sell your items easily, and shop
            sustainably. Start buying and selling today!
          </p>
          <Link
            href="/sign-in"
            className="btn bg-white hover:bg-gray-50 text-teal-600 px-8 py-3 rounded-md font-medium inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
