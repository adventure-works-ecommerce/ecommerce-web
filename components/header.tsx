"use client"

import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function Header() {
  const { totalItems } = useCart()
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const isAdmin = user?.email === "admin@admin.com"

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-lg font-bold tracking-wide">
              ADVENTURE
              <br />
              WORKS
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-300">
              Bikes
            </Link>
            <Link href="/accessories" className="hover:text-gray-300">
              Accesorios
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              Ropa
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              Componentes
            </Link>
            <Link href="/stores" className="hover:text-gray-300">
              Tiendas
            </Link>
            {isAdmin && (
              <Link href="/pos" className="hover:text-gray-300 text-green-400">
                POS
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />

            {/* Show cart only when logged in */}
            {!loading && user && (
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* User menu - show different options based on auth state */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="hover:text-gray-300">
                        <User className="w-5 h-5 cursor-pointer" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {isAdmin && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/pos" className="cursor-pointer text-green-600 font-medium">
                              Sistema POS
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          Ver Perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/edit-profile" className="cursor-pointer">
                          Editar Perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <User className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                  </Link>
                )}
              </>
            )}

            <Menu className="w-5 h-5 cursor-pointer hover:text-gray-300 md:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
