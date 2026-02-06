"use client"

import React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (authMode === "login") {
        await login(formData.email, formData.password)
      } else {
        await register(formData.name, formData.email, formData.password)
      }
    } catch {
      setError("Ocurrio un error. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
    setError("")
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isAuthModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card rounded-2xl shadow-2xl z-50 transition-all duration-300",
          isAuthModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="relative p-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setIsAuthModalOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Beautyy MX"
              width={80}
              height={80}
              className="mx-auto rounded-full mb-4"
            />
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {authMode === "login" ? "Bienvenida de vuelta" : "Crea tu cuenta"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {authMode === "login"
                ? "Ingresa a tu cuenta para continuar"
                : "Unete a la familia Beautyy MX"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "register" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre
                </label>
                <Input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 bg-muted border-border"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12 bg-muted border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contrasena
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 bg-muted border-border pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : authMode === "login" ? (
                "Iniciar sesion"
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {authMode === "login" ? "No tienes cuenta?" : "Ya tienes cuenta?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary font-semibold hover:underline"
            >
              {authMode === "login" ? "Registrate" : "Inicia sesion"}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
