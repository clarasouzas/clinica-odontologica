
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { api, mensagemDeErro } from '../api/client'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { formatarData } from '../formatos'
import { useApi } from '../hooks/useApi'

export function Avaliar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const consulta = useApi(`/agendamentos/${id}/`)

  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (consulta.erro) {
    return (
      <Erro
        erro={consulta.erro}
        tentarDeNovo={consulta.recarregar}
      />
    )
  }

  if (consulta.carregando) {
    return <Carregando />
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (nota === 0) {
      setErro('Selecione uma nota de 1 a 5 estrelas.')
      return
    }

    setErro(null)
    setEnviando(true)

    try {
      await api(`/agendamentos/${id}/avaliar/`, {
        method: 'POST',
        body: { nota, comentario },
      })

      navigate(`/consultas/${id}`)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2>Avaliar consulta</h2>

        <p className="text-secondary">
          {consulta.dados.servico_nome} com{' '}
          {consulta.dados.recurso_nome},{' '}
          {formatarData(consulta.dados.inicio)}
        </p>

        {erro && (
          <Alert variant="danger">
            {erro}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label className="d-block">
              Sua avaliação
            </Form.Label>

            <div className="d-flex align-items-center gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <Button
                  key={n}
                  type="button"
                  variant="link"
                  className="p-1"
                  onClick={() => {
                    setNota(n)
                    setErro(null)
                  }}
                  aria-label={`${n} ${
                    n === 1 ? 'estrela' : 'estrelas'
                  }`}
                  aria-pressed={nota === n}
                  style={{
                    color: '#f5a623',
                    textDecoration: 'none',
                  }}
                >
                  <Star
                    size={32}
                    strokeWidth={1.8}
                    fill={n <= nota ? '#f5a623' : 'none'}
                  />
                </Button>
              ))}
            </div>

            <div className="text-secondary">
              {nota === 0
                ? 'Selecione de 1 a 5 estrelas'
                : `${nota} de 5 estrelas`}
            </div>
          </div>

          <Form.Group
            className="mb-3"
            controlId="comentario"
          >
            <Form.Label>Comentário</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Conte como foi seu atendimento (opcional)"
            />
          </Form.Group>

          <Button
            type="submit"
            disabled={nota === 0 || enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar avaliação'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
