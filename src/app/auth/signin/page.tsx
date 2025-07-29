'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { Auth } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type FormData = z.infer<typeof formSchema>

export default function SignInPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit({ email, password }: FormData) {
    await api
      .post<Auth>('/auth/signin', {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token
        const cookieExpiresInSeconds = 60 * 60 * 24 * 30

        Cookies.set('token', token, {
          expires: cookieExpiresInSeconds,
          path: '/',
        })
      })
      .catch((err) => {
        console.log(err.response.data.error)
      })
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="h-fit w-64 border-0 bg-gray-800 md:w-96">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-xl font-bold text-zinc-200 sm:text-2xl">
            Entrar
          </CardTitle>
          <CardDescription className="text-zinc-200">
            Informe suas credenciais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-2 space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email..."
                        {...field}
                        className="bg-zinc-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha..."
                        {...field}
                        className="bg-zinc-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full cursor-pointer rounded-sm bg-gray-900 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
