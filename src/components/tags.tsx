interface TagProps {
  tags: string
}

export function Tags({ tags }: TagProps) {
  const tagsArray = tags.split(',').map((tag) => tag.trim())

  return (
    <div className="flex flex-col items-end gap-2 place-self-end text-xs md:flex-row md:items-start lg:text-sm">
      {tagsArray.map((tag, index) => (
        <span className="font-semibold" key={`${tag}-${index}`}>
          #{tag}
        </span>
      ))}
    </div>
  )
}
