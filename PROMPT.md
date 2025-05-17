# Project Prompt: Build a Secondhand Fashion Marketplace with Next.js

Create a modern resale fashion marketplace using Next.js, focusing on a clean, minimal design and great user experience.  
Inspired by platforms like Vinted.

## Technical Requirements

1. **Framework and Structure**

   - Use Next.js 15+ with App Router architecture
   - Implement TypeScript for type safety
   - Use Tailwind CSS for styling
   - Structure the project with clean component organization

2. **Authentication**

   - Implement NextAuth.js for authentication
   - Create a mock credentials provider (no need for real authentication)
   - Design a login page with email/password fields
   - Add a demo account option with pre-filled credentials (user@example.com/password)

3. **State Management**

   - Use Zustand for client-side state management
   - Create a favorites store for saving/unsaving products
   - Persist favorites in local storage

4. **Data Management**

   - Create a static JSON file with mock product data
   - Include fields for: id, title, description, price, seller, category, condition, brand, size, color, images

5. **Images**

   - Add sample fashion product images for each product
   - Store images locally in the public directory
   - Configure Next.js to serve images properly

## UI/UX Requirements

1. **Design System**

   - White background throughout the application
   - Teal as the primary accent color
   - Minimal, clean interface with ample whitespace
   - Small, smooth animations for hover states and transitions
   - Consistent rounded corners and shadow styles

2. **Homepage**

   - Hero section with headline and CTA buttons

   - Horizontal scrolling "lanes" for:

     - Featured items
     - New arrivals
     - Popular items

   - Shop by Category section with category image cards

   - Community banner with sign-up prompt

3. **Product Features**

   - Product cards showing image, title, price, condition

   - Heart icons for favoriting/unfavoriting items

   - Product detail pages with:

     - Image gallery with thumbnails
     - Product information
     - Seller details
     - Similar items recommendations

4. **Navigation**

   - Header with logo, navigation links, and auth buttons
   - Footer with category links and company information
   - Responsive mobile menu

5. **Pages to Create**

   - Homepage with product lanes
   - Product detail page with image gallery
   - Search/browse page with filters
   - User account page showing favorited items
   - Sign-in page

6. **Accessibility**

   - Use semantic HTML elements
   - Implement proper ARIA roles where needed
   - Ensure keyboard navigation works
   - Add alt text to all images
   - Use sufficient color contrast

## Advanced Features

1. **Search & Filtering**

   - Filter products by category
   - Search by keyword
   - Filter by price range
   - Sort by newest/price

2. **Responsive Design**

   - Create a fully responsive layout
   - Optimize for mobile, tablet, and desktop views
   - Implement touch-friendly interactions

3. **Favorites System**

   - Allow users to save favorite items
   - Show favorites count in the header
   - Create a favorites page in user account
   - Persist favorites between sessions

## Project Structure

```
/
├── public/             # Static assets
│   ├── images/         # Product images
│   │   └── products/   # Individual product images
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── account/    # User account pages
│   │   ├── api/        # API routes
│   │   ├── products/   # Product pages
│   │   ├── search/     # Search page
│   │   └── sign-in/    # Authentication page
│   ├── components/     # Reusable components
│   │   ├── auth/       # Auth components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   ├── products/   # Product-related components
│   │   ├── search/     # Search components
│   │   └── ui/         # UI components
│   ├── data/           # Sample data
│   ├── store/          # State management
│   └── types/          # TypeScript types
```

## Core Components to Build

1. **Layout Components**
   - Header with navigation and auth status
   - Footer with site links
   - Layout wrapper

2. **Product Components**
   - ProductCard for displaying product summary
   - ProductGallery for image display
   - FavoriteButton for saving products

3. **Search Components**
   - SearchFilters for filtering products
   - CategoryFilters for category navigation

4. **Auth Components**
   - SignInForm for authentication
   - SessionProvider for auth context

5. **State Management**
   - Favorites store with Zustand
   - FavoritesProvider component

## Sample Product Data Structure

```json
{
  "id": 1,
  "title": "Vintage Denim Jacket",
  "description": "Classic vintage denim jacket in excellent condition.",
  "price": 59.99,
  "seller": "vintagelover",
  "category": "outerwear",
  "condition": "good",
  "brand": "Levi's",
  "size": "M",
  "color": "blue",
  "images": [
    "/images/products/denim-jacket-1.jpg",
    "/images/products/denim-jacket-2.jpg"
  ]
}
```

## Implementation Steps

1. **Project Setup**
   - Initialize Next.js project with TypeScript and Tailwind CSS
   - Set up project structure and folder organization
   - Install dependencies (NextAuth.js, Zustand)

2. **Data and Assets**
   - Create sample product data JSON
   - Add product images to public directory
   - Define TypeScript interfaces for data models

3. **Core Functionality**
   - Implement product listing and detail pages
   - Create product card components
   - Build search and filtering functionality
   - Set up image gallery for product details

4. **Authentication**
   - Implement NextAuth.js with credentials provider
   - Create sign-in page with demo account
   - Build auth-aware header component

5. **State Management**
   - Set up Zustand store for favorites
   - Create favorites persistence with localStorage
   - Build favorites UI components

6. **UI Refinement**
   - Implement responsive design
   - Add hover animations and transitions
   - Ensure consistent styling throughout
   - Optimize for different viewport sizes

7. **Final Testing**
   - Test all user flows and interactions
   - Verify responsive behavior
   - Check for accessibility compliance

Focus on delivering a cohesive, polished user experience with clean code structure and attention to visual details. The final product should look professional and provide a smooth, intuitive shopping experience.
