import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, mensagemDeErro } from '../api/client';

export function Dentista() {
  const { id } = useParams();

  const [dentista, setDentista] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarDentista() {
      setCarregando(true);
      setErro('');

      try {
        const dados = await api(`/recursos/${id}/`);

        if (ativo) {
          setDentista(dados);
        }
      } catch (error) {
        if (ativo) {
          setErro(mensagemDeErro(error));
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDentista();

    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) {
    return (
      <main className="dentista-detalhe">
        <p>Carregando informações do profissional...</p>
      </main>
    );
  }

  if (erro || !dentista) {
    return (
      <main className="dentista-detalhe">
        <h1>Não foi possível carregar o profissional.</h1>
        <p>{erro || 'Profissional não encontrado.'}</p>
        <Link className="dentista-voltar" to="/dentistas">
          ← Voltar para a equipe
        </Link>
      </main>
    );
  }

  return (
    <main className="dentista-detalhe">
      <Link className="dentista-voltar" to="/dentistas">
        ← Voltar para a equipe
      </Link>

      <section className="dentista-perfil">
        <div className="dentista-perfil-imagem">
          {dentista.imagem ? (
            <img
              src={dentista.imagem}
              alt={dentista.nome || 'Profissional'}
            />
          ) : (
            <span>
              {dentista.nome?.charAt(0)?.toUpperCase() || 'D'}
            </span>
          )}
        </div>

        <div className="dentista-perfil-info">
          <span className="dentistas-eyebrow">NOSSA EQUIPE</span>

          <h1>{dentista.nome || 'Profissional'}</h1>

          {dentista.especialidade && (
            <p className="dentista-perfil-especialidade">
              {dentista.especialidade}
            </p>
          )}

          {dentista.descricao && (
            <p className="dentista-perfil-descricao">
              {dentista.descricao}
            </p>
          )}

          <Link className="dentista-agendar" to="/agendar">
            Agendar consulta <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
