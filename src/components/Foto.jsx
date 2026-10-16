
import { Avatar } from '@heroui/react'
import { UserRound } from 'lucide-react'

export function Foto({ src, nome = '', tamanho = 48 }) {
  return (
    <Avatar
      size="lg"
      className="overflow-hidden rounded-full"
      style={{ width: tamanho, height: tamanho, minWidth: tamanho }}
    >
      {src ? (
        <img
          src={src}
          alt={nome || 'Foto de perfil'}
          className="h-full w-full rounded-full object-cover"
        />
      ) : nome ? (
        nome.trim().charAt(0).toUpperCase()
      ) : (
        <UserRound size={tamanho * 0.55} />
      )}
    </Avatar>
  )
}
