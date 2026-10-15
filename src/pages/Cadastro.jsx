import { useState } from 'react'
import { ArrowLeft, UserRoundPlus } from 'lucide-react'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'
import { cadastrar, mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'

export function Cadastro() {
  const { entrar } = useAuth()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    setErro(null)
    setErros({})
    try {
      await cadastrar(nome, email, senha)
      await entrar(email, senha)
    } catch (erroCadastro) {
      setErro(mensagemDeErro(erroCadastro))
      setErros(erroCadastro.dados ?? {})
      setEnviando(false)
    }
  }

  const campoErro = campo => Array.isArray(erros[campo]) ? erros[campo].join(' ') : ''

  return (
    <>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem', marginBottom: '1.5rem' }}><ArrowLeft size={15} /> Voltar ao início</Link>
      <div className="clinic-auth-heading">
        <span className="clinic-brand-mark" style={{ width: 42, height: 42 }}><UserRoundPlus size={21} /></span>
        <h2>Crie sua conta</h2>
        <p>É rapidinho. Cadastre-se para marcar e acompanhar suas consultas.</p>
      </div>
      {erro && <div className="clinic-alert" role="alert">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="clinic-field">
          <label htmlFor="nome">Nome completo</label>
          <input id="nome" className="clinic-input" autoComplete="name" value={nome} onChange={e => setNome(e.target.value)} aria-invalid={!!campoErro('nome')} required placeholder="Como podemos chamar você?" />
          {campoErro('nome') && <small style={{ color: '#b42348' }}>{campoErro('nome')}</small>}
        </div>
        <div className="clinic-field">
          <label htmlFor="email">E-mail</label>
          <input id="email" className="clinic-input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={!!campoErro('email')} required placeholder="voce@exemplo.com" />
          {campoErro('email') && <small style={{ color: '#b42348' }}>{campoErro('email')}</small>}
        </div>
        <div className="clinic-field">
          <label htmlFor="senha">Crie uma senha</label>
          <input id="senha" className="clinic-input" type="password" autoComplete="new-password" value={senha} onChange={e => setSenha(e.target.value)} aria-invalid={!!campoErro('senha')} required minLength={8} placeholder="Use uma senha segura" />
          {campoErro('senha') && <small style={{ color: '#b42348' }}>{campoErro('senha')}</small>}
          <small style={{ color: 'var(--clinic-muted)' }}>Escolha uma senha segura com pelo menos 8 caracteres.</small>
        </div>
        <Button type="submit" className="clinic-primary-button" isDisabled={enviando}>
          {enviando ? 'Criando conta...' : <>Criar conta <UserRoundPlus size={17} /></>}
        </Button>
      </form>
      <div className="clinic-auth-links" style={{ justifyContent: 'center' }}><span style={{ color: 'var(--clinic-muted)' }}>Já tem uma conta?</span> <Link to="/login">Entrar</Link></div>
    </>
  )
}
