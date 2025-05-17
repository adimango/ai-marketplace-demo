"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div>
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={images[activeImage]}
          alt={title}
          width={600}
          height={600}
          className="object-cover w-full h-auto"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`gallery-thumbnail relative ${
                index === activeImage ? "active" : ""
              }`}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                width={150}
                height={150}
                className="object-cover w-full h-auto rounded aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
