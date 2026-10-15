
import { Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Carregando } from './Carregando'

export function Publica() {
  const { usuario, carregando } = useAuth()

  if (carregando) return <Carregando />

  if (usuario) {
    return (
      <Navigate
        to={
          usuario.permissoes?.includes('api.change_organizacao')
            ? '/admin/agenda'
            : '/inicio'
        }
        replace
      />
    )
  }

  return (
    <main className="clinic-public-shell">
      <section className="clinic-public-story">
        <Link
          className="clinic-brand"
          to="/"
          aria-label="Sorriso Clínica Odontológica - início"
        >
          <img
            className="clinic-brand-logo"
            src="/logo.png"
            alt="Sorriso Clínica Odontológica"
          />
        </Link>

        <div className="clinic-story-copy">
          <span className="clinic-eyebrow">
            <Sparkles size={15} />
            Cuidado que acolhe
          </span>

          <h1>
            Seu sorriso merece um cuidado{' '}
            <span>especial.</span>
          </h1>

          <p>
            Um espaço pensado para você se sentir bem,
            com atendimento atencioso e cuidado em cada
            detalhe da sua saúde bucal.
          </p>

          <div className="clinic-benefits">
            <span className="clinic-benefit">
              <Heart size={17} />
              Atendimento humanizado
            </span>

            <span className="clinic-benefit">
              <ShieldCheck size={17} />
              Cuidado com confiança
            </span>
          </div>
        </div>
      </section>

      <section className="clinic-public-panel">
        <div className="clinic-auth-card">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
