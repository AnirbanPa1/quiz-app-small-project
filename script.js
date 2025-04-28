const questions = [
    {
      question: "What does HTTP stand for?",
      answers: [
        { text: "HyperText Transfer Protocol", correct: true },
        { text: "Hyperlink Transfer Protocol", correct: false },
        { text: "HighText Transfer Protocol", correct: false },
        { text: "Hyper Transfer Text Process", correct: false }
      ]
    },
    {
      question: "Which data structure uses FIFO (First In, First Out)?",
      answers: [
        { text: "Stack", correct: false },
        { text: "Queue", correct: true },
        { text: "Tree", correct: false },
        { text: "Graph", correct: false }
      ]
    },
    {
      question: "What is the time complexity of binary search?",
      answers: [
        { text: "O(n)", correct: false },
        { text: "O(log n)", correct: true },
        { text: "O(n log n)", correct: false },
        { text: "O(1)", correct: false }
      ]
    },
    {
      question: "Which language is primarily used for Android app development?",
      answers: [
        { text: "Java", correct: true },
        { text: "Python", correct: false },
        { text: "Swift", correct: false },
        { text: "C#", correct: false }
      ]
    },
    {
      question: "Which SQL command is used to remove all records from a table?",
      answers: [
        { text: "DELETE", correct: false },
        { text: "TRUNCATE", correct: true },
        { text: "DROP", correct: false },
        { text: "REMOVE", correct: false }
      ]
    },
    {
      question: "Which sorting algorithm is considered the fastest on average for large datasets?",
      answers: [
        { text: "Bubble Sort", correct: false },
        { text: "Selection Sort", correct: false },
        { text: "Quick Sort", correct: true },
        { text: "Insertion Sort", correct: false }
      ]
    },
    {
      question: "Which of the following is a NoSQL database?",
      answers: [
        { text: "MySQL", correct: false },
        { text: "MongoDB", correct: true },
        { text: "PostgreSQL", correct: false },
        { text: "Oracle", correct: false }
      ]
    },
    {
      question: "What is the default port number for HTTPS?",
      answers: [
        { text: "80", correct: false },
        { text: "22", correct: false },
        { text: "443", correct: true },
        { text: "21", correct: false }
      ]
    },
    {
      question: "In OOP, what does 'Encapsulation' mean?",
      answers: [
        { text: "Wrapping data and methods together", correct: true },
        { text: "Hiding errors from users", correct: false },
        { text: "Inheritance from base classes", correct: false },
        { text: "Polymorphic behavior", correct: false }
      ]
    },
    {
      question: "Which of the following is a programming paradigm focused on functions and immutability?",
      answers: [
        { text: "Procedural Programming", correct: false },
        { text: "Object-Oriented Programming", correct: false },
        { text: "Functional Programming", correct: true },
        { text: "Event-Driven Programming", correct: false }
      ]
    }
  ];
  
  
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const typewriter = document.getElementById('typewriter');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  if (nextButton.innerText === "Restart") {
    startQuiz();
  } else {
    handleNextButton();
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function resetTypewriterAnimation() {
  typewriter.classList.remove('typewriter-animation');
  void typewriter.offsetWidth;
  typewriter.classList.add('typewriter-animation');
}

function startQuiz() {
  startButton.style.display = "none";
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  nextButton.innerText = 'Next';
  nextButton.style.display = 'none';

  resetTypewriterAnimation();
  typewriter.innerText = "Here are your Questions";
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerElement.innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  const shuffledAnswers = [...currentQuestion.answers];
  shuffleArray(shuffledAnswers);

  const correctAnswer = shuffledAnswers.find(answer => answer.correct);

  currentQuestion.shuffledAnswers = shuffledAnswers;

  shuffledAnswers.forEach(answer => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.className = 'btn';
    button.addEventListener('click', () => selectAnswer(answer, correctAnswer));
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  answerButtons.innerHTML = '';
}

function selectAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  const currentAnswers = shuffledQuestions[currentQuestionIndex].shuffledAnswers;

  Array.from(answerButtons.children).forEach((li, index) => {
    const btn = li.firstChild;
    btn.disabled = true;
    if (currentAnswers[index].correct) {
      btn.style.backgroundColor = '#90ee90';
    } else if (btn.innerText === selectedAnswer.text) {
      btn.style.backgroundColor = '#f08080';
    }
  });

  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timerInterval);
  resetState();
  resetTypewriterAnimation();
  typewriter.innerText = "Thanks for Playing"
  questionElement.innerText = `Your Score: ${score} / ${shuffledQuestions.length}`;
  nextButton.innerText = 'Restart';
  nextButton.style.display = 'block';
}
