
import { Product, Category, GalleryItem } from './types';

export const STORE_NAME = "Dr. Nurse Collections";

// ==========================================
// CLOUDINARY IMAGES
// ==========================================

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'g1',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444566/463347361_18059943226754000_1856923293473557432_n_zavvwd.jpg',
    title: 'Premium Teal Scrub Set',
    category: 'Scrubs'
  },
  {
    id: 'g2',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444523/465820330_18062561299754000_4933707832149053440_n_vxjcnh.jpg',
    title: 'Navy Blue Clinical Attire',
    category: 'Uniforms'
  },
  {
    id: 'g3',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444497/473824015_18069617152754000_769377518856490646_n_fhrt9i.jpg',
    title: 'Modern Fit Grey Set',
    category: 'Scrubs'
  },
  {
    id: 'g4',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444459/474278456_18069617167754000_2621002210311132311_n_gp8qus.jpg',
    title: 'Designer Medical Wear',
    category: 'Scrubs'
  },
  {
    id: 'g5',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444419/473723971_18069617158754000_6231933823107036410_n_aaqppe.jpg',
    title: 'Professional Tunic',
    category: 'Uniforms'
  },
  {
    id: 'g6',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444385/480997118_18072758458754000_5498015015467427682_n_j8xwxn.jpg',
    title: 'Tailored Lab Coat',
    category: 'Lab Coats'
  },
  {
    id: 'g7',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444299/486070505_18075575929754000_7124160799970926037_n_adt2yw.jpg',
    title: 'Burgundy Scrub Top',
    category: 'Scrubs'
  },
  {
    id: 'g8',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444268/487088197_18076320046754000_354211264212885006_n_yikvdu.jpg',
    title: 'Clinical Excellence',
    category: 'Uniforms'
  },
  {
    id: 'g9',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444248/491414629_18078581074754000_7211254895180815506_n_hjfist.jpg',
    title: 'Blue Contrast Trim',
    category: 'Scrubs'
  },
  {
    id: 'g10',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444226/500568730_18081434179754000_1815602206753171149_n_rjmj8l.jpg',
    title: 'Custom Embroidery Detail',
    category: 'Customization'
  },
  {
    id: 'g11',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444201/504447716_18083092702754000_2656292766548686665_n_odn4fx.jpg',
    title: 'Olive Green Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g12',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444138/505190090_18083092708754000_6327944848226773329_n_x5iyq0.jpg',
    title: 'Elegant Nursing Dress',
    category: 'Uniforms'
  },
  {
    id: 'g13',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444109/516815599_18085306648754000_5950180269378908580_n_x7v61w.jpg',
    title: 'Dark Navy Set',
    category: 'Scrubs'
  },
  {
    id: 'g14',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444088/534314082_18088901869754000_4134883653439138237_n_mfe7ze.jpg',
    title: 'Patterned Scrub Top',
    category: 'Scrubs'
  },
  {
    id: 'g15',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444033/532607939_18088901860754000_1684481662642090565_n_gxdkpy.jpg',
    title: 'Medical Accessories',
    category: 'Accessories'
  },
  {
    id: 'g16',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443984/566192764_18095657542754000_8641897188582459431_n_t0h1vf.jpg',
    title: 'Lilac Scrub Set',
    category: 'Scrubs'
  },
  {
    id: 'g17',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443954/565213504_18095852845754000_8930957689818514254_n_bmaxu6.jpg',
    title: 'White Coat Ceremony',
    category: 'Lab Coats'
  },
  {
    id: 'g18',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443926/587530581_18101570251754000_8242289747787275032_n_slnshv.jpg',
    title: 'Active Wear Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g19',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443883/587510907_18101570260754000_7656058630535344568_n_bnb7so.jpg',
    title: 'Comfort Fit Uniform',
    category: 'Uniforms'
  },
  {
    id: 'g20',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443861/590721407_18101660584754000_3539666673440120653_n_lgorto.jpg',
    title: 'Ceil Blue Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g21',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443841/605576335_18102678802754000_7930856890273501960_n_gguwlq.jpg',
    title: 'Stretch Fabric Set',
    category: 'Scrubs'
  },
  {
    id: 'g22',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443797/605836429_18102678793754000_7541547038269883781_n_kqtkyk.jpg',
    title: 'Executive Lab Coat',
    category: 'Lab Coats'
  },
  {
    id: 'g23',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443749/608952024_18102972073754000_41122025647116480_n_ksrtxf.jpg',
    title: 'Modern Black Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g24',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443699/608916530_18103359292754000_7469706076565305431_n_uzbhpp.jpg',
    title: 'Surgical Cap & Gown',
    category: 'Accessories'
  },
  {
    id: 'g25',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443677/480325026_1152719493066443_953447007451711576_n_hiou57.jpg',
    title: 'Printed Scrub Top',
    category: 'Scrubs'
  },
  {
    id: 'g26',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443662/480309616_1152715099733549_7420211220807731184_n_lcku1v.jpg',
    title: 'Pediatric Uniform',
    category: 'Uniforms'
  },
  {
    id: 'g27',
    src: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767443644/477583489_1149781263360266_8279232667865657773_n_we1l9o.jpg',
    title: 'Classic White Coat',
    category: 'Lab Coats'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Teal Scrub Set',
    description: 'High-quality teal scrubs featuring advanced antimicrobial fabric. Tailored fit for professionals.',
    price: 7150,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444566/463347361_18059943226754000_1856923293473557432_n_zavvwd.jpg',
    featured: true,
    stock: 15,
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    name: 'Navy Blue Clinical Attire',
    description: 'Professional navy blue tunic set with comfortable stretch material for long shifts.',
    price: 6500,
    category: Category.UNIFORMS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444523/465820330_18062561299754000_4933707832149053440_n_vxjcnh.jpg',
    featured: true,
    stock: 22,
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Modern Fit Grey Set',
    description: 'Sleek grey scrubs with a modern cut. Features multiple pockets for utility.',
    price: 6800,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444497/473824015_18069617152754000_769377518856490646_n_fhrt9i.jpg',
    featured: true,
    stock: 18,
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Designer Medical Wear',
    description: 'Exclusive designer scrubs combining fashion and function. Breathable and durable.',
    price: 7500,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444459/474278456_18069617167754000_2621002210311132311_n_gp8qus.jpg',
    featured: true,
    stock: 10,
    rating: 5.0,
    reviews: 34
  },
  {
    id: '5',
    name: 'Professional Tunic',
    description: 'Crisp, clean tunic design suitable for all medical environments. Stain-resistant fabric.',
    price: 5200,
    category: Category.UNIFORMS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444419/473723971_18069617158754000_6231933823107036410_n_aaqppe.jpg',
    featured: false,
    stock: 30,
    rating: 4.6,
    reviews: 45
  },
  {
    id: '6',
    name: 'Tailored Lab Coat',
    description: 'Premium white lab coat with a tailored fit. Professional look with deep pockets.',
    price: 5500,
    category: Category.LAB_COATS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444385/480997118_18072758458754000_5498015015467427682_n_j8xwxn.jpg',
    featured: true,
    stock: 12,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '7',
    name: 'Burgundy Scrub Top',
    description: 'Rich burgundy color scrub top. Soft fabric that holds color wash after wash.',
    price: 3200,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444299/486070505_18075575929754000_7124160799970926037_n_adt2yw.jpg',
    featured: false,
    stock: 25,
    rating: 4.5,
    reviews: 23
  },
  {
    id: '8',
    name: 'Clinical Excellence Uniform',
    description: 'Standard issue clinical uniform designed for durability and comfort.',
    price: 4800,
    category: Category.UNIFORMS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444268/487088197_18076320046754000_354211264212885006_n_yikvdu.jpg',
    featured: false,
    stock: 40,
    rating: 4.4,
    reviews: 112
  },
  {
    id: '9',
    name: 'Blue Contrast Scrub',
    description: 'Stylish blue scrubs with contrasting trim details. Modern and functional.',
    price: 5900,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444248/491414629_18078581074754000_7211254895180815506_n_hjfist.jpg',
    featured: false,
    stock: 14,
    rating: 4.7,
    reviews: 29
  },
  {
    id: '10',
    name: 'Custom Embroidery Tunic',
    description: 'Personalized tunic with custom embroidery options available. High-quality stitching.',
    price: 6000,
    category: Category.CUSTOMIZATION,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444226/500568730_18081434179754000_1815602206753171149_n_rjmj8l.jpg',
    featured: false,
    stock: 10,
    rating: 4.9,
    reviews: 15
  },
  {
    id: '11',
    name: 'Olive Green Scrubs',
    description: 'Earth-tone olive green scrubs. Unique color for a distinctive professional look.',
    price: 6200,
    category: Category.SCRUBS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444201/504447716_18083092702754000_2656292766548686665_n_odn4fx.jpg',
    featured: true,
    stock: 20,
    rating: 4.8,
    reviews: 41
  },
  {
    id: '12',
    name: 'Elegant Nursing Dress',
    description: 'Traditional yet modern nursing dress. Comfortable fit for active duty.',
    price: 5800,
    category: Category.UNIFORMS,
    image: 'https://res.cloudinary.com/dldtmvsow/image/upload/v1767444138/505190090_18083092708754000_6327944848226773329_n_x5iyq0.jpg',
    featured: false,
    stock: 15,
    rating: 4.6,
    reviews: 33
  }
];
