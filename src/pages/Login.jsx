import { useState } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'
import { mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'

export function Login() {
  const { entrar } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    setErro(null)
    try {
      await entrar(email, senha)
    } catch (erroLogin) {
      setErro(mensagemDeErro(erroLogin))
      setEnviando(false)
    }
  }

  return (
    <>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem', marginBottom: '1.5rem' }}><ArrowLeft size={15} /> Voltar ao início</Link>
      <div className="clinic-auth-heading">
        <span className="clinic-brand-mark" style={{ width: 42, height: 42 }}><LockKeyhole size={20} /></span>
        <h2>Que bom ter você de volta!</h2>
        <p>Informe seus dados para acessar sua área de paciente.</p>
      </div>
      {erro && <div className="clinic-alert" role="alert">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="clinic-field">
          <label htmlFor="email">E-mail</label>
          <input id="email" className="clinic-input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" required />
        </div>
        <div className="clinic-field">
          <label htmlFor="senha">Senha</label>
          <input id="senha" className="clinic-input" type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite sua senha" required />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '.2rem 0 1.25rem', fontSize: '.85rem' }}><Link to="/esqueci-senha">Esqueci minha senha</Link></div>

        <Button
          type="submit"
          className="clinic-primary-button"
          isDisabled={enviando}
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
      <div className="clinic-auth-links" style={{ justifyContent: 'center' }}><span style={{ color: 'var(--clinic-muted)' }}>Ainda não tem conta?</span> <Link to="/cadastro">Cadastre-se gratuitamente</Link></div>
    </>
  )
}
