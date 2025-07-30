'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/axios'
import { Post } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalProps {
  token: string
  post: Post
  onReload: () => void
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O título precisa ter pelo menos 2 caracteres' }),
  body: z
    .string()
    .min(2, { message: 'O conteúdo precisa ter pelo menos 2 caracteres' }),
  status: z.enum(['Rascunho', 'Publicado']),
})

type FormData = z.infer<typeof formSchema>

export function Modal({ post, token, onReload }: ModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
      status: post.status === 'DRAFT' ? 'Rascunho' : 'Publicado',
    },
  })

  async function onSubmit(form: FormData) {
    const status = form.status === 'Rascunho' ? 'DRAFT' : 'PUBLISHED'

    const data = {
      title: form.title,
      body: form.body,
      status,
    }

    await api
      .put<Post>(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/admin/posts/${post.slug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => response.data)

    onReload()
    setOpen(false)
  }

  async function handleDelete() {
    setLoading(true)

    await api
      .delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/admin/posts/${post.slug}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => response.data)
      .finally(() => setLoading(false))

    onReload()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mx-4 mb-4 h-fit w-fit cursor-pointer place-self-end rounded-sm bg-gray-900 px-2 py-1 text-sm font-normal duration-300 hover:bg-gray-950">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit w-[85%] border-0 bg-gray-800 p-7 md:w-[60%]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-200 md:text-xl">
            Edição
          </DialogTitle>
          <DialogDescription className="text-zinc-200">
            Altere as informações da sua postagem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Digite seu título..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-32 resize-none bg-zinc-200 text-black"
                      placeholder="Digite o conteúdo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-3"
                    >
                      {['Rascunho', 'Publicado'].map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <RadioGroupItem value={value} id={value} />
                          <Label
                            className="text-sm font-normal"
                            htmlFor={value}
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || loading}
              className="w-full cursor-pointer rounded-sm bg-gray-900 px-2 py-1 text-sm font-normal duration-300 hover:bg-gray-950"
            >
              {form.formState.isSubmitting ? 'Carregando...' : 'Atualizar'}
            </Button>
          </form>
        </Form>
        <Button
          disabled={form.formState.isSubmitting || loading}
          className="w-full cursor-pointer rounded-sm bg-red-900 px-2 py-1 text-sm font-normal duration-300 hover:bg-red-950"
          onClick={handleDelete}
        >
          {loading ? 'Carregando...' : 'Deletar'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
