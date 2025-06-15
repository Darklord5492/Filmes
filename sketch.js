let campoIdade, campoFantasia, campoAventura;

function setup() {
  // Canvas com borda premium
  let canvas = createCanvas(1000, 600);
  canvas.style("border", "15px double #3498db"); // Borda dupla
  canvas.style("border-radius", "25px");
  canvas.style("box-shadow", "0 10px 35px rgba(52, 152, 219, 0.4), inset 0 0 15px rgba(52, 152, 219, 0.2)"); // Sombra externa e interna
  canvas.style("background", "linear-gradient(145deg, #f8f9fa, #e9ecef)"); // Gradiente sutil
  canvas.style("padding", "10px");
  background(240);

  // Título premium
  createElement("h1", "🎬 Recomendador de Filmes Personalizado")
    .position(width / 2 - 220, 30)
    .style("color", "#2c3e50")
    .style("font-family", "'Montserrat', sans-serif")
    .style("font-size", "32px")
    .style("font-weight", "600")
    .style("letter-spacing", "1px")
    .style("text-shadow", "2px 2px 4px rgba(0,0,0,0.1)");

  // Controles no canto inferior esquerdo
  let controlsY = height - 180;
  
  // Container para os controles (opcional - para melhor organização)
  let controlsContainer = createDiv().position(40, controlsY).style('background', 'rgba(255,255,255,0.7)')
    .style('padding', '20px').style('border-radius', '15px').style('border', '2px solid #3498db');
  
  // Age control
  createP("Sua idade:").position(50, controlsY + 20).style("font-size", "16px").style('margin-top', '0');
  campoIdade = createInput("10", "number")
    .position(125, controlsY + 15)
    .size(60)
    .attribute("min", "5")
    .attribute("max", "100")
    .style("padding", "5px");

  // Preference checkboxes
  campoFantasia = createCheckbox(" Gosta de Fantasia", false)
    .position(50, controlsY + 60)
    .changed(atualizarRecomendacao)
    .style("font-size", "16px");

  campoAventura = createCheckbox(" Gosta de Aventura", false)
    .position(50, controlsY + 100)
    .changed(atualizarRecomendacao)
    .style("font-size", "16px");

  // Combination explanation
  createP("Selecione ambas para filmes de fantasia-aventura!")
    .position(50, controlsY + 140)
    .style("color", "#7f8c8d")
    .style("font-size", "12px")
    .style('margin-top', '0');
}

function draw() {
  // Fundo com textura sutil
  background(240);
  
  // Borda interna de luxo
  noFill();
  strokeWeight(6);
  stroke(52, 152, 219, 120);
  rect(20, 20, width - 40, height - 40, 20);
  
  // Segunda borda interna decorativa
  strokeWeight(2);
  stroke(255, 255, 255, 80);
  rect(25, 25, width - 50, height - 50, 18);
  
  // Elementos decorativos premium
  noStroke();
  for (let i = 0; i < 10; i++) {
    fill(52, 152, 219, random(5, 15));
    ellipse(random(width), random(height), random(20, 80));
  }

  // Atualização da recomendação
  atualizarRecomendacao();
}

function atualizarRecomendacao() {
  let idade = parseInt(campoIdade.value()) || 10;
  let fantasia = campoFantasia.checked();
  let aventura = campoAventura.checked();

  // Determine recommendation type based on combination
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

  // Display recommendation
  fill(44, 62, 80); // Dark blue
  textSize(24);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(recomendacao.titulo, width / 2, height / 2 - 20);

  // Display description
  fill(100);
  textSize(16);
  textStyle(NORMAL);
  text(recomendacao.descricao, width / 2, height / 2 + 20, 300, 300);

  // Display recommendation type
  fill(70);
  textSize(14);
  text(`Tipo: ${recomendacao.tipo}`, width / 2, height / 2 + 100);
}

function gerarRecomendacao(idade, tipo) {
  // Movies for children (5-12 years)
  if (idade < 13) {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "A Jornada de Chihiro",
          descricao: "Animação fantástica sobre uma garota em um mundo de espíritos, cheia de aventuras mágicas.",
          tipo: "Fantasia-Aventura",
        };
      case "fantasia":
        return {
          titulo: "Meu Amigo Totoro",
          descricao: "Doce história sobre duas irmãs que descobram criaturas mágicas na floresta.",
          tipo: "Fantasia",
        };
      case "aventura":
        return {
          titulo: "Operação Big Hero",
          descricao: "Aventura tecnológica com um robô inflável e um jovem inventor.",
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
  // Teenagers (13-17 years)
  else if (idade < 18) {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "Harry Potter e o Prisioneiro de Azkaban",
          descricao: "Aventura mágica com Harry Potter e seus amigos em Hogwarts.",
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
          descricao: "Adaptação da clássica história sobre amizade e descobertas.",
          tipo: "Geral",
        };
    }
  }
  // Adults (18+)
  else {
    switch (tipo) {
      case "fantasiaAventura":
        return {
          titulo: "O Senhor dos Anéis: A Sociedade do Anel",
          descricao: "Epopeia fantástica sobre a jornada para destruir um anel maligno.",
          tipo: "Fantasia-Aventura",
        };
      case "fantasia":
        return {
          titulo: "A Forma da Água",
          descricao: "Conto de fadas para adultos sobre amor e criaturas mágicas.",
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