export interface Product {
  id: number | string;
  title: string;
  price: number;
  originalPrice?: number;
  vendor: string;
  type?: string;
  sku?: string;
  image: string;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  excerpt: string;
  image: string;
}
