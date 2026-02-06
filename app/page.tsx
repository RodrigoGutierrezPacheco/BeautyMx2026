"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Truck, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"
import { ProductCard } from "@/components/product-card"
import { AuthProvider } from "@/lib/auth-context"
import { getFeaturedProducts, getNewProducts, brands, categories } from "@/lib/products"

const featuredProducts = getFeaturedProducts()
const newProducts = getNewProducts()

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <AuthModal />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Nueva coleccion disponible
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Descubre tu{" "}
                  <span className="text-primary">belleza</span> con las mejores marcas
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Explora nuestra seleccion curada de maquillaje y skincare de marcas premium como Glossier, Rhode, Patrick Ta y mas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base font-semibold rounded-full"
                  >
                    <Link href="/productos">
                      Ver productos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-base font-semibold rounded-full border-primary/30 text-foreground hover:bg-primary/5 bg-transparent"
                  >
                    <Link href="/categorias">Explorar categorias</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop"
                    alt="Coleccion de maquillaje"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating Cards */}
                <div className="absolute -left-4 top-1/4 bg-card p-4 rounded-2xl shadow-xl animate-bounce-slow hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Envio gratis</p>
                      <p className="text-xs text-muted-foreground">En compras +$500</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-1/4 bg-card p-4 rounded-2xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">100% Original</p>
                      <p className="text-xs text-muted-foreground">Productos autenticos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Marcas Premium
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trabajamos con las marcas mas innovadoras y queridas del mundo de la belleza
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/productos?brand=${brand.id}`}
                  className="group p-6 bg-muted/50 rounded-2xl hover:bg-secondary transition-all duration-300 text-center"
                >
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{brand.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Los mas vendidos
                </h2>
                <p className="text-muted-foreground">
                  Descubre los favoritos de nuestra comunidad
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="text-primary hover:text-primary/80 hidden sm:flex"
              >
                <Link href="/productos">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compra por categoria
              </h2>
              <p className="text-muted-foreground">
                Encuentra exactamente lo que buscas
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categorias?cat=${category.id}`}
                  className="group relative p-8 bg-card rounded-2xl hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Nuevo
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Recien llegados
                </h2>
              </div>
              <Button
                asChild
                variant="ghost"
                className="text-primary hover:text-primary/80 hidden sm:flex"
              >
                <Link href="/productos?new=true">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Envio gratis</h3>
                <p className="text-primary-foreground/80">
                  En todas las compras mayores a $500 MXN en toda la republica mexicana
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">100% Autentico</h3>
                <p className="text-primary-foreground/80">
                  Todos nuestros productos son originales y estan respaldados por las marcas
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Atencion personalizada</h3>
                <p className="text-primary-foreground/80">
                  Nuestro equipo de expertos esta listo para ayudarte a encontrar tu look perfecto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/logo.png"
                    alt="Beautyy MX"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="font-serif text-xl font-bold">Beautyy MX</span>
                </div>
                <p className="text-background/70 text-sm leading-relaxed">
                  Tu destino de belleza con las mejores marcas internacionales de maquillaje y skincare.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Tienda</h4>
                <ul className="space-y-3 text-sm text-background/70">
                  <li><Link href="/productos" className="hover:text-background transition-colors">Todos los productos</Link></li>
                  <li><Link href="/categorias" className="hover:text-background transition-colors">Categorias</Link></li>
                  <li><Link href="/productos?new=true" className="hover:text-background transition-colors">Nuevos</Link></li>
                  <li><Link href="/productos?bestseller=true" className="hover:text-background transition-colors">Bestsellers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Soporte</h4>
                <ul className="space-y-3 text-sm text-background/70">
                  <li><a href="#" className="hover:text-background transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Envios</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Devoluciones</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Siguenos</h4>
                <ul className="space-y-3 text-sm text-background/70">
                  <li><a href="#" className="hover:text-background transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">TikTok</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
              <p>2026 Beautyy MX. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}
