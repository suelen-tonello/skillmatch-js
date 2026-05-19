const candidato = {
  nome: "Suelen Tonello",
  area: "Front-End",
  habilidades: [
    "JavaScript",
    "GitHub",
    "Logica de Programacao",
    "Kanban",
    "HTML",
    "CSS",
  ],
  experienciaMeses: 10,
  aceitaModeloHibrido: true,
};

const vagas = [
  new VagaFrontEnd(
    1,
    "diadev",
    "Desenvolvedor Front-End Junior",
    ["JavaScript", "GitHub", "Logica de Programacao", "HTML", "CSS"],
    2800,
    "Remoto",
    "Junior",
  ),
  new VagaFrontEnd(
    2,
    "codemaster",
    "Estagio Front-End",
    ["JavaScript", "Kanban", "GitHub", "HTML"],
    1800,
    "Hibrido",
    "Estagio",
  ),
  new VagaFrontEnd(
    3,
    "novocode",
    "Programador JavaScript Junior",
    ["JavaScript", "Arrays", "Objetos", "Funcoes"],
    3000,
    "Presencial",
    "Junior",
  ),
];

class Vaga {
  // Classe base para representar uma vaga de emprego
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    // Construtor para inicializar os atributos da vaga
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    // Método para exibir um resumo da vaga
    return `${this.cargo} na empresa ${this.empresa}`; // Exemplo: "Desenvolvedor Front-End Junior na empresa TechStart"
  }

  atendeTodosRequisitos(habilidadesCandidato) {
    // Método para verificar se o candidato atende a todos os requisitos da vaga
    return this.requisitos.every(
      (
        requisito, // Verifica se cada requisito da vaga está presente nas habilidades do candidato
      ) => habilidadesCandidato.includes(requisito), // Retorna true se o candidato atender a todos os requisitos, caso contrário retorna false
    );
  }
}

class VagaFrontEnd extends Vaga {
  // Classe que representa uma vaga específica para Front-End, estendendo a classe Vaga
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    // Construtor para inicializar os atributos da vaga Front-End, incluindo o nível da vaga
    super(id, empresa, cargo, requisitos, salario, modalidade); // Chama o construtor da classe base Vaga para inicializar os atributos herdados
    this.nivel = nivel; // Inicializa o nível da vaga
  }

  exibirNivel() {
    // Método para exibir o nível da vaga
    return `Nivel da vaga: ${this.nivel}`; // Exemplo: "Nivel da vaga: Junior"
  }
}

function calcularCompatibilidade(candidatoAtual, vagaAtual) {
  // Função para calcular a compatibilidade entre o candidato e a vaga
  const habilidadesEncontradas = vagaAtual.requisitos.filter(
    (
      requisito, // Filtra os requisitos da vaga para encontrar quais habilidades do candidato correspondem aos requisitos
    ) => candidatoAtual.habilidades.includes(requisito), // Retorna um array com as habilidades encontradas que correspondem aos requisitos da vaga
  );

  const habilidadesFaltantes = vagaAtual.requisitos.filter(
    // Filtra os requisitos da vaga para encontrar quais habilidades do candidato não possui
    (requisito) => !candidatoAtual.habilidades.includes(requisito), // Retorna um array com as habilidades faltantes que o candidato não possui em relação aos requisitos da vaga
  );

  const percentual = Number(
    // Calcula o percentual de compatibilidade com base nas habilidades encontradas em relação ao total de requisitos da vaga
    (
      (habilidadesEncontradas.length / vagaAtual.requisitos.length) * // Calcula a proporção de habilidades encontradas em relação ao total de requisitos da vaga
      100
    ).toFixed(2), // Arredonda o resultado para 2 casas decimais e converte para número
  );

  return {
    // Retorna um objeto com as informações da vaga, habilidades encontradas, habilidades faltantes, percentual de compatibilidade, classificação e se atende todos os requisitos
    vaga: vagaAtual, // Inclui a vaga atual no resultado para facilitar o acesso às informações da vaga
    habilidadesEncontradas,
    habilidadesFaltantes,
    percentual,
    classificacao: classificarCompatibilidade(percentual), // Classifica a compatibilidade com base no percentual calculado
    atendeTodos: vagaAtual.atendeTodosRequisitos(candidatoAtual.habilidades), // Verifica se o candidato atende a todos os requisitos da vaga usando o método da classe Vaga
  };
}

function classificarCompatibilidade(percentual) {
  // Função para classificar a compatibilidade com base no percentual calculado
  if (percentual >= 80) {
    return "Alta compatibilidade";
  }

  if (percentual >= 50) {
    return "Media compatibilidade";
  }

  return "Baixa compatibilidade";
}

function buscarVagaPorId(listaVagas, id) {
  // Função para buscar uma vaga específica por ID usando o método find
  return listaVagas.find((vaga) => vaga.id === id); // Retorna a vaga encontrada com o ID correspondente ou undefined se não encontrar
}

function encontrarMelhorVaga(resultados) {
  // Função para encontrar a vaga com a maior compatibilidade usando o método reduce
  return resultados.reduce((melhor, atual) => {
    // Compara o percentual de compatibilidade do resultado atual com o melhor encontrado até agora
    if (!melhor) {
      // Se ainda não houver um melhor definido, o resultado atual se torna o melhor
      return atual; // Retorna o resultado atual como o melhor encontrado até agora
    }
    return atual.percentual > melhor.percentual ? atual : melhor; // Compara os percentuais de compatibilidade e retorna o resultado com o maior percentual
  }, null); // O segundo argumento null é o valor inicial para o acumulador, indicando que inicialmente não há um melhor definido
}

function gerarRecomendacaoEstudo(resultados) {
  // Função para gerar uma recomendação de estudo com base nas habilidades faltantes mais comuns entre as vagas analisadas
  const mapaFaltantes = resultados.reduce((acumulador, resultado) => {
    // Para cada resultado, itera sobre as habilidades faltantes e conta a frequência de cada habilidade faltante em um objeto acumulador
    resultado.habilidadesFaltantes.forEach((habilidade) => {
      // Para cada habilidade faltante, incrementa a contagem no acumulador
      acumulador[habilidade] = (acumulador[habilidade] || 0) + 1; // Se a habilidade já tiver uma contagem, incrementa; caso contrário, inicia a contagem em 1
    });
    return acumulador; // Retorna o acumulador atualizado para a próxima iteração do reduce
  }, {});

  const habilidadesPriorizadas = Object.entries(mapaFaltantes) // Converte o objeto de habilidades faltantes em um array de [habilidade, contagem] para facilitar a ordenação
    .sort((a, b) => b[1] - a[1]) // Ordena o array de habilidades faltantes com base na contagem em ordem decrescente, para priorizar as habilidades mais comuns entre as vagas analisadas
    .map((item) => item[0]); // Mapeia o array ordenado para obter apenas as habilidades, resultando em um array de habilidades priorizadas para estudo

  if (habilidadesPriorizadas.length === 0) {
    // Se não houver habilidades faltantes, significa que o candidato atende a todos os requisitos das vagas analisadas
    return "Voce ja atende todos os requisitos das vagas analisadas. Foque em praticar entrevistas e portfolio."; // Retorna uma mensagem indicando que o candidato já atende a todos os requisitos e pode focar em outras áreas para se preparar para as entrevistas
  }

  return `Priorize estudar: ${habilidadesPriorizadas.join(", ")}. Esses temas aparecem com frequencia nas vagas analisadas.`; // Retorna uma mensagem recomendando as habilidades a serem priorizadas para estudo, listando as habilidades faltantes mais comuns entre as vagas analisadas
}

function criarContadorDeAnalises() {
  // Função para criar um contador de análises utilizando closure, permitindo contar o número de análises realizadas durante a execução do sistema
  let total = 0;

  return function incrementar() {
    // Função interna que incrementa o contador total de análises e retorna o valor atualizado
    total += 1;
    return total;
  };
}

function finalizarAnalise(nomeCandidato, callback) {
  // Função para finalizar a análise e executar um callback com o nome do candidato
  console.log("\nAnalise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  // Função para exibir a mensagem final ao candidato

  console.log(
    `${nome}, revise as habilidades faltantes e atualize seu plano de estudos.`, // Exibe uma mensagem personalizada para o candidato, incentivando-o a revisar as habilidades faltantes e atualizar seu plano de estudos com base nos resultados da análise
  );
}

function buscarVagasSimuladas() {
  // Função para simular a busca de vagas, retornando uma promessa que resolve com o array de vagas após um atraso de 1 segundo, simulando uma operação assíncrona de busca de vagas em um banco de dados ou API, permitindo que o sistema continue a execução enquanto aguarda a resolução da promessa com as vagas disponíveis para análise de compatibilidade.
  return new Promise((resolve) => {
    // Retorna uma nova promessa que simula a busca de vagas com um atraso
    setTimeout(() => {
      // Simula um atraso de 1 segundo para representar o tempo de busca de vagas
      resolve(vagas); // Resolve a promessa com o array de vagas definido anteriormente, permitindo que o sistema continue a execução após a "busca" ser concluída
    }, 1000); // O tempo de atraso é definido em milissegundos (1000 ms = 1 segundo)
  });
}