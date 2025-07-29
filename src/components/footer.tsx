import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-blue-800 p-2">
      <span className="mx-auto flex w-fit items-center gap-1.5 text-xs tracking-wider">
        Feito com
        <Heart size={13} className="fill-red-600 text-red-600" />
        por
        <strong className="font-semibold">Diego Viana</strong>
      </span>
    </footer>
  )
}
