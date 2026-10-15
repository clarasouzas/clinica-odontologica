import { ArrowRight, CalendarDays, HeartPulse } from 'lucide-react'
import { Button } from '@heroui/react'
import { Link, useNavigate } from 'react-router-dom'

export function Entrada() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="clinic-auth-heading">
        <span className="clinic-eyebrow"><HeartPulse size={15} /> Bem-vinda(o) à Sorriso</span>
        <h2>Vamos cuidar do seu sorriso?</h2>
        <p>Entre na sua conta para agendar consultas, acompanhar seus atendimentos e manter seu cuidado em dia.</p>
      </div>
      <div style={{ display: 'grid', gap: '.8rem' }}>
        <Button className="clinic-primary-button" onPress={() => navigate('/login')}>
          Entrar na minha conta <ArrowRight size={17} />
        </Button>
        <Button className="clinic-secondary-button" onPress={() => navigate('/cadastro')}>
          Criar minha conta
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '.9rem', alignItems: 'flex-start', padding: '1rem', marginTop: '1.5rem', borderRadius: '14px', background: '#f8f5ff', color: 'var(--clinic-muted)', fontSize: '.88rem', lineHeight: 1.6 }}>
        <CalendarDays size={21} color="var(--clinic-violet)" style={{ flexShrink: 0, marginTop: 2 }} />
        <span>Agende sua avaliação e acompanhe suas consultas de um jeito simples, no seu tempo.</span>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--clinic-muted)', fontSize: '.84rem', marginTop: '1.5rem' }}>
        Já tem cadastro? <Link to="/login">Acesse por aqui</Link>
      </p>
    </div>
  )
}
