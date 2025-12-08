import { Product, Category } from './types';

export const STORE_NAME = "Dr. Nurse Collections";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Signature Purple Scrub Set',
    description: 'Elegant purple scrubs with stylish ribbon detail. Tailored fit for professionals. As seen in our collection.',
    price: 7150,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 3 // Low stock example
  },
  {
    id: '2',
    name: 'Royal Blue Classic Set',
    description: 'The standard for medical excellence. Durable, color-fast blue scrubs with multiple pockets.',
    price: 5850,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 25
  },
  {
    id: '3',
    name: 'Pristine White Lab Coat',
    description: 'Professional length, crisp white fabric with tablet pocket and side vents for access.',
    price: 5200,
    category: Category.LAB_COATS,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 15
  },
  {
    id: '4',
    name: 'Men\'s Black Tactical Scrubs',
    description: 'Functional black scrubs with extra cargo pockets. Stylish, masculine fit.',
    price: 6500,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/6129437/pexels-photo-6129437.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 8
  },
  {
    id: '5',
    name: 'Lavender Scrub Set',
    description: 'Soft lavender tone with a modern fit. Comfortable for long shifts.',
    price: 7800,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 4 // Low stock example
  },
  {
    id: '6',
    name: 'Jumpsuit Scrub',
    description: 'Modern all-in-one jumpsuit design. A stylish utility look for the active nurse.',
    price: 8450,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/8376192/pexels-photo-8376192.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 10
  },
  {
    id: '7',
    name: 'Littmann Classic III Stethoscope',
    description: 'Industry-leading acoustics. Available in Black, Burgundy, and Navy.',
    price: 14300,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 20
  },
  {
    id: '8',
    name: 'Premium RN Uniform',
    description: 'Distinguished uniform for Registered Nurses. White with distinctive piping options.',
    price: 7150,
    category: Category.UNIFORMS,
    image: 'https://images.pexels.com/photos/5207085/pexels-photo-5207085.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 0 // Out of stock example
  },
  {
    id: '9',
    name: 'Heartbeat Surgical Cap',
    description: 'Comfortable cotton cap with buttons for mask loops. Heartbeat embroidery.',
    price: 2340,
    category: Category.ACCESSORIES,
    image: 'https://images.pexels.com/photos/4586994/pexels-photo-4586994.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 50
  },
  {
    id: '10',
    name: 'Silicone Nurse Watch',
    description: 'Infection-control friendly fob watch. Pins securely to tunic.',
    price: 1950,
    category: Category.ACCESSORIES,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 30
  },
  {
    id: '11',
    name: 'Digital Thermometer',
    description: 'Rapid read digital thermometer for clinical use.',
    price: 3250,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 100
  },
  {
    id: '12',
    name: 'Medical Pen Torch',
    description: 'Diagnostic LED penlight. Essential for pupil assessments.',
    price: 1560,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/7659865/pexels-photo-7659865.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 45
  },
  {
    id: '13',
    name: 'Paediatric Scrub Top',
    description: 'Colorful prints to cheer up young patients. Fun and professional.',
    price: 4550,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 12
  },
  {
    id: '14',
    name: 'Custom Name Tag',
    description: 'Personalized name badge with magnetic backing. Durable and clear.',
    price: 1300,
    category: Category.CUSTOMIZATION,
    image: 'https://images.pexels.com/photos/7792634/pexels-photo-7792634.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 500
  },
  {
    id: '15',
    name: 'Embroidery Service',
    description: 'Add your name, title, or hospital logo to any garment. Price per line.',
    price: 1040,
    category: Category.CUSTOMIZATION,
    image: 'https://images.pexels.com/photos/4625624/pexels-photo-4625624.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 999
  },
  {
    id: '16',
    name: 'Comfort Nursing Clogs',
    description: 'Slip-resistant, lightweight clogs designed for all-day comfort. Easy to clean material.',
    price: 4550,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 40,
    featured: true
  },
  {
    id: '17',
    name: 'Medical Crocs - Navy',
    description: 'Breathable and durable Crocs perfect for the operating room or ward rounds.',
    price: 3900,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    stock: 60
  },
  {
    id: '18',
    name: 'Ergonomic Work Sneakers',
    description: 'Athletic style sneakers with enhanced arch support for healthcare professionals.',
    price: 5850,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 18
  },
  {
    id: '19',
    name: 'Classic White Crocs',
    description: 'The original comfort clog. Lightweight, water-friendly, and perfect for healthcare settings.',
    price: 3900,
    category: Category.SHOES,
    image: 'https://images.unsplash.com/photo-1603145733190-59811e523c72?auto=format&fit=crop&q=80&w=800',
    stock: 50
  }
];