
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, mensagemDeErro } from '../api/client';

export function Avaliar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function enviarAvaliacao(event) {
    event.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      await api(`/agendamentos/${id}/avaliar/`, {
        method: 'POST',
        body: {
          nota,
          comentario,
        },
      });

      navigate(`/consultas/${id}`);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="avaliar-page">
      <Link to={`/consultas/${id}`} className="avaliar-voltar">
        ← Voltar à consulta
      </Link>

      <section className="avaliar-card">
        <span className="landing-eyebrow">SUA OPINIÃO IMPORTA</span>

        <h1>Conte como foi sua <em>experiência.</em></h1>

        <p>
          Sua avaliação ajuda a Lúmen Odontologia a oferecer um cuidado
          cada vez melhor.
        </p>

        <form onSubmit={enviarAvaliacao}>
          <fieldset className="avaliar-notas">
            <legend>Como você avalia o atendimento?</legend>

            <div className="avaliar-estrelas">
              {[1, 2, 3, 4, 5].map((valor) => (
                <button
                  key={valor}
                  type="button"
                  className={valor <= nota ? 'estrela ativa' : 'estrela'}
                  onClick={() => setNota(valor)}
                  aria-label={`${valor} ${valor === 1 ? 'estrela' : 'estrelas'}`}
                  aria-pressed={nota === valor}
                >
                  ★
                </button>
              ))}
            </div>

            <span className="avaliar-nota-texto">
              {nota} de 5 estrelas
            </span>
          </fieldset>

          <label htmlFor="comentario">Comentário (opcional)</label>
          <textarea
            id="comentario"
            rows={5}
            maxLength={1000}
            placeholder="Compartilhe sua experiência..."
            value={comentario}
            onChange={(event) => setComentario(event.target.value)}
          />

          {erro && <p className="avaliar-erro" role="alert">{erro}</p>}

          <button className="avaliar-enviar" type="submit" disabled={carregando}>
            {carregando ? 'Enviando avaliação...' : 'Enviar avaliação ↗'}
          </button>
        </form>
      </section>
    </main>
  );
}
