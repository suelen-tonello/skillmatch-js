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