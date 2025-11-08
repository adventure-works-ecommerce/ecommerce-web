import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full px-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black tracking-wide">
            ADVENTURE
            <br />
            WORKS
          </h1>
        </div>

        {/* Success message */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-medium text-black">¡Gracias por registrarte!</h2>
          <p className="text-gray-600">
            Por favor revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
