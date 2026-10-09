import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, buscarTodas, mensagemDeErro } from '../api/client';

export function Dentistas() {
  const [dentistas, setDentistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDentistas() {
      try {
        const dados = await buscarTodas('/recursos/');
        setDentistas(
          dados.filter((item) => item.ativo !== false)
        );
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }

    carregarDentistas();
  }, []);

  return (
    <section className="dentistas-page">
      <div className="dentistas-cabecalho">
        <span className="dentistas-eyebrow">NOSSA EQUIPE</span>
        <h1>Profissionais que cuidam de você.</h1>
        <p>
          Conheça nossa equipe e encontre o profissional ideal
          para acompanhar seu sorriso.
        </p>
      </div>

      {carregando && (
        <p className="dentistas-mensagem">Carregando profissionais...</p>
      )}

      {erro && (
        <div className="dentistas-erro">
          <p>{erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && dentistas.length === 0 && (
        <div className="dentistas-vazio">
          <h2>Nossa equipe está sendo atualizada.</h2>
          <p>Em breve, você poderá conhecer nossos profissionais.</p>
        </div>
      )}

      {!carregando && !erro && dentistas.length > 0 && (
        <div className="dentistas-grid">
          {dentistas.map((dentista) => (
            <article className="dentista-card" key={dentista.id}>
              {dentista.imagem ? (
                <img
                  className="dentista-foto"
                  src={dentista.imagem}
                  alt={dentista.nome}
                />
              ) : (
                <div className="dentista-foto-placeholder">
                  {dentista.nome?.charAt(0)?.toUpperCase() || 'D'}
                </div>
              )}

              <div className="dentista-card-conteudo">
                <h2>{dentista.nome}</h2>

                {dentista.especialidade && (
                  <p className="dentista-especialidade">
                    {dentista.especialidade}
                  </p>
                )}

                {dentista.descricao && (
                  <p className="dentista-descricao">
                    {dentista.descricao}
                  </p>
                )}

                <Link
                  className="dentista-link"
                  to={`/dentistas/${dentista.id}`}
                >
                  Conhecer profissional <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
