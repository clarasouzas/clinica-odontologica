import { useState } from 'react'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'
import { mensagemDeErro, redefinirSenha } from '../api/client'

export function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await redefinirSenha(email)
      setEnviado(true)
    } catch (erroEnvio) {
      setErro(mensagemDeErro(erroEnvio))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.85rem', marginBottom: '1.5rem' }}><ArrowLeft size={15} /> Voltar ao login</Link>
      <div className="clinic-auth-heading">
        <span className="clinic-brand-mark" style={{ width: 42, height: 42 }}><MailCheck size={21} /></span>
        <h2>Vamos recuperar seu acesso</h2>
        <p>Informe o e-mail cadastrado. Se ele estiver na nossa base, enviaremos as instruções para redefinir sua senha.</p>
      </div>
      {enviado ? (
        <div className="clinic-alert success" role="status">Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {erro && <div className="clinic-alert" role="alert">{erro}</div>}
          <div className="clinic-field">
            <label htmlFor="email">E-mail cadastrado</label>
            <input id="email" className="clinic-input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="voce@exemplo.com" />
          </div>
          <Button type="submit" className="clinic-primary-button" isDisabled={enviando}>{enviando ? 'Enviando...' : 'Enviar link de recuperação'}</Button>
        </form>
      )}
    </>
  )
}
