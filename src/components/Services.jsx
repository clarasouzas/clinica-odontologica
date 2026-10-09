const servicos = [
  {
    numero: '01',
    nome: 'Avaliação',
    descricao: 'Um primeiro passo para cuidar da saúde do seu sorriso.',
    preco: 'Gratuita',
    duracao: '30 minutos',
  },
  {
    numero: '02',
    nome: 'Limpeza',
    descricao: 'Prevenção e cuidado para dentes saudáveis.',
    preco: 'R$ 150,00',
    duracao: '45 minutos',
  },
  {
    numero: '03',
    nome: 'Restauração',
    descricao: 'Recupere a saúde e a beleza natural dos seus dentes.',
    preco: 'R$ 250,00',
    duracao: '60 minutos',
  },
  {
    numero: '04',
    nome: 'Clareamento',
    descricao: 'Mais luminosidade para o seu sorriso.',
    preco: 'R$ 600,00',
    duracao: '90 minutos',
  },
];

export function Services() {
  return (
    <section className="services section" id="servicos">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NOSSOS CUIDADOS</span>
          <h2>
            Cuidado pensado
            <br />
            para <em>você.</em>
          </h2>
        </div>

        <p>
          Cada sorriso é único. Por isso, oferecemos
          tratamentos que respeitam suas necessidades.
        </p>
      </div>

      <div className="services-grid">
        {servicos.map((servico) => (
          <article className="service-card" key={servico.numero}>
            <span className="service-number">{servico.numero}</span>

            <div className="service-icon">✳</div>

            <h3>{servico.nome}</h3>
            <p>{servico.descricao}</p>

            <div className="service-meta">
              <span>{servico.duracao}</span>
              <strong>{servico.preco}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
