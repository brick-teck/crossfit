/* Personalize este arquivo. Os dados abaixo são exemplos, não informações reais. */
const CONFIG = {
  nome: "FORGE BOX",
  slogan: "FORJADOS PELO ESFORÇO.",
  whatsapp: "",
  instagram: "",
  endereco: "",
  mapsUrl: "",
  funcionamento: "Horários de funcionamento a confirmar com a equipe.",
  cores: { primaria: "#FF5A1F", fundo: "#090909" },
  imagens: {
    hero: "assets/images/hero.jpg",
    experimental: "assets/images/community.jpg",
    sobre: "assets/images/lift.jpg",
    final: "assets/images/barbell.jpg",
  },
  mensagens: {
    experimental: "Olá! Gostaria de saber como funciona a aula experimental.",
    contato: "Olá! Gostaria de conhecer melhor o box.",
    horarios: "Olá! Gostaria de informações sobre os horários das aulas.",
  },
  periodos: [
    { id: "mensal", nome: "Mensal", unidade: "mês" },
    { id: "trimestral", nome: "Trimestral", unidade: "trimestre" },
    { id: "anual", nome: "Anual", unidade: "ano" },
  ],
  planos: [
    {
      nome: "Starter",
      descricao: "Encontre seu ritmo.",
      precos: { mensal: 149.9, trimestral: 449.7, anual: 1798.8 },
      beneficios: [
        "3 aulas por semana",
        "Acompanhamento durante as aulas",
        "Acesso aos horários disponíveis",
        "Ambiente de comunidade",
      ],
    },
    {
      nome: "Unlimited",
      descricao: "Faça do treino parte da sua vida.",
      destaque: true,
      precos: { mensal: 199.9, trimestral: 599.7, anual: 2398.8 },
      beneficios: [
        "Aulas ilimitadas conforme disponibilidade",
        "Acompanhamento durante os treinos",
        "Modalidades incluídas no plano",
        "Flexibilidade de horários",
      ],
    },
    {
      nome: "Performance",
      descricao: "Explore seu próximo nível.",
      precos: { mensal: 249.9, trimestral: 749.7, anual: 2998.8 },
      beneficios: [
        "Aulas ilimitadas conforme disponibilidade",
        "Treinos especiais previstos no plano",
        "Benefícios adicionais a confirmar",
        "Condições diferenciadas a confirmar",
      ],
    },
  ],
  modalidades: [
    {
      nome: "CrossFit",
      tag: "FORÇA + COMUNIDADE",
      imagem: "assets/images/hero.jpg",
      icon: "barbell",
      texto:
        "Treinamento funcional constantemente variado, com movimentos adaptados ao seu nível.",
      detalhe:
        "Cada aula combina técnica, treino e acompanhamento. O coach orienta adaptações de movimentos e intensidade para cada praticante.",
    },
    {
      nome: "LPO",
      tag: "TÉCNICA + POTÊNCIA",
      imagem: "assets/images/barbell.jpg",
      icon: "barbell",
      texto:
        "Levantamento de peso olímpico com foco em técnica, coordenação e força.",
      detalhe:
        "Uma modalidade dedicada aos fundamentos dos levantamentos olímpicos. Cargas e progressões são orientadas pelo coach.",
    },
    {
      nome: "Ginásticos",
      tag: "CONTROLE + MOVIMENTO",
      imagem: "assets/images/rings.jpg",
      icon: "activity",
      texto:
        "Controle corporal, mobilidade e fundamentos dos movimentos ginásticos.",
      detalhe:
        "Desenvolva consciência corporal com progressões adaptadas. A disponibilidade de aulas e equipamentos deve ser confirmada com a equipe.",
    },
    {
      nome: "Condicionamento",
      tag: "RITMO + RESISTÊNCIA",
      imagem: "assets/images/rowing.jpg",
      icon: "pulse",
      texto:
        "Exercícios cardiovasculares para explorar seu condicionamento físico.",
      detalhe:
        "Treinos que podem combinar remo, cordas e outros movimentos funcionais. Formato, duração e intensidade dependem da orientação do coach.",
    },
    {
      nome: "Mobilidade",
      tag: "QUALIDADE + CONTROLE",
      imagem: "assets/images/mobility.jpg",
      icon: "activity",
      texto:
        "Mobilidade e qualidade de movimento para acompanhar a sua evolução.",
      detalhe:
        "Práticas voltadas a explorar a amplitude e o controle dos movimentos. Converse com o coach sobre suas necessidades e limitações.",
    },
    {
      nome: "Aulas introdutórias",
      tag: "SEU PRIMEIRO PASSO",
      imagem: "assets/images/community.jpg",
      icon: "arrow",
      texto:
        "Uma experiência para conhecer a dinâmica das aulas e os fundamentos.",
      detalhe:
        "Conheça o ambiente e converse com a equipe antes de começar. Consulte condições, horários e a dinâmica da aula experimental.",
    },
  ],
  horarios: [
    {
      dia: "Segunda",
      aulas: [
        ["06:00", "CrossFit", "Rafael"],
        ["07:00", "CrossFit", "Marina"],
        ["12:00", "Mobilidade", "Marina"],
        ["17:00", "LPO", "Lucas"],
        ["18:00", "CrossFit", "Rafael"],
        ["19:00", "CrossFit", "Bruna"],
        ["20:00", "CrossFit", "Bruna"],
      ],
    },
    {
      dia: "Terça",
      aulas: [
        ["06:00", "CrossFit", "Marina"],
        ["07:00", "Condicionamento", "Bruna"],
        ["12:00", "CrossFit", "Lucas"],
        ["17:00", "Ginásticos", "Rafael"],
        ["18:00", "CrossFit", "Rafael"],
        ["19:00", "CrossFit", "Bruna"],
      ],
    },
    {
      dia: "Quarta",
      aulas: [
        ["06:00", "CrossFit", "Rafael"],
        ["07:00", "CrossFit", "Marina"],
        ["12:00", "LPO", "Lucas"],
        ["17:00", "CrossFit", "Lucas"],
        ["18:00", "Mobilidade", "Marina"],
        ["19:00", "CrossFit", "Bruna"],
        ["20:00", "CrossFit", "Bruna"],
      ],
    },
    {
      dia: "Quinta",
      aulas: [
        ["06:00", "Condicionamento", "Bruna"],
        ["07:00", "CrossFit", "Marina"],
        ["12:00", "CrossFit", "Lucas"],
        ["17:00", "Ginásticos", "Rafael"],
        ["18:00", "CrossFit", "Rafael"],
        ["19:00", "CrossFit", "Bruna"],
      ],
    },
    {
      dia: "Sexta",
      aulas: [
        ["06:00", "CrossFit", "Rafael"],
        ["07:00", "CrossFit", "Marina"],
        ["12:00", "Mobilidade", "Marina"],
        ["17:00", "LPO", "Lucas"],
        ["18:00", "CrossFit", "Rafael"],
        ["19:00", "Aula introdutória", "Bruna"],
      ],
    },
    {
      dia: "Sábado",
      aulas: [
        ["09:00", "Treino em comunidade", "Rafael"],
        ["10:00", "CrossFit", "Bruna"],
        ["11:00", "Aula introdutória", "Marina"],
      ],
    },
  ],
  coaches: [
    {
      nome: "Rafael Costa",
      especialidade: "CrossFit & ginásticos",
      imagem: "assets/images/hero.jpg",
      posicao: "50% 25%",
      descricao:
        "A atenção à técnica acompanha cada desafio. Perfil fictício para demonstração do layout.",
    },
    {
      nome: "Marina Alves",
      especialidade: "Mobilidade & fundamentos",
      imagem: "assets/images/community.jpg",
      posicao: "50% 35%",
      descricao:
        "Movimento com intenção e orientação para começar no seu ritmo. Perfil fictício para demonstração do layout.",
    },
    {
      nome: "Lucas Mendes",
      especialidade: "LPO & força",
      imagem: "assets/images/barbell.jpg",
      posicao: "50% 25%",
      descricao:
        "Um olhar atento aos fundamentos e às progressões de cada praticante. Perfil fictício para demonstração do layout.",
    },
    {
      nome: "Bruna Rocha",
      especialidade: "Condicionamento & iniciação",
      imagem: "assets/images/mobility.jpg",
      posicao: "50% 20%",
      descricao:
        "Energia para o grupo e atenção ao seu caminho individual. Perfil fictício para demonstração do layout.",
    },
  ],
  galeria: [
    {
      imagem: "assets/images/community.jpg",
      titulo: "A força de treinar junto",
      alt: "Atleta em levantamento com pessoas acompanhando o treino",
    },
    {
      imagem: "assets/images/lift.jpg",
      titulo: "Cada movimento tem intenção",
      alt: "Atleta se preparando para levantar uma barra",
    },
    {
      imagem: "assets/images/rowing.jpg",
      titulo: "Encontre seu ritmo",
      alt: "Praticante em um equipamento de remo indoor",
    },
    {
      imagem: "assets/images/barbell.jpg",
      titulo: "Técnica antes de tudo",
      alt: "Atleta realizando agachamento com barra",
    },
    {
      imagem: "assets/images/functional.jpg",
      titulo: "Presença. Esforço. Evolução.",
      alt: "Praticante em treino funcional",
    },
    {
      imagem: "assets/images/hero.jpg",
      titulo: "O próximo desafio espera",
      alt: "Atleta com barra na altura dos ombros em um box",
    },
    {
      imagem: "assets/images/rings.jpg",
      titulo: "Controle em cada movimento",
      alt: "Praticante em exercício com argolas ginásticas",
    },
    {
      imagem: "assets/images/kettlebell.jpg",
      titulo: "Força em movimento",
      alt: "Praticante treinando com kettlebell",
    },
  ],
  wod: {
    nome: "FORGE ENGINE",
    tipo: "AMRAP",
    duracao: "15:00",
    formato: "15 minutos · quantas rodadas forem possíveis",
    movimentos: [
      ["12", "Kettlebell swings"],
      ["10", "Box step-ups"],
      ["08", "Burpees"],
      ["200 m", "Remo"],
    ],
    orientacao:
      "Cargas, movimentos e intensidade devem ser adaptados pelo coach. Este treino é apenas um exemplo de apresentação.",
  },
  eventos: [
    {
      nome: "Saturday crew",
      tag: "TREINO ESPECIAL",
      imagem: "assets/images/community.jpg",
      texto:
        "Uma proposta de treino coletivo para reunir o box. Evento ilustrativo, sem data definida.",
    },
    {
      nome: "Desafio do box",
      tag: "DESAFIO COLETIVO",
      imagem: "assets/images/barbell.jpg",
      texto:
        "Técnica, esforço e torcida em uma experiência de equipe. Evento ilustrativo, sem data definida.",
    },
    {
      nome: "Além do WOD",
      tag: "CONFRATERNIZAÇÃO",
      imagem: "assets/images/lift.jpg",
      texto:
        "Um encontro para fortalecer as conexões que começam no treino. Evento ilustrativo, sem data definida.",
    },
  ],
  depoimentos: [
    {
      nome: "Ana P.",
      texto:
        "O que mais gosto é sentir que faço parte do grupo. Cada treino tem um desafio e alguém por perto para orientar.",
    },
    {
      nome: "Pedro M.",
      texto:
        "Começar parecia difícil, mas conhecer a dinâmica da aula e conversar com o coach fez toda a diferença.",
    },
    {
      nome: "Camila R.",
      texto:
        "Aqui, a motivação vem também da comunidade. É bom encontrar pessoas que torcem umas pelas outras.",
    },
  ],
  faq: [
    [
      "Preciso ter experiência para começar?",
      "Treinos podem ser adaptados a diferentes níveis. Converse com a equipe sobre sua experiência e necessidades antes de começar.",
    ],
    [
      "Posso fazer uma aula experimental?",
      "A proposta é conhecer o ambiente, os coaches e a dinâmica do treino. Consulte disponibilidade, condições e possíveis custos com a equipe.",
    ],
    [
      "Como funcionam os horários?",
      "A grade deste website é ilustrativa. Os horários, modalidades e a forma de reservar uma aula devem ser confirmados diretamente com o box.",
    ],
    [
      "Posso treinar todos os dias?",
      "A frequência depende do plano contratado, da disponibilidade e da orientação profissional. Converse com o coach para encontrar um ritmo adequado.",
    ],
    [
      "Os exercícios são adaptados para iniciantes?",
      "Movimentos, cargas e intensidade podem ser ajustados pelo coach ao nível de cada praticante. Informe suas limitações e dúvidas antes da aula.",
    ],
    [
      "Quais são as formas de pagamento?",
      "As formas de pagamento e condições comerciais são definidas por cada box. Solicite as informações atualizadas à equipe.",
    ],
    [
      "Preciso fazer matrícula?",
      "O processo de inscrição e os documentos necessários dependem das regras do box. Confirme com a equipe antes de iniciar os treinos.",
    ],
  ],
};
