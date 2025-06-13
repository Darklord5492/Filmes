let campoIdade, campoFantasia, campoAventura;

function setup() {
  createCanvas(800, 600);
  background(240);

  // Título
  createElement("h1", "🎬 Recomendador de Filmes Personalizado")
    .position(width / 2 - 200, 30)
    .style("color", "#2c3e50")
    .style("font-family", "Arial");

  // Controle de idade
  createP("Sua idade:").position(50, 100).style("font-size", "16px");
  campoIdade = createInput("10", "number")
    .position(125, 115)
    .size(60)
    .attribute("min", "5")
    .attribute("max", "100");

  // Checkboxes de preferências
  campoFantasia = createCheckbox(" Gosta de Fantasia", false)
    .position(50, 150)
    .changed(atualizarRecomendacao);

  campoAventura = createCheckbox(" Gosta de Aventura", false)
    .position(50, 180)
    .changed(atualizarRecomendacao);

  // Explicação das combinações
  createP("Selecione ambas para filmes de fantasia-aventura!")
    .position(50, 220)
    .style("color", "#7f8c8d")
    .style("font-size", "12px");
}

function draw() {
  // Fundo animado sutil
  background(240);
  noStroke();
  fill(230, 230, 250, 50);
  for (let i = 0; i < 5; i++) {
    ellipse(random(width), random(height), random(50, 150));
  }

  // Atualização contínua da recomendação
  atualizarRecomendacao();
}

function atualizarRecomendacao() {
  let idade = parseInt(campoIdade.value()) || 10;
  let fantasia = campoFantasia.checked();
  let aventura = campoAventura.checked();

  // Determina o tipo de recomendação baseado na combinação
  let tipoRecomendacao;
  if (fantasia && aventura) {
    tipoRecomendacao = "fantasiaAventura";
  } else if (fantasia) {
    tipoRecomendacao = "fantasia";
  } else if (aventura) {
    tipoRecomendacao = "aventura";
  } else {
    tipoRecomendacao = "geral";
  }

  let recomendacao = gerarRecomendacao(idade, tipoRecomendacao);

  // Exibe a recomendação
  fill(44, 62, 80); // Azul escuro
  textSize(24);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(recomendacao.titulo, width / 2, height / 2 - 20);

  // Exibe a descrição
  fill(100);
  textSize(16);
  textStyle(NORMAL);
  text(recomendacao.descricao, width / 2, height / 2 + 20, 300, 300);

  // Exibe o tipo de recomendação
  fill(70);
  textSize(14);
  text(`Tipo: ${recomendacao.tipo}`, width / 2, height / 2 + 100);
}

function gerarRecomendacao(idade, tipo) {
  // Filmes para crianças (5-12 anos)
  if (idade < 13) {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "A Jornada de Chihiro",
          descricao:
            "Animação fantástica sobre uma garota em um mundo de espíritos, cheia de aventuras mágicas.",
          tipo: "Fantasia-Aventura",
        };
      case "fantasia":
        return {
          titulo: "Meu Amigo Totoro",
          descricao:
            "Doce história sobre duas irmãs que descobram criaturas mágicas na floresta.",
          tipo: "Fantasia",
        };
      case "aventura":
        return {
          titulo: "Operação Big Hero",
          descricao:
            "Aventura tecnológica com um robô inflável e um jovem inventor.",
          tipo: "Aventura",
        };
      default:
        return {
          titulo: "Divertidamente",
          descricao: "Animação sobre as emoções dentro da mente de uma garota.",
          tipo: "Geral",
        };
    }
  }
  // Adolescentes (13-17 anos)
  else if (idade < 18) {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "Harry Potter e o Prisioneiro de Azkaban",
          descricao:
            "Aventura mágica com Harry Potter e seus amigos em Hogwarts.",
          tipo: "Fantasia-Aventura",
        };
      case "fantasia":
        return {
          titulo: "O Labirinto do Fauno",
          descricao: "Conto de fadas sombrio ambientado na Espanha pós-guerra.",
          tipo: "Fantasia",
        };
      case "aventura":
        return {
          titulo: "Perdido em Marte",
          descricao: "Aventura científica sobre um astronauta preso em Marte.",
          tipo: "Aventura",
        };
      default:
        return {
          titulo: "O Pequeno Príncipe",
          descricao:
            "Adaptação da clássica história sobre amizade e descobertas.",
          tipo: "Geral",
        };
    }
  }
  // Adultos (18+)
  else {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "O Senhor dos Anéis: A Sociedade do Anel",
          descricao:
            "Epopeia fantástica sobre a jornada para destruir um anel maligno.",
          tipo: "Fantasia-Aventura",
        };
      case "fantasia":
        return {
          titulo: "A Forma da Água",
          descricao:
            "Conto de fadas para adultos sobre amor e criaturas mágicas.",
          tipo: "Fantasia",
        };
      case "aventura":
        return {
          titulo: "Indiana Jones e Os Caçadores da Arca Perdida",
          descricao: "Aventura clássica com arqueologia e ação.",
          tipo: "Aventura",
        };
      default:
        return {
          titulo: "O Discurso do Rei",
          descricao: "Drama histórico sobre superação pessoal.",
          tipo: "Geral",
        };
    }
  }
}
