export type IProduct = {
    title: string;
    description: string;
    price: number;
    discount: number;
    finalPrice: number;
    category: string;
    type: 'men' | 'women' | 'kids' | 'beauty' | 'electronics' | 'home' | 'sports' | 'automotive' | 'health' | 'toys';
    brand: string;
    stock: number;
    quantity: number;
    images: string[];
    tags: string[];
    ratings: number;
    ratingsCount: number;
    isFeatured: boolean;
    status: 'active' | 'inactive';
    shipping: number;
    seller: string;
  }
  