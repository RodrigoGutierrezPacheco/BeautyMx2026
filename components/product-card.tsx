"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Heart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type Product } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  variant?: "default" | "featured"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden transition-all duration-500",
        variant === "featured" ? "shadow-lg hover:shadow-2xl" : "hover:shadow-xl",
        isHovered && "transform scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Nuevo
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        type="button"
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-foreground/10 backdrop-blur-[2px] flex items-center justify-center gap-3 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
          >
            <Eye className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg",
              isAdding && "animate-pulse"
            )}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Agregando..." : "Agregar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
