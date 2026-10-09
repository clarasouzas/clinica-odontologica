
import { Link } from 'react-router-dom';

export function NaoEncontrado() {
  return (
    <main className="nao-encontrado">
      <div className="nao-encontrado-conteudo">
        <span className="nao-encontrado-codigo">404</span>

        <span className="nao-encontrado-eyebrow">
          OPS! PÁGINA NÃO ENCONTRADA
        </span>

        <h1>Este caminho não leva ao seu sorriso.</h1>

        <p>
          A página que você procura pode ter sido removida,
          renomeada ou estar temporariamente indisponível.
        </p>

        <Link to="/" className="nao-encontrado-botao">
          Voltar ao início <span>↗</span>
        </Link>
      </div>

      <div className="nao-encontrado-decoracao" aria-hidden="true">
        <span>✳</span>
      </div>
    </main>
  );
}
