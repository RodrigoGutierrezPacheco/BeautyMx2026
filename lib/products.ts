import type { Product } from "./cart-context"

export const categories = [
  { id: "labios", name: "Labios", icon: "💋", description: "Labiales, glosses y más" },
  { id: "rostro", name: "Rostro", icon: "✨", description: "Bases, correctores y primers" },
  { id: "ojos", name: "Ojos", icon: "👁️", description: "Sombras, delineadores y máscaras" },
  { id: "skincare", name: "Skincare", icon: "🧴", description: "Cuidado de la piel" },
  { id: "sets", name: "Sets", icon: "🎁", description: "Kits y colecciones" },
]

export const brands = [
  { id: "glossier", name: "Glossier", description: "Skincare & makeup minimalista" },
  { id: "rhode", name: "Rhode", description: "By Hailey Bieber" },
  { id: "patrick-ta", name: "Patrick Ta", description: "Maquillaje de lujo" },
  { id: "one-size", name: "One Size", description: "By Patrick Starrr" },
  { id: "beauty-creations", name: "Beauty Creations", description: "Trendy & affordable" },
]

export const products: Product[] = [
  // Glossier
  {
    id: "gl-1",
    name: "Cloud Paint",
    brand: "Glossier",
    price: 420,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
    category: "rostro",
    description: "Rubor en gel seamless que se difumina como un sueño para un flush natural.",
    rating: 4.8,
    reviews: 2847,
    isBestseller: true,
  },
  {
    id: "gl-2",
    name: "Boy Brow",
    brand: "Glossier",
    price: 380,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop",
    category: "ojos",
    description: "Gel para cejas que rellena y fija con un acabado natural.",
    rating: 4.9,
    reviews: 3210,
    isBestseller: true,
  },
  {
    id: "gl-3",
    name: "Ultralip",
    brand: "Glossier",
    price: 450,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop",
    category: "labios",
    description: "Labial hidratante con color buildable y acabado brillante.",
    rating: 4.7,
    reviews: 1893,
    isNew: true,
  },
  // Rhode
  {
    id: "rh-1",
    name: "Peptide Lip Treatment",
    brand: "Rhode",
    price: 520,
    image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=500&fit=crop",
    category: "labios",
    description: "Tratamiento labial con péptidos para labios suaves y jugosos.",
    rating: 4.9,
    reviews: 4521,
    isBestseller: true,
  },
  {
    id: "rh-2",
    name: "Glazing Milk",
    brand: "Rhode",
    price: 680,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    category: "skincare",
    description: "Esencia hidratante ligera para un glow de adentro hacia afuera.",
    rating: 4.8,
    reviews: 2156,
    isNew: true,
  },
  {
    id: "rh-3",
    name: "Barrier Restore Cream",
    brand: "Rhode",
    price: 780,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    category: "skincare",
    description: "Crema reparadora que fortalece la barrera de la piel.",
    rating: 4.7,
    reviews: 1823,
  },
  // Patrick Ta
  {
    id: "pt-1",
    name: "Major Headlines Double-Take Creme & Powder Blush",
    brand: "Patrick Ta",
    price: 890,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
    category: "rostro",
    description: "Dúo de rubor en crema y polvo para un acabado dimensional.",
    rating: 4.9,
    reviews: 1567,
    isBestseller: true,
  },
  {
    id: "pt-2",
    name: "Silky Lip Crème",
    brand: "Patrick Ta",
    price: 720,
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=500&h=500&fit=crop",
    category: "labios",
    description: "Labial cremoso de larga duración con acabado aterciopelado.",
    rating: 4.8,
    reviews: 943,
  },
  {
    id: "pt-3",
    name: "Major Dimension Eyeshadow Palette",
    brand: "Patrick Ta",
    price: 1250,
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=500&h=500&fit=crop",
    category: "ojos",
    description: "Paleta de sombras con tonos neutros y ahumados.",
    rating: 4.9,
    reviews: 728,
    isNew: true,
  },
  // One Size
  {
    id: "os-1",
    name: "Turn Up The Base Butter Silk Concealer",
    brand: "One Size",
    price: 580,
    image: "https://images.unsplash.com/photo-1590156206657-0e87a6c19dc8?w=500&h=500&fit=crop",
    category: "rostro",
    description: "Corrector cremoso de alta cobertura con acabado natural.",
    rating: 4.7,
    reviews: 2341,
    isBestseller: true,
  },
  {
    id: "os-2",
    name: "Ultimate Blurring Setting Powder",
    brand: "One Size",
    price: 620,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop",
    category: "rostro",
    description: "Polvo suelto que difumina poros y fija el maquillaje.",
    rating: 4.8,
    reviews: 1876,
  },
  {
    id: "os-3",
    name: "Lip Snatcher",
    brand: "One Size",
    price: 480,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&h=500&fit=crop",
    category: "labios",
    description: "Delineador y labial en uno para labios definidos.",
    rating: 4.6,
    reviews: 1234,
    isNew: true,
  },
  // Beauty Creations
  {
    id: "bc-1",
    name: "Flawless Stay Foundation",
    brand: "Beauty Creations",
    price: 280,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&h=500&fit=crop",
    category: "rostro",
    description: "Base de larga duración con cobertura media a alta.",
    rating: 4.5,
    reviews: 3456,
    isBestseller: true,
  },
  {
    id: "bc-2",
    name: "Pro Matte Liquid Lipstick",
    brand: "Beauty Creations",
    price: 180,
    image: "https://images.unsplash.com/photo-1599733589046-10c7c1b9b6b7?w=500&h=500&fit=crop",
    category: "labios",
    description: "Labial líquido mate de larga duración.",
    rating: 4.4,
    reviews: 2890,
  },
  {
    id: "bc-3",
    name: "Eyeshadow Palette - Tease Me",
    brand: "Beauty Creations",
    price: 350,
    image: "https://images.unsplash.com/photo-1599733589146-181b6bb09dc4?w=500&h=500&fit=crop",
    category: "ojos",
    description: "Paleta de 18 sombras con tonos románticos.",
    rating: 4.6,
    reviews: 1567,
  },
  // Sets
  {
    id: "set-1",
    name: "Glossier The Makeup Set",
    brand: "Glossier",
    price: 1200,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&h=500&fit=crop",
    category: "sets",
    description: "Set con Cloud Paint, Boy Brow y Ultralip.",
    rating: 4.9,
    reviews: 856,
    isBestseller: true,
  },
  {
    id: "set-2",
    name: "Rhode Skincare Essentials",
    brand: "Rhode",
    price: 1680,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    category: "sets",
    description: "Kit completo de skincare: Glazing Milk, Barrier Cream y Lip Treatment.",
    rating: 4.8,
    reviews: 1234,
    isNew: true,
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId)
}

export function getProductsByBrand(brandId: string): Product[] {
  const brandName = brands.find((b) => b.id === brandId)?.name
  return products.filter((p) => p.brand === brandName)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller).slice(0, 6)
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew)
}
