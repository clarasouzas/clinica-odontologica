import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../AuthContext'
import { ConsultaItem } from '../components/ConsultaItem'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { hoje } from '../formatos'
import { useApi } from '../hooks/useApi'

function ehProxima(consulta) {
  return ['solicitado', 'confirmado'].includes(consulta.status) && new Date(consulta.fim) > new Date()
}

async function buscarProximaConsulta(caminho) {
  let proxima = caminho
  while (proxima) {
    const dados = await api(proxima)
    const consulta = dados.results.find(ehProxima)
    if (consulta) return consulta
    proxima = dados.next
  }
  return null
}

export function Inicio() {
  const { usuario } = useAuth()
  const organizacao = useApi('/organizacao/')
  const consulta = useApi(`/agendamentos/?data_inicio=${hoje()}`, buscarProximaConsulta)

  if (organizacao.erro) return <Erro erro={organizacao.erro} tentarDeNovo={organizacao.recarregar} />
  if (consulta.erro) return <Erro erro={consulta.erro} tentarDeNovo={consulta.recarregar} />
  if (organizacao.carregando || consulta.carregando) return <Carregando />

  return (
    <Row className="g-4">
      <Col md={5}>
        <Card className="clinic-calendar-card h-100">
          <Card.Body className="p-2">
            <Image
              src="/calendario.png"
              alt="Calendário de consultas odontológicas"
              className="clinic-calendar-image"
              fluid
            />
          </Card.Body>
        </Card>
      </Col>

      <Col md={7}>
        <p className="clinic-dashboard-eyebrow">SEU CUIDADO, NO SEU TEMPO</p>
        <h2>Olá, {usuario.nome}!</h2>

        <h5 className="mt-4">Sua próxima consulta</h5>

        {consulta.dados ? (
          <ListGroup className="mb-3">
            <ConsultaItem consulta={consulta.dados} />
          </ListGroup>
        ) : (
          <p className="text-secondary">Você não tem consultas agendadas.</p>
        )}

        <Button as={Link} to="/agendar" size="lg">
          <i className="bi bi-calendar-plus"></i> Agendar consulta
        </Button>
      </Col>
    </Row>
  )
}