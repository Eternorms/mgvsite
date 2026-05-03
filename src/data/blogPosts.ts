export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Mercado' | 'Guias' | 'Investimento';
  readTime: string;
  gradient: string;
  image: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mercado-imoveis-guaruja-2026',
    title: 'Mercado imobiliário de Guarujá: tendências para 2026',
    excerpt: 'O litoral paulista segue valorizado. Veja bairros, perfis de compra e pontos de atenção para investir com mais segurança.',
    date: '18 Abr 2026',
    category: 'Mercado',
    readTime: '5 min',
    gradient: 'linear-gradient(145deg, #0d2848, #081c34)',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Guarujá combina liquidez, oferta diversificada e demanda constante por imóveis próximos ao mar. Em 2026, compradores seguem priorizando localização, conservação do condomínio, vaga de garagem e documentação regularizada.',
      'Regiões como Enseada, Pitangueiras e Jardim Acapulco mantêm perfis distintos. Enseada concentra apartamentos amplos e boa oferta para famílias; Pitangueiras favorece mobilidade e serviços; Acapulco segue como referência em casas de condomínio.',
      'Antes de decidir, compare o custo total do imóvel, incluindo condomínio, IPTU, manutenção preventiva e potencial de locação. Uma análise consultiva reduz risco e evita decisões baseadas apenas no preço anunciado.',
    ],
  },
  {
    slug: 'dicas-comprar-imovel-litoral',
    title: '7 pontos essenciais para comprar um imóvel no litoral',
    excerpt: 'Da escolha da localização à verificação documental, reunimos critérios práticos para uma compra segura e tranquila.',
    date: '02 Abr 2026',
    category: 'Guias',
    readTime: '8 min',
    gradient: 'linear-gradient(155deg, #182808, #0e1e05)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Comprar no litoral exige atenção ao uso pretendido: moradia, temporada, investimento ou composição patrimonial. Cada objetivo muda a prioridade entre vista, lazer, liquidez, tamanho e custo mensal.',
      'Verifique matrícula, certidões, regularidade do condomínio, histórico de manutenção e eventuais restrições urbanísticas. Em imóveis próximos ao mar, avalie também ventilação, corrosão, impermeabilização e estado das esquadrias.',
      'Visite o entorno em horários diferentes e simule a rotina. Serviços, acesso, ruído, segurança e vagas para visitantes podem pesar tanto quanto a metragem interna.',
    ],
  },
  {
    slug: 'riviera-sao-lourenco-investimento',
    title: 'Por que a Riviera de São Lourenço atrai investidores',
    excerpt: 'Infraestrutura planejada, segurança e padrão construtivo sustentam a procura por imóveis na Riviera.',
    date: '21 Mar 2026',
    category: 'Investimento',
    readTime: '6 min',
    gradient: 'linear-gradient(150deg, #08162a, #050e1c)',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    body: [
      'A Riviera de São Lourenço se diferencia pela urbanização planejada, conservação dos espaços e conveniência para famílias que buscam praia com infraestrutura completa.',
      'Para investimento, os diferenciais estão na baixa comparabilidade com praias menos estruturadas, no interesse de locação de temporada e na percepção de segurança patrimonial.',
      'O ponto crítico é escolher produto compatível com demanda real: localização dentro dos módulos, idade do edifício, lazer, vista, vagas e valor de condomínio precisam entrar na conta.',
    ],
  },
  {
    slug: 'documentacao-compra-imovel',
    title: 'Documentação necessária para comprar um imóvel',
    excerpt: 'Entenda documentos do comprador, vendedor e imóvel para conduzir uma negociação sem surpresas.',
    date: '10 Mar 2026',
    category: 'Guias',
    readTime: '10 min',
    gradient: 'linear-gradient(145deg, #28190a, #180f05)',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    body: [
      'A análise documental começa pela matrícula atualizada, que mostra propriedade, ônus, averbações e histórico registral. Também são avaliadas certidões pessoais dos vendedores e regularidade fiscal.',
      'Em condomínios, solicite declaração de quitação condominial e confirme regras internas que possam afetar uso, reforma ou locação. Em financiamento, alinhe prazos de banco e cartório antes do sinal.',
      'A intermediação profissional organiza essas etapas, reduzindo ruído entre comprador, vendedor, instituição financeira e cartório.',
    ],
  },
  {
    slug: 'imovel-temporada-guaruja',
    title: 'Imóvel para temporada em Guarujá: vale a pena?',
    excerpt: 'Rentabilidade depende de localização, gestão, conservação e calendário. Veja como avaliar antes de comprar.',
    date: '24 Fev 2026',
    category: 'Investimento',
    readTime: '7 min',
    gradient: 'linear-gradient(155deg, #0e2238, #122848)',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80',
    body: [
      'A locação de temporada pode ajudar a custear condomínio e manutenção, mas não deve ser projetada apenas com base em alta temporada. O resultado depende de ocupação, diária média e qualidade da gestão.',
      'Imóveis bem fotografados, próximos à praia, com vaga, ar-condicionado e boa estrutura de lazer tendem a performar melhor. Por outro lado, desgaste, limpeza e reposição de itens precisam entrar no cálculo.',
      'Antes de comprar, verifique regras do condomínio para locação curta e compare o retorno esperado com alternativas de menor esforço operacional.',
    ],
  },
  {
    slug: 'valorizacao-imoveis-praia',
    title: 'Como avaliar a valorização de imóveis de praia',
    excerpt: 'Infraestrutura, acesso, qualidade construtiva e liquidez local influenciam o potencial de valorização.',
    date: '05 Fev 2026',
    category: 'Mercado',
    readTime: '6 min',
    gradient: 'linear-gradient(145deg, #182808, #0d2848)',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Valorização não é apenas proximidade da praia. Edifício bem conservado, documentação regular, planta eficiente, vagas e liquidez do bairro costumam pesar mais no médio prazo.',
      'Observe investimentos públicos e privados no entorno, facilidade de acesso, oferta de serviços e histórico de revenda de imóveis semelhantes.',
      'A melhor compra combina uso pessoal com fundamentos de mercado. Quando o imóvel atende bem a ambos, a decisão fica mais sustentável.',
    ],
  },
];

export function getBlogPostBySlug(slug: string | undefined): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
