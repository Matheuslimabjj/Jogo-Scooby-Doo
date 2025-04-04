const botao = document.getElementById("iniciarJogo");
const botaoMusica = document.getElementById("toggleMusic");
const musica = document.getElementById("backgroundMusic");
const jogoDiv = document.getElementById("jogo");
const rodadaSpan = document.getElementById("rodadaAtual");
const suspeitosBtns = document.getElementById("suspeitosBtns");
const logPistas = document.getElementById("logPistas");
const acusarBtn = document.getElementById("acusarBtn");

let rodada = 1;
let suspeitos = ["Dr. Romero", "Sra Morgana", "Zé da Peixaria", "Sr Alberto", "Srta. Clarisse"];
let pistas = [];
let culpado = "";
let jogoAtivo = false;

// Música
if (musica) {
  window.addEventListener("DOMContentLoaded", () => {
    musica.play().catch(() => {
      console.log("Autoplay bloqueado");
    });
  });

  botaoMusica.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      botaoMusica.textContent = "🔊 Música: ON";
    } else {
      musica.pause();
      botaoMusica.textContent = "🔇 Música: OFF";
    }
  });
}

// Iniciar jogo
botao.addEventListener("click", () => {
  iniciarJogo();
});

function iniciarJogo() {
  rodada = 1;
  pistas = [];
  culpado = suspeitos[Math.floor(Math.random() * suspeitos.length)];
  jogoAtivo = true;

  botao.style.display = "none";
  jogoDiv.style.display = "block";
  rodadaSpan.textContent = rodada;
  logPistas.innerHTML = "";
  gerarBotoesSuspeitos();

  alert("Você tem 10 rodadas para descobrir o culpado. Boa sorte!");
}

function gerarBotoesSuspeitos() {
  suspeitosBtns.innerHTML = "";
  suspeitos.forEach((nome, index) => {
    const btn = document.createElement("button");
    btn.textContent = nome;
    btn.onclick = () => interrogar(nome);
    suspeitosBtns.appendChild(btn);
  });
}

function interrogar(nome) {
  if (!jogoAtivo) return;

  let pista;
  if (nome === culpado) {
    let pistasCulpado = [
      "Foi visto na cena do crime.",
      "Tinha um motivo claro.",
      "Estava agindo de forma estranha.",
      "Falou do monstro antes do ataque.",
      "Tinha acesso ao traje do monstro."
    ];
    pista = pistasCulpado[Math.floor(Math.random() * pistasCulpado.length)];
  } else {
    let pistasPossiveis = [
      "Álibi não confirmado.",
      "Estava perto da festa.",
      "Já teve desavenças.",
      "Saiu da festa rapidamente.",
      "Comportamento suspeito."
    ];
    pista = pistasPossiveis[Math.floor(Math.random() * pistasPossiveis.length)];
  }

  pistas.push(`🕵️‍♂️ Rodada ${rodada}: Interrogou ${nome} — ${pista}`);
  atualizarLog();

  if (rodada >= 10) {
    acusarAgora();
  } else {
    rodada++;
    rodadaSpan.textContent = rodada;
  }
}

function atualizarLog() {
  logPistas.innerHTML = "";
  pistas.forEach(p => {
    const item = document.createElement("p");
    item.textContent = p;
    logPistas.appendChild(item);
  });
}

acusarBtn.addEventListener("click", acusarAgora);

function acusarAgora() {
  if (!jogoAtivo) return;

  const escolha = prompt("Quem você acha que é o culpado?\n" + 
    suspeitos.map((s, i) => `${i + 1}) ${s}`).join("\n"));

  if (escolha === null) return;

  const index = Number(escolha) - 1;
  if (suspeitos[index]) {
    const acusado = suspeitos[index];
    if (acusado === culpado) {
      alert(`🎉 Você acertou! O culpado era mesmo ${culpado}!`);
    } else {
      alert(`😵 Ops! Era ${culpado}...`);
    }
  } else {
    alert("Escolha inválida.");
    return;
  }

  jogoAtivo = false;
  botao.style.display = "inline-block";
  jogoDiv.style.display = "none";
}
