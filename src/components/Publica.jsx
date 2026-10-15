import { Heart, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Carregando } from './Carregando'

export function Publica() {
  const { usuario, carregando } = useAuth()

  if (carregando) return <Carregando />
  if (usuario) return <Navigate to={usuario.permissoes?.includes('api.change_organizacao') ? '/admin/agenda' : '/inicio'} replace />

  return (
    <main className="clinic-public-shell">
      <section className="clinic-public-story">
        <a className="clinic-brand" href="/" aria-label="Sorriso Clínica Odontológica - início">
          <span className="clinic-brand-mark"><Stethoscope size={23} strokeWidth={1.8} /></span>
          <span className="clinic-brand-name">Sorriso<span className="clinic-brand-subtitle">Clínica odontológica</span></span>
        </a>

        <div className="clinic-story-copy">
          <span className="clinic-eyebrow"><Sparkles size={15} /> Cuidado que acolhe</span>
          <h1>Seu sorriso merece um cuidado <span>especial.</span></h1>
          <p>Um espaço pensado para você se sentir bem, com atendimento atencioso e cuidado em cada detalhe da sua saúde bucal.</p>
          <div className="clinic-benefits">
            <span className="clinic-benefit"><Heart size={17} /> Atendimento humanizado</span>
            <span className="clinic-benefit"><ShieldCheck size={17} /> Cuidado com confiança</span>
          </div>
        </div>

        <div className="clinic-art" aria-hidden="true">
          <div className="clinic-art-orbit" />
          <div className="clinic-art-center"><Stethoscope /></div>
          <span className="clinic-art-bubble one"><Heart size={24} /></span>
          <span className="clinic-art-bubble two"><Sparkles size={24} /></span>
        </div>
        <small style={{ color: 'var(--clinic-muted)' }}>Um novo jeito de cuidar de você.</small>
      </section>

      <section className="clinic-public-panel">
        <div className="clinic-auth-card">
          <Outlet />
          <p className="clinic-auth-foot">Cuidar do seu sorriso também é cuidar de você.</p>
        </div>
      </section>
    </main>
  )
}
