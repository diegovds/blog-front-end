'use client'

import { Button } from '@/components/ui/button'
import {
  Form as F,
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
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(15, { message: 'O nome deve ter no máximo 15 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type FormData = z.infer<typeof formSchema>

export function SignUpForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit({ name, email, password }: FormData) {
    await api
      .post<Auth>('/auth/signup', {
        name,
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
    <F {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail..." {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha..."
                  {...field}
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
    </F>
  )
}
