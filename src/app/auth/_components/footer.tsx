import { CardFooter } from '@/components/ui/card'
import Link from 'next/link'

interface FooterProps {
  text: string
  url: string
}

export function Footer({ text, url }: FooterProps) {
  return (
    <CardFooter className="flex justify-center gap-2 text-sm text-zinc-200">
      <p>{text}</p>
      <Link className="font-semibold hover:underline" href={url}>
        Clique aqui
      </Link>
    </CardFooter>
  )
}
