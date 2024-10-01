const questionElement = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizContainer = document.querySelector('#quizz-container');
const scoreBoard = document.querySelector('#score-container');
const answerLetters = ['a', 'b', 'c', 'd', 'e'];
let score = 0;
let currentQuestion = 0;
let readingEnabled = false;

const questionsList = [
  {
    question: 'O que significa o conceito de "Clean Code"?',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Código que é executado rapidamente.',
        correct: false,
      },
      {
        answer: 'Código que é fácil de ler, entender e manter.',
        correct: true,
      },
      {
        answer: 'Código que usa muitas abreviações e atalhos.',
        correct: false,
      },
      {
        answer: 'Código escrito por uma grande equipe de desenvolvedores.',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual das opções abaixo é uma prática recomendada no Clean Code?',
    image: 'https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Utilizar variáveis com nomes genéricos como x ou data.',
        correct: false,
      },
      {
        answer: 'Escrever funções longas e complexas para resolver vários problemas.',
        correct: false,
      },
      {
        answer: 'Escrever comentários detalhados explicando todo o código.',
        correct: false,
      },
      {
        answer: 'Usar nomes significativos para variáveis, funções e classes.',
        correct: true,
      },
    ],
  },
  {
    question: 'Segundo o Clean Code, qual é o tamanho ideal de uma função?',
    image: 'https://images.unsplash.com/photo-1524666643752-b381eb00effb?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Não mais que 200 linhas.',
        correct: false,
      },
      {
        answer: 'O menor possível, idealmente fazendo apenas uma coisa.',
        correct: true,
      },
      {
        answer: 'Grande o suficiente para abranger várias funcionalidades.',
        correct: false,
      },
      {
        answer: 'Não há restrições de tamanho para funções.',
        correct: false,
      },
    ],
  },
  {
    question: 'O que significa o princípio "DRY" (Don’t Repeat Yourself) no Clean Code?',
    image: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Evitar usar bibliotecas de terceiros no código.',
        correct: false,
      },
      {
        answer: 'Evitar duplicar código e lógica, centralizando funcionalidades repetidas.',
        correct: true,
      },
      {
        answer: 'Escrever código que não precisa de documentação.',
        correct: false,
      },
      {
        answer: 'Escrever comentários detalhados em todas as linhas de código.',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a melhor prática para lidar com exceções no Clean Code?',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Ignorar exceções para evitar que o programa trave.',
        correct: false,
      },
      {
        answer: 'Colocar todo o código dentro de blocos try/catch.',
        correct: false,
      },
      {
        answer: 'Tratar exceções de forma clara e específica, sem usar exceções genéricas.',
        correct: true,
      },
      {
        answer: 'Lançar exceções o tempo todo para capturar todos os erros.',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o principal objetivo do Clean Code?',
    image: 'https://images.unsplash.com/photo-1648393847044-0f31992a9ea2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Garantir que o código funcione sem erros.',
        correct: false,
      },
      {
        answer: 'Facilitar a leitura e manutenção do código ao longo do tempo.',
        correct: true,
      },
      {
        answer: 'Aumentar a velocidade de execução do programa.',
        correct: false,
      },
      {
        answer: 'Utilizar as últimas tecnologias disponíveis.',
        correct: false,
      },
    ],
  },
  {
    question: 'O que significa o princípio "KISS" (Keep It Simple, Stupid) no Clean Code?',
    image: 'https://images.unsplash.com/photo-1623520527569-fee1da87f598?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Evitar a complexidade e manter soluções simples.',
        correct: true,
      },
      {
        answer: 'Focar em criar código muito complexo para resolver problemas.',
        correct: false,
      },
      {
        answer: 'Escrever o maior número possível de linhas de código.',
        correct: false,
      },
      {
        answer: 'Priorizar a velocidade de execução em relação à legibilidade.',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a importância de escrever testes para o Clean Code?',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Testes não são necessários, o código deve ser autoexplicativo.',
        correct: false,
      },
      {
        answer: 'Testes ajudam a garantir que o código funciona como esperado e facilita a manutenção.',
        correct: true,
      },
      {
        answer: 'Escrever testes é uma perda de tempo.',
        correct: false,
      },
      {
        answer: 'Apenas o código final precisa ser testado, não o código em desenvolvimento.',
        correct: false,
      },
    ],
  },
  {
    question: 'O que significa o princípio "YAGNI" (You Aren\'t Gonna Need It) no Clean Code?',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Escrever código apenas para as funcionalidades que realmente são necessárias.',
        correct: true,
      },
      {
        answer: 'Sempre antecipar todas as necessidades futuras do código.',
        correct: false,
      },
      {
        answer: 'Adicionar funcionalidades extras ao código desde o início.',
        correct: false,
      },
      {
        answer: 'O código deve ser flexível o suficiente para todas as situações futuras.',
        correct: false,
      },
    ],
  },
  {
    question: 'Como o Clean Code aborda a nomenclatura de variáveis e funções?',
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    answers: [
      {
        answer: 'Nomes curtos e não descritivos são suficientes.',
        correct: false,
      },
      {
        answer: 'Usar nomes significativos e descritivos que reflitam o propósito da variável ou função.',
        correct: true,
      },
      {
        answer: 'Nomes em abreviações são preferíveis para reduzir a quantidade de texto.',
        correct: false,
      },
      {
        answer: 'A nomenclatura não é importante desde que o código funcione.',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual das seguintes práticas NÃO está associada a Clean Code?',
    answers: [
      {
        answer: 'Usar nomes de variáveis claros e descritivos.',
        correct: false,
      },
      {
        answer: 'Reduzir duplicação de código.',
        correct: false,
      },
      {
        answer: 'Deixar comentários excessivos para explicar cada linha do código.',
        correct: true,
      },
      {
        answer: 'Dividir funções complexas em funções menores e simples.',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é considerado um "código ruim" no contexto de Clean Code?',
    answers: [
      {
        answer: 'Código que é difícil de testar e refatorar.',
        correct: true,
      },
      {
        answer: 'Código que usa indentação correta.',
        correct: false,
      },
      {
        answer: 'Código escrito em múltiplas linguagens de programação.',
        correct: false,
      },
      {
        answer: 'Código que segue convenções de nomenclatura padrão.',
        correct: false,
      },
    ],
  },
  {
    question: 'Por que é importante evitar funções longas ao escrever Clean Code?',
    answers: [
      {
        answer: 'Porque funções longas consomem mais memória.',
        correct: false,
      },
      {
        answer: 'Porque funções longas são mais difíceis de entender e testar.',
        correct: true,
      },
      {
        answer: 'Porque funções longas são mais rápidas de escrever.',
        correct: false,
      },
      {
        answer: 'Porque funções longas ocupam mais espaço no disco.',
        correct: false,
      },
    ],
  },
  {
    question: 'Como o conceito de Clean Code impacta o trabalho em equipe?',
    answers: [
      {
        answer: 'Clean Code facilita a colaboração, pois todos podem entender o código facilmente.',
        correct: true,
      },
      {
        answer: 'Clean Code torna o código mais seguro, evitando vazamentos de dados.',
        correct: false,
      },
      {
        answer: 'Clean Code diminui a necessidade de testes automáticos.',
        correct: false,
      },
      {
        answer: 'Clean Code permite que apenas os desenvolvedores sêniores entendam o projeto.',
        correct: false,
      },
    ],
  },
];

function getRandomQuestions(num) {
  const shuffledQuestions = questionsList.sort(() => 0.5 - Math.random());
  return shuffledQuestions.slice(0, num);
}

const selectedQuestions = getRandomQuestions(5);

const readButton = document.createElement('button');
readButton.textContent = 'Ativar Leitura por Voz';
readButton.id = 'read-aloud';
document.body.appendChild(readButton);

readButton.addEventListener('click', function () {
  readingEnabled = !readingEnabled;
  readButton.textContent = readingEnabled ? 'Desativar Leitura por Voz' : 'Ativar Leitura por Voz';
  if (!readingEnabled) window.speechSynthesis.cancel();
});

function readText(text) {
  if (readingEnabled) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  }
}

function startQuiz() {
  displayQuestion(0);
}

function displayQuestion(i) {
  const oldButtons = answersBox.querySelectorAll('button');
  oldButtons.forEach((btn) => btn.remove());

  const questionText = questionElement.querySelector('#question-text');
  const questionNumber = questionElement.querySelector('#question-number');
  const questionImage = document.querySelector('#question-image');

  questionText.textContent = selectedQuestions[i].question;
  questionNumber.textContent = i + 1;

  if (selectedQuestions[i].image) {
    questionImage.src = selectedQuestions[i].image;
    questionImage.classList.remove('hide');
  } else {
    questionImage.classList.add('hide');
  }

  readText(selectedQuestions[i].question);

  selectedQuestions[i].answers.forEach((answer, i) => {
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = answerLetters[i];
    answerText.textContent = answer.answer;

    answerTemplate.setAttribute('correct-answer', answer.correct);

    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    answersBox.appendChild(answerTemplate);

    answerTemplate.addEventListener('click', function () {
      verifyAnswer(this);
    });

    readText(`${answerLetters[i].toUpperCase()}: ${answer.answer}`);
  });

  currentQuestion++;
}

function verifyAnswer(btn) {
  const buttons = answersBox.querySelectorAll('button');

  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');
      if (btn === button) score++;
    } else {
      button.classList.add('wrong-answer');
    }
  });

  showNextQuestion();
}

function showNextQuestion() {
  setTimeout(function () {
    if (currentQuestion >= selectedQuestions.length) {
      displayScore();
      return;
    }

    displayQuestion(currentQuestion);
  }, 1200);
}

function displayScore() {
  toggleVisibility();
  const scoreDisplay = ((score / selectedQuestions.length) * 100).toFixed(2);
  document.querySelector('#display-score span').textContent = scoreDisplay;
  document.querySelector('#correct-answers').textContent = score;
  document.querySelector('#questions-qty').textContent = selectedQuestions.length;
}

function toggleVisibility() {
  quizContainer.classList.toggle('hide');
  scoreBoard.classList.toggle('hide');
}

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', function () {
  currentQuestion = 0;
  score = 0;
  toggleVisibility();
  startQuiz();
});

startQuiz();