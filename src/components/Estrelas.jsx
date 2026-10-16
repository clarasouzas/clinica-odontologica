
import { Star } from 'lucide-react'

export function Estrelas({ nota = 0 }) {
  const notaNumerica = Number(nota) || 0

  return (
    <span
      className="d-inline-flex align-items-center gap-1"
      aria-label={`Avaliação: ${notaNumerica} de 5 estrelas`}
      title={`${notaNumerica} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={18}
          strokeWidth={1.8}
          color="#f5a623"
          fill={n <= notaNumerica ? '#f5a623' : 'none'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
