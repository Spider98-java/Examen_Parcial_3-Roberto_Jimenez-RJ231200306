// Lógica del juego del ahorcado
const words = [
  "JAVASCRIPT",
  "HTML",
  "CSS",
  "PYTHON",
  "DATABASE",
  "PROGRAMMING",
  "ALGORITHM",
  "VARIABLE",
];
let selectedWord = "";
let guessedWord = [];
let attempts = 6;
let guessedLetters = [];

function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(selectedWord.length).fill("_");
  attempts = 6;
  guessedLetters = [];
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
  document.getElementById(
    "attemptsLeft"
  ).textContent = `Intentos restantes: ${attempts}`;
  document.getElementById("letterInput").value = "";
}

function guessLetter() {
  const input = document.getElementById("letterInput").value.toUpperCase();
  const messageDiv = document.getElementById("message");

  if (!input || input.length !== 1) {
    messageDiv.textContent = "❌ Por favor ingresa una letra";
    messageDiv.style.color = "#e74c3c";
    return;
  }

  if (guessedLetters.includes(input)) {
    messageDiv.textContent = "⚠️ Ya usaste esa letra";
    messageDiv.style.color = "#f39c12";
    return;
  }

  guessedLetters.push(input);

  if (selectedWord.includes(input)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === input) {
        guessedWord[i] = input;
      }
    }
    messageDiv.textContent = "✅ ¡Correcto!";
    messageDiv.style.color = "#27ae60";
  } else {
    attempts--;
    messageDiv.textContent = "❌ Letra incorrecta";
    messageDiv.style.color = "#e74c3c";
  }

  updateDisplay();

  if (!guessedWord.includes("_")) {
    messageDiv.textContent = "🎉 ¡Ganaste! La palabra era: " + selectedWord;
    messageDiv.style.color = "#27ae60";
    document.getElementById("letterInput").disabled = true;
  } else if (attempts === 0) {
    messageDiv.textContent = "💀 Perdiste. La palabra era: " + selectedWord;
    messageDiv.style.color = "#e74c3c";
    document.getElementById("letterInput").disabled = true;
  }
}

function resetGame() {
  document.getElementById("letterInput").disabled = false;
  document.getElementById("message").textContent = "";
  initGame();
}

// Inicializar juego al cargar
initGame();

// Permitir tecla Enter para adivinar
document
  .getElementById("letterInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      guessLetter();
    }
  });

// Navegación suave entre secciones
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Funciones del formulario de contacto
function enviarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value;
  const formMessage = document.getElementById("formMessage");

  // Validar campos
  if (!nombre || !email || !asunto || !mensaje) {
    formMessage.textContent = "❌ Por favor completa todos los campos";
    formMessage.style.background = "#ffe6e6";
    formMessage.style.color = "#e74c3c";
    formMessage.style.display = "block";
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = "❌ Por favor ingresa un email válido";
    formMessage.style.background = "#ffe6e6";
    formMessage.style.color = "#e74c3c";
    formMessage.style.display = "block";
    return;
  }

  // Simular envío exitoso
  formMessage.textContent =
    "✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.";
  formMessage.style.background = "#e6ffe6";
  formMessage.style.color = "#27ae60";
  formMessage.style.display = "block";

  // Limpiar formulario
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("asunto").value = "";
  document.getElementById("mensaje").value = "";

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}
