type Restaurant = {
  id: number;
  location: string;
  name: string;
  price_range: 1 | 2 | 3 | 4 | 5;
  rating_count?: number | null;
  average_rating?: number | null;
};

export type { Restaurant };
