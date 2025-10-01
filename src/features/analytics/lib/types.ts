export type TopOrders = {
  quantity: number;
  name: string;
  price: number;
  category?: {
    icon_name: string | null;
    name: string;
  };
}[];
