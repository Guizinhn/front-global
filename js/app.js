const title = document.querySelector(".fade-title");

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      title.classList.add("visible");
    } else {
      title.classList.remove("visible");
    }
  },
  { threshold: 0.9 }
);

observer.observe(title);

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Botões do slideshow
document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);

showSlide(currentSlide);

// Menu hamburguer toggle
const toggleButton = document.getElementById("menuToggle");
const menuLinks = document.querySelector(".menu-links");

toggleButton.addEventListener("click", () => {
  menuLinks.classList.toggle("show");
});

// Troca de cor de fundo (caso tenha esses botões no HTML)
const colorRed = document.querySelector('.color-red');
const colorBlue = document.querySelector('.color-blue');
const colorGreen = document.querySelector('.color-green');

if(colorRed) colorRed.addEventListener('click', () => { document.body.style.backgroundColor = '#e74c3c'; });
if(colorBlue) colorBlue.addEventListener('click', () => { document.body.style.backgroundColor = '#3498db'; });
if(colorGreen) colorGreen.addEventListener('click', () => { document.body.style.backgroundColor = '#2ecc71'; });

// Validação do formulário
const form = document.getElementById('meuForm');
if(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (form.checkValidity()) {
      alert('Formulário enviado com sucesso!');
      form.reset();
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  });
}

// Quiz
const quizData = [
  { question: "Qual a capital do Brasil?", options: ["Rio", "Brasília", "SP", "Salvador"], answer: "Brasília" },
  { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Qual cor tem o céu?", options: ["Verde", "Azul", "Amarelo", "Vermelho"], answer: "Azul" },
  { question: "Quem descobriu o Brasil?", options: ["Pedro", "Cabral", "Neymar", "Silva"], answer: "Cabral" },
  { question: "Qual o maior planeta?", options: ["Terra", "Marte", "Júpiter", "Saturno"], answer: "Júpiter" },
  { question: "Qual a moeda do Brasil?", options: ["Dólar", "Euro", "Real", "Peso"], answer: "Real" },
  { question: "Qual é o idioma oficial do Brasil?", options: ["Espanhol", "Inglês", "Português", "Francês"], answer: "Português" },
  { question: "O que a água forma ao congelar?", options: ["Fumaça", "Gelo", "Areia", "Vapor"], answer: "Gelo" },
  { question: "Qual é a cor do sangue?", options: ["Azul", "Vermelho", "Verde", "Amarelo"], answer: "Vermelho" },
  { question: "Qual animal late?", options: ["Gato", "Cachorro", "Pássaro", "Peixe"], answer: "Cachorro" }
];

const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-quiz');
const resultDiv = document.getElementById('quiz-result');

function buildQuiz() {
  if (!quizContainer) return;
  const output = [];

  quizData.forEach((q, i) => {
    const optionsHTML = q.options.map(opt =>
      `<label>
        <input type="radio" name="question${i}" value="${opt}"> ${opt}
      </label>`
    ).join('');

    output.push(`
      <div class="question"><strong>${i + 1}. ${q.question}</strong></div>
      <div class="options">${optionsHTML}</div>
    `);
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  if (!quizContainer) return;
  let score = 0;

  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="question${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  if (resultDiv) {
    resultDiv.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;
  }
}

// Ajuste: construir quiz ao carregar a página e ligar botão enviar
document.addEventListener('DOMContentLoaded', () => {
  buildQuiz();
});

if (submitBtn) {
  submitBtn.addEventListener('click', showResults);
}
