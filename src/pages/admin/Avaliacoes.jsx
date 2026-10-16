
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Col, Form, ListGroup, Row } from 'react-bootstrap'
import { buscarTodas } from '../../api/client'
import { Avaliacao } from '../../components/Avaliacao'
import { Carregando } from '../../components/Carregando'
import { CarregarMais } from '../../components/CarregarMais'
import { Erro } from '../../components/Erro'
import { useApi, usePaginado } from '../../hooks/useApi'

export function Avaliacoes() {
  const [recurso, setRecurso] = useState('')
  const [nota, setNota] = useState('')

  const recursos = useApi('/recursos/', buscarTodas)

  const filtros = new URLSearchParams()
  if (recurso) filtros.set('recurso', recurso)
  if (nota) filtros.set('nota', nota)

  const avaliacoes = usePaginado(`/avaliacoes/?${filtros}`)

  return (
    <>
      <h2 className="mb-4">Avaliações</h2>

      <Row className="mb-4 g-2">
        <Col md={8}>
          <Form.Select
            value={recurso}
            onChange={e => setRecurso(e.target.value)}
            aria-label="Filtrar por dentista"
          >
            <option value="">Todos os dentistas</option>

            {recursos.dados?.map(r => (
              <option key={r.id} value={r.id}>
                {r.nome}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select
            value={nota}
            onChange={e => setNota(e.target.value)}
            aria-label="Filtrar por nota"
          >
            <option value="">Todas as notas</option>

            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'estrela' : 'estrelas'}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {nota && (
        <div className="d-flex align-items-center gap-1 mb-3">
          <span className="text-secondary me-1">
            Nota selecionada:
          </span>

          {Array.from({ length: Number(nota) }, (_, i) => (
            <Star
              key={i}
              size={18}
              color="#f5a623"
              fill="#f5a623"
            />
          ))}

          <span className="text-secondary ms-1">
            ({nota})
          </span>
        </div>
      )}

      {avaliacoes.erro && (
        <Erro
          erro={avaliacoes.erro}
          tentarDeNovo={avaliacoes.recarregar}
        />
      )}

      {!avaliacoes.carregando &&
        !avaliacoes.erro &&
        avaliacoes.itens.length === 0 && (
          <p className="text-secondary">
            Ainda sem avaliações.
          </p>
        )}

      <ListGroup>
        {avaliacoes.itens.map(avaliacao => (
          <Avaliacao
            key={avaliacao.id}
            avaliacao={avaliacao}
          />
        ))}
      </ListGroup>

      {avaliacoes.carregando ? (
        <Carregando />
      ) : (
        <CarregarMais lista={avaliacoes} />
      )}
    </>
  )
}
