'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { useReloadStore } from '@/stores/useReloadStore'
import { Post } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileImage } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalProps {
  token: string
  post?: Post
  create: boolean
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O título precisa ter pelo menos 2 caracteres' }),
  body: z
    .string()
    .min(2, { message: 'O conteúdo precisa ter pelo menos 2 caracteres' }),
  tags: z
    .string()
    .min(2, { message: 'As tags precisam ter pelo menos 2 caracteres' }),
  status: z.enum(['Rascunho', 'Publicado']),
  cover: z
    .instanceof(File)
    .refine(
      (file) => ['image/png', 'image/jpeg', 'image/gif'].includes(file.type),
      { message: 'Tipo de imagem inválido' },
    )
    .nullable(),
})

type FormData = z.infer<typeof formSchema>

export function Modal({ post, token, create }: ModalProps) {
  const [open, setOpen] = useState(false)
  const { setReload } = useReloadStore()
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<null | string>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      tags: post?.tags || '',
      cover: null,
      status: post
        ? post.status === 'DRAFT'
          ? 'Rascunho'
          : 'Publicado'
        : 'Rascunho',
    },
  })

  async function onSubmit(formData: FormData) {
    const update =
      form.formState.defaultValues?.title !== formData.title ||
      form.formState.defaultValues?.body !== formData.body ||
      form.formState.defaultValues?.status !== formData.status

    const status = formData.status === 'Rascunho' ? 'DRAFT' : 'PUBLISHED'

    if (update && post) {
      const data = {
        title: formData.title,
        body: formData.body,
        status,
      }

      await api
        .put<Post>(`/admin/posts/${post.slug}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)

      setReload(true)
      setOpen(false)
      form.reset(form.getValues())
    }

    if (create) {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('body', formData.body)
      data.append('tags', formData.tags)
      data.append('status', status)

      if (formData.cover) {
        data.append('cover', formData.cover)
      }

      await api
        .post<Post>(`/admin/posts`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => response.data)

      setReload(true)
      setOpen(false)
      form.reset()
    }
  }

  async function handleDelete() {
    setLoading(true)

    if (post) {
      await api
        .delete(
          `/admin/posts/${post.slug}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => response.data)
        .finally(() => setLoading(false))

      setReload(true)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-fit w-fit cursor-pointer rounded-sm bg-gray-900 px-2 py-1 text-xs font-normal duration-300 hover:bg-gray-950 md:text-sm">
          {create ? 'Criar nova postagem' : 'Editar'}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit w-[85%] border-0 bg-gray-800 p-7 md:w-[60%]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-zinc-200 md:text-xl">
            {create ? 'Criação' : 'Edição'} de postagem
          </DialogTitle>
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
                      autoFocus
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Digite separadas por vírgula)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Digite as tags..."
                      disabled={!create}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <div
                    className={`relative flex w-fit items-center gap-1 rounded-sm px-2 py-1 ${create ? 'bg-zinc-200 hover:bg-zinc-400' : 'bg-zinc-400'} text-sm font-normal text-black duration-300`}
                  >
                    <FileImage size={18} /> Selecionar imagem
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/gif"
                      disabled={!create}
                      className={`absolute inset-0 h-full w-full ${create ? 'cursor-pointer' : 'cursor-default'} opacity-0`}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        field.onChange(file || null) // atualiza o form
                        setFileName(file?.name || null)
                      }}
                    />
                  </div>
                  {fileName && (
                    <p className="line-clamp-1 flex-1 text-sm text-gray-300">
                      Selecionado: {fileName}
                    </p>
                  )}
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
                          <RadioGroupItem
                            className="bg-zinc-200"
                            value={value}
                            id={value}
                          />
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
              {create
                ? form.formState.isSubmitting
                  ? 'Salvando...'
                  : 'Salvar'
                : form.formState.isSubmitting
                  ? 'Atualizando...'
                  : 'Atualizar'}
            </Button>
          </form>
        </Form>
        {!create && (
          <Button
            disabled={form.formState.isSubmitting || loading}
            className="w-full cursor-pointer rounded-sm bg-red-900 px-2 py-1 text-sm font-normal duration-300 hover:bg-red-950"
            onClick={handleDelete}
          >
            {loading ? 'Deletando...' : 'Deletar'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
