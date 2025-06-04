const questions = [
  {
    question: 'How often should sexually active individuals consider STD testing?',
    answers: [
      { text: 'Only when symptoms appear', correct: false },
      { text: 'At least once a year', correct: true },
      { text: 'Every five years', correct: false },
    ],
  },
  {
    question: 'Can you do an HIV self-test at home?',
    answers: [
      { text: 'Yes, there are approved home testing kits', correct: true },
      { text: 'No, testing is only available at clinics', correct: false },
      { text: 'Only with a prescription', correct: false },
    ],
  },
  {
    question: 'Why is regular STD testing important?',
    answers: [
      { text: 'To track overall health and get treatment early', correct: true },
      { text: 'It isn\'t necessary if you feel healthy', correct: false },
      { text: 'It\'s only needed when starting a new relationship', correct: false },
    ],
  },
  {
    question: 'What should you do after a positive self-test result?',
    answers: [
      { text: 'Seek confirmatory testing from a healthcare professional', correct: true },
      { text: 'Ignore it if you have no symptoms', correct: false },
      { text: 'Share the kit with a friend', correct: false },
    ],
  },
  {
    question: 'Do condoms reduce the risk of many STDs, including HIV?',
    answers: [
      { text: 'Yes, they are effective when used correctly', correct: true },
      { text: 'No, they don\'t help prevent STDs', correct: false },
      { text: 'Only if they are flavored', correct: false },
    ],
  },
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answerList = document.getElementById('answer-list');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

document.getElementById('start-btn').addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  showStart();
});

function showStart() {
  resultScreen.classList.add('hidden');
  questionScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

function startGame() {
  startScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  clearAnswers();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  q.answers.forEach((answer) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener('click', () => selectAnswer(button));
    li.appendChild(button);
    answerList.appendChild(li);
  });
  nextBtn.classList.add('hidden');
}

function clearAnswers() {
  while (answerList.firstChild) {
    answerList.removeChild(answerList.firstChild);
  }
}

function selectAnswer(selectedBtn) {
  if (selectedBtn.dataset.correct === 'true') {
    score++;
  }
  Array.from(answerList.children).forEach((li) => {
    const btn = li.firstChild;
    btn.disabled = true;
    if (btn === selectedBtn) {
      btn.classList.add(btn.dataset.correct === 'true' ? 'correct' : 'wrong');
    } else if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    }
  });
  nextBtn.classList.remove('hidden');
}

function showResults() {
  questionScreen.classList.add('hidden');
  scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
  resultScreen.classList.remove('hidden');
}

showStart();
