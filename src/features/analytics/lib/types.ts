export type TopSales = {
  quantity: number;
  name: string;
  image_url: string | null;
  price: number;
  category?: {
    icon_name: string | null;
    name: string;
  };
};

export type TopSalesResponse = {
  menu_item_id: {
    name: string;
    image_url: string | null;
    category: {
      name: string;
      icon_name: string | null;
    };
  } | null;
  quantity: number;
  price_at_time: number;
};
