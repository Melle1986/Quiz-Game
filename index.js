const questions = [
    {
        question: "Was ist die Hauptstadt von Frankreich?",
        options: ["Berlin", "Madrid", "Paris"],
        correctIndex: 2
    },
    {
        question: "Welches Element hat das chemische Symbol 'H'?",
        options: ["Helium", "Wasserstoff", "Stickstoff"],
        correctIndex: 1
    },
    {
        question: "Wie viele Planeten gibt es in unserem Sonnensystem?",
        options: ["6", "8", "9"],
        correctIndex: 1
    },

    {   
        question: "Wie viele Bundesländer hat Deutschland?",
        options: ["14", "16", "18"],
        correctIndex: 1
    },

    {
        question: "Wie viele Bundesländer hat Österreich?",
        options: ["6", "8", "9"],
        correctIndex: 1
    },

];

const timerElement = document.getElementById("timer");
const audioElement = document.getElementById("audio"); // Das Audio-Element

function startTimer(seconds) {
    let timeLeft = seconds;
    let timer;

    function updateTimer() {
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(-1);
            playSound(); // die function für den sound wird aufgerufen
        } else {
            timeLeft--;
            timerElement.textContent = timeLeft;
        }
    }

    updateTimer();
    timer = setInterval(updateTimer, 1000);

}

function playSound() {
    audioElement.play("audio");   //hier wird das audio element mit abgespielt 
}


startTimer(30);

    const questionElement = document.getElementById("question");
    const optionElements = document.querySelectorAll(".option");
    const resultElement = document.getElementById("result");
    const resultContainer = document.querySelector(".result-container");

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;

        question.options.forEach((option, index) => {
            optionElements[index].textContent = option;
        });
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        if (selectedIndex === question.correctIndex) {
            score++;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        questionElement.textContent = "Quiz beendet!";
        resultElement.textContent = `Ergebnis: ${score} von ${questions.length} Fragen richtig beantwortet.`;
        resultContainer.style.display = "block";
        optionElements.forEach((option) => {
            option.style.display = "none";
        });
    }

    optionElements.forEach((option, index) => {
        option.addEventListener("click", () => {
            checkAnswer(index);
        });
    });

    showQuestion();

