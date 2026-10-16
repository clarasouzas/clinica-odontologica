import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatarData, formatarHora } from '../formatos'
import { StatusConsulta } from './StatusConsulta'

export function ConsultaItem({ consulta, mostrarAluno = false }) {
  return (
    <ListGroup.Item action as={Link} to={`/consultas/${consulta.id}`} className="d-flex align-items-center gap-3">
      <div className="text-center">
        <div className="fw-bold">{formatarHora(consulta.inicio)}</div>
        <small className="text-secondary">{formatarData(consulta.inicio)}</small>
      </div>
      <div className="me-auto">
        <div className="fw-semibold">{consulta.servico_nome}</div>
        <small className="text-secondary">
          {consulta.recurso_nome}
          {mostrarAluno && ` · ${consulta.cliente_nome}`}
        </small>
        {mostrarAluno && consulta.observacoes && (
          <div><small className="fst-italic">{consulta.observacoes}</small></div>
        )}
      </div>
      <StatusConsulta status={consulta.status} />
    </ListGroup.Item>
  )
}