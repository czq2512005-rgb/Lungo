
export enum Category {
  Scone = 'Scone 司康餅',
  Bagel = 'Cream Cheese Bagel 奶油乳酪貝果',
  Salad = 'Salad 沙律',
  Sandwich = 'Bagel Sandwich 貝果三明治',
  Breakfast = 'All Day Breakfast 全日早餐',
  DrinkWhite = 'White Coffee 白色',
  DrinkBlack = 'Black Coffee 黑色',
  DrinkTea = 'Tea 茶飲',
  DrinkNonCoffee = 'Non-Coffee 非咖啡類',
  Merch = 'Merchandise'
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameZh: string;
  descriptionEn?: string;
  descriptionZh?: string;
  price: number; // Base price (usually Hot for drinks)
  priceIced?: number; // Optional price for iced version
  category: Category;
  image?: string;
  isDrink?: boolean;
  availableVariants?: ('Hot' | 'Iced')[]; // If undefined, assume Hot only for food, or handled by priceIced for drinks logic
}

export interface CartItem extends MenuItem {
  cartId: string;
  quantity: number;
  variant?: 'Hot' | 'Iced';
  stickerText?: string; // Only for takeout drinks
  finalPrice: number;
}

export enum PaymentMethod {
  InStore = 'In-Store Payment / 門店支付',
  AlipayHK = 'AlipayHK',
  PayPal = 'PayPal',
  PayMe = 'PayMe',
  FPS = 'FPS'
}

export enum OrderType {
  DineIn = 'Dine-In',
  Takeout = 'Takeout'
}
