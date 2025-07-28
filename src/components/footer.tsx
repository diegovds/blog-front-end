import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center bg-blue-800 p-1">
      <span className="flex items-center gap-1.5 text-sm tracking-wider">
        Feito com
        <Heart size={13} className="fill-red-600 text-red-600" />
        por
        <strong className="font-semibold">Diego Viana</strong>
      </span>
    </footer>
  )
}
