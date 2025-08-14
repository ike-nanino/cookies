export interface Bread {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Bread {
  quantity: number;
}
