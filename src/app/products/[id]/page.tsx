import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import ProductGallery from "@/components/products/ProductGallery";
import FavoriteButton from "@/components/products/FavoriteButton";
import { notFound } from "next/navigation";

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

// Define what props are coming from the route params
interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "src/data/products.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent);
}

async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === parseInt(id, 10));
}

// Function to get related products
async function getRelatedProducts(
  currentProduct: Product,
  limit: number = 4
): Promise<Product[]> {
  const allProducts = await getProducts();
  
  // Filter out the current product and get products in the same category
  return allProducts
    .filter(
      (p) => p.id !== currentProduct.id && p.category === currentProduct.category
    )
    .slice(0, limit);
}

export default async function ProductPage({ 
  params 
}: ProductPageProps) {
  // Safely access params properties without warnings
  const id = params?.id;
  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-teal-600">
                Home
              </Link>
              <svg
                className="h-4 w-4 fill-current mx-2 text-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link
                href={`/search?category=${product.category}`}
                className="text-gray-500 hover:text-teal-600"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <svg
                className="h-4 w-4 fill-current mx-2 text-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </li>
            <li className="text-gray-700">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <FavoriteButton productId={product.id} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-1">Condition</h2>
                  <p className="text-gray-600">{product.condition}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-1">Brand</h2>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-1">Size</h2>
                  <p className="text-gray-600">{product.size}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-1">Color</h2>
                  <p className="text-gray-600">{product.color}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Seller</h2>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    {product.seller.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.seller}</p>
                    <p className="text-sm text-gray-500">4.9 ★ (42 reviews)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full btn bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md font-medium">
                  Buy Now
                </button>
                <button className="w-full btn bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-md font-medium border border-gray-300">
                  Message Seller
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  href={`/products/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="group"
                >
                  <div className="product-card">
                    <div className="product-card-image-container">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.title}
                        className="product-card-image"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-teal-600 transition-colors">
                        {relatedProduct.title}
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
