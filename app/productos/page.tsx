"use client"

import { useState, useMemo } from "react"
import { Filter, Grid, LayoutGrid, SlidersHorizontal, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"
import { ProductCard } from "@/components/product-card"
import { AuthProvider } from "@/lib/auth-context"
import { products, brands, categories } from "@/lib/products"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "large"
type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.some((b) => brands.find((br) => br.id === b)?.name === p.brand)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [products, searchQuery, selectedBrands, selectedCategories, priceRange, sortBy])

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((b) => b !== brandId) : [...prev, brandId]
    )
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 2000])
    setSearchQuery("")
  }

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedCategories.length > 0 || searchQuery.length > 0

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <AuthModal />

        {/* Hero Banner */}
        <section className="bg-secondary/50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
              Todos los productos
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explora nuestra coleccion completa de maquillaje y skincare de las mejores marcas
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border rounded-full"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2 h-12 rounded-full bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {selectedBrands.length + selectedCategories.length}
                  </span>
                )}
              </Button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-12 px-4 bg-card border border-border rounded-full text-foreground focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="featured">Destacados</option>
                <option value="newest">Mas nuevos</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>

              {/* View Mode */}
              <div className="hidden sm:flex items-center bg-card border border-border rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full",
                    viewMode === "grid" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full",
                    viewMode === "large" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setViewMode("large")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 justify-start"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpiar filtros
                  </Button>
                )}

                {/* Brands */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Marcas
                  </h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                            selectedBrands.includes(brand.id)
                              ? "bg-primary border-primary"
                              : "border-border group-hover:border-primary"
                          )}
                        >
                          {selectedBrands.includes(brand.id) && (
                            <svg
                              className="w-3 h-3 text-primary-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            selectedBrands.includes(brand.id)
                              ? "text-foreground font-medium"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                            selectedCategories.includes(category.id)
                              ? "bg-primary border-primary"
                              : "border-border group-hover:border-primary"
                          )}
                        >
                          {selectedCategories.includes(category.id) && (
                            <svg
                              className="w-3 h-3 text-primary-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            selectedCategories.includes(category.id)
                              ? "text-foreground font-medium"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Precio</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
                      }
                      className="w-full accent-primary"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">${priceRange[0]}</span>
                      <span className="font-medium text-foreground">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filters Panel */}
            <div
              className={cn(
                "fixed inset-0 bg-card z-50 md:hidden transition-transform duration-300",
                showFilters ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-serif text-xl font-bold">Filtros</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
                {/* Brands */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Marcas</h3>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => toggleBrand(brand.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-all",
                          selectedBrands.includes(brand.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Categorias</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-all",
                          selectedCategories.includes(category.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  onClick={() => setShowFilters(false)}
                >
                  Ver {filteredProducts.length} productos
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Mostrando{" "}
                <span className="font-medium text-foreground">{filteredProducts.length}</span>{" "}
                productos
              </p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No encontramos productos con esos filtros
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2"
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === "large" ? "featured" : "default"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
