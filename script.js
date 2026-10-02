/* =========================================
   INTERACTIVE QUIZ APP
========================================= */


/* =========================================
   DATA SOAL
========================================= */

const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        category: "Web Development"
    },

    {
        question: "Bahasa pemrograman apa yang digunakan untuk membuat halaman web menjadi interaktif?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2,
        category: "Programming"
    },

    {
        question: "Method JavaScript yang digunakan untuk mengubah teks sebuah element adalah?",
        answers: [
            "textContent",
            "changeText",
            "innerTextOnly",
            "modifyText"
        ],
        correct: 0,
        category: "JavaScript"
    },

    {
        question: "Manakah yang digunakan untuk menyimpan data di browser?",
        answers: [
            "LocalStorage",
            "BrowserStorageSQL",
            "WebDatabaseOnly",
            "SessionFile"
        ],
        correct: 0,
        category: "Web Storage"
    },

    {
        question: "Apa fungsi dari CSS?",
        answers: [
            "Mengatur tampilan halaman web",
            "Menyimpan database",
            "Menjalankan server",
            "Mengirim email"
        ],
        correct: 0,
        category: "Web Development"
    }
];


/* =========================================
   STATE
========================================= */

let quizQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let correctCount = 0;

let wrongCount = 0;

let selectedAnswer = false;

let timer;

let timeLeft = 15;


/* =========================================
   DOM ELEMENTS
========================================= */

const homePage = document.getElementById("home-page");

const quizPage = document.getElementById("quiz-page");

const resultPage = document.getElementById("result-page");

const startButton = document.getElementById("start-button");

const restartButton = document.getElementById("restart-button");

const homeButton = document.getElementById("home-button");

const nextButton = document.getElementById("next-button");

const answersContainer = document.getElementById("answers");

const questionElement = document.getElementById("question");

const questionNumberElement =
    document.getElementById("question-number");

const categoryElement =
    document.getElementById("category");

const currentScoreElement =
    document.getElementById("current-score");

const progressFill =
    document.getElementById("progress-fill");

const progressText =
    document.getElementById("progress-text");

const timerElement =
    document.getElementById("timer");

const finalScoreElement =
    document.getElementById("final-score");

const correctAnswerElement =
    document.getElementById("correct-answer");

const wrongAnswerElement =
    document.getElementById("wrong-answer");

const homeHighScoreElement =
    document.getElementById("home-high-score");

const finalHighScoreElement =
    document.getElementById("final-high-score");

const resultMessageElement =
    document.getElementById("result-message");

const questionCountElement =
    document.getElementById("question-count");

const themeToggle =
    document.getElementById("theme-toggle");


/* =========================================
   INITIALIZATION
========================================= */

questionCountElement.textContent = questions.length;

updateHighScore();


/* =========================================
   NAVIGATION
========================================= */

function showPage(page) {

    homePage.classList.remove("active");

    quizPage.classList.remove("active");

    resultPage.classList.remove("active");

    page.classList.add("active");
}


/* =========================================
   SHUFFLE ARRAY
========================================= */

function shuffleArray(array) {

    return [...array].sort(() => Math.random() - 0.5);

}


/* =========================================
   START QUIZ
========================================= */

function startQuiz() {

    quizQuestions = shuffleArray(questions);

    currentQuestionIndex = 0;

    score = 0;

    correctCount = 0;

    wrongCount = 0;

    showPage(quizPage);

    currentScoreElement.textContent = score;

    loadQuestion();
}


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    clearInterval(timer);

    selectedAnswer = false;

    nextButton.disabled = true;

    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    /* Question */

    questionElement.textContent =
        currentQuestion.question;


    /* Category */

    categoryElement.textContent =
        currentQuestion.category;


    /* Number */

    questionNumberElement.textContent =
        `Pertanyaan ${currentQuestionIndex + 1} dari ${quizQuestions.length}`;


    /* Progress */

    const progress =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    progressFill.style.width =
        `${progress}%`;

    progressText.textContent =
        `${currentQuestionIndex + 1} / ${quizQuestions.length}`;


    /* Clear answers */

    answersContainer.replaceChildren();


    /* Create answer buttons */

    currentQuestion.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "answer-button";

        button.dataset.index = index;

        button.textContent = answer;

        answersContainer.appendChild(button);

    });


    startTimer();

}


/* =========================================
   EVENT DELEGATION
========================================= */

answersContainer.addEventListener("click", (event) => {

    const button =
        event.target.closest(".answer-button");


    if (!button) {
        return;
    }


    if (selectedAnswer) {
        return;
    }


    selectedAnswer = true;

    clearInterval(timer);


    const selectedIndex =
        Number(button.dataset.index);


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    const allButtons =
        answersContainer.querySelectorAll(".answer-button");


    /* Correct */

    if (selectedIndex === currentQuestion.correct) {

        button.classList.add("correct");

        score += 20;

        correctCount++;

        currentScoreElement.textContent = score;

    }

    /* Wrong */

    else {

        button.classList.add("wrong");

        wrongCount++;


        allButtons.forEach((answerButton) => {

            const index =
                Number(answerButton.dataset.index);


            if (index === currentQuestion.correct) {

                answerButton.classList.add("correct");

            }

        });

    }


    nextButton.disabled = false;

});


/* =========================================
   NEXT QUESTION
========================================= */

nextButton.addEventListener("click", () => {

    currentQuestionIndex++;


    if (currentQuestionIndex < quizQuestions.length) {

        loadQuestion();

    }

    else {

        finishQuiz();

    }

});


/* =========================================
   TIMER
========================================= */

function startTimer() {

    timeLeft = 15;

    timerElement.textContent = timeLeft;


    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            handleTimeOut();

        }

    }, 1000);

}


/* =========================================
   TIME OUT
========================================= */

function handleTimeOut() {

    if (selectedAnswer) {
        return;
    }


    selectedAnswer = true;

    wrongCount++;


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    const allButtons =
        answersContainer.querySelectorAll(".answer-button");


    allButtons.forEach((button) => {

        const index =
            Number(button.dataset.index);


        if (index === currentQuestion.correct) {

            button.classList.add("correct");

        }

    });


    nextButton.disabled = false;

}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    clearInterval(timer);

    saveHighScore();

    finalScoreElement.textContent = score;

    correctAnswerElement.textContent =
        correctCount;

    wrongAnswerElement.textContent =
        wrongCount;

    updateHighScore();


    if (score === 100) {

        resultMessageElement.textContent =
            "Perfect! Semua jawaban kamu benar! 🎉";

    }

    else if (score >= 60) {

        resultMessageElement.textContent =
            "Good job! Hasil kamu cukup bagus! 👏";

    }

    else {

        resultMessageElement.textContent =
            "Tetap semangat! Coba lagi untuk mendapatkan skor lebih tinggi! 💪";

    }


    showPage(resultPage);

}


/* =========================================
   LOCAL STORAGE
========================================= */

function saveHighScore() {

    const oldHighScore =
        Number(localStorage.getItem("quizHighScore")) || 0;


    if (score > oldHighScore) {

        localStorage.setItem(
            "quizHighScore",
            score
        );

    }

}


function getHighScore() {

    return Number(
        localStorage.getItem("quizHighScore")
    ) || 0;

}


function updateHighScore() {

    const highScore =
        getHighScore();

    homeHighScoreElement.textContent =
        highScore;

    finalHighScoreElement.textContent =
        highScore;

}


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener("click", () => {

    startQuiz();

});


/* =========================================
   HOME
========================================= */

homeButton.addEventListener("click", () => {

    clearInterval(timer);

    updateHighScore();

    showPage(homePage);

});


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener("click", () => {

    startQuiz();

});


/* =========================================
   DARK / LIGHT MODE
========================================= */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");


    const isLightMode =
        document.body.classList.contains("light-mode");


    themeToggle.textContent =
        isLightMode ? "☀️" : "🌙";

});
