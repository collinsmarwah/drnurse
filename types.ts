
export enum Category {
  SCRUBS = 'Scrubs',
  UNIFORMS = 'Uniforms',
  LAB_COATS = 'Lab Coats',
  ACCESSORIES = 'Accessories',
  EQUIPMENT = 'Equipment',
  SHOES = 'Nurse Shoes & Crocs',
  CUSTOMIZATION = 'Customization'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  featured?: boolean;
  stock: number;
}

export interface CustomizationOptions {
  text: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
  customization?: CustomizationOptions;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
