"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"
import { ProductCard } from "@/components/product-card"
import { AuthProvider } from "@/lib/auth-context"
import { categories, getProductsByCategory, brands, getProductsByBrand } from "@/lib/products"
import { cn } from "@/lib/utils"

const categoryImages: Record<string, string> = {
  labios: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=400&fit=crop",
  rostro: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
  ojos: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=400&fit=crop",
  skincare: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&h=400&fit=crop",
  sets: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=400&fit=crop",
}

type ViewType = "categories" | "brands"

export default function CategoriesPage() {
  const [viewType, setViewType] = useState<ViewType>("categories")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const selectedProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : selectedBrand
      ? getProductsByBrand(selectedBrand)
      : []

  const currentSelection = selectedCategory || selectedBrand

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <AuthModal />

        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary/50 via-background to-primary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Explora por tu favorito
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {viewType === "categories" ? "Categorias" : "Marcas"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {viewType === "categories"
                ? "Encuentra productos organizados por tipo para facilitar tu busqueda"
                : "Descubre todas las marcas premium que tenemos para ti"}
            </p>

            {/* View Toggle */}
            <div className="inline-flex items-center bg-card border border-border rounded-full p-1">
              <button
                type="button"
                onClick={() => {
                  setViewType("categories")
                  setSelectedBrand(null)
                  setSelectedCategory(null)
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  viewType === "categories"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Por Categoria
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewType("brands")
                  setSelectedCategory(null)
                  setSelectedBrand(null)
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  viewType === "brands"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Por Marca
              </button>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!currentSelection ? (
            <>
              {viewType === "categories" ? (
                /* Categories Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "group relative overflow-hidden rounded-3xl aspect-[4/3] text-left transition-all duration-500 hover:shadow-2xl",
                        index === 0 && "md:col-span-2 md:row-span-2 aspect-square"
                      )}
                    >
                      <Image
                        src={categoryImages[category.id] || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="text-4xl mb-3 block">{category.icon}</span>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-background mb-2">
                          {category.name}
                        </h3>
                        <p className="text-background/80 text-sm mb-4">{category.description}</p>
                        <div className="flex items-center gap-2 text-background font-medium">
                          <span>Explorar</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Brands Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setSelectedBrand(brand.id)}
                      className="group relative overflow-hidden rounded-3xl bg-card p-8 text-left transition-all duration-300 hover:shadow-xl border border-border hover:border-primary"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6">{brand.description}</p>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>Ver productos</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Products View */
            <div>
              {/* Back Button & Title */}
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedBrand(null)
                  }}
                  className="rounded-full"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Volver
                </Button>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {selectedCategory
                      ? categories.find((c) => c.id === selectedCategory)?.name
                      : brands.find((b) => b.id === selectedBrand)?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedProducts.length} productos
                  </p>
                </div>
              </div>

              {/* Products Grid */}
              {selectedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No hay productos en esta{" "}
                    {selectedCategory ? "categoria" : "marca"} por el momento
                  </p>
                  <Button asChild>
                    <Link href="/productos">Ver todos los productos</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* CTA Section */}
        {!currentSelection && (
          <section className="py-16 bg-primary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                No encuentras lo que buscas?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Explora nuestra coleccion completa con mas de 50 productos de las mejores marcas
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 h-14"
              >
                <Link href="/productos">
                  Ver todos los productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </AuthProvider>
  )
}
