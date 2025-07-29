import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import { Footer } from '../_components/footer'
import { SignInForm } from '../_components/signin-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Página de login no blog.',
}

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="h-fit w-[85%] border-0 bg-gray-800 md:w-96">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-xl font-bold text-zinc-200 sm:text-2xl">
            Entrar
          </CardTitle>
          <CardDescription className="text-zinc-200">
            Informe suas credenciais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <Footer text="Ainda não possui uma conta?" url="/auth/signup" />
      </Card>
    </div>
  )
}
