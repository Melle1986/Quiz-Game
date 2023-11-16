//  die Fragen und Antworten werden hier in einem Array gespeichert
const questions = [
    {
        question: "Wie heißt der Schulleiter von Hogwarts?",
        options: ["Dumbledore", "Snape", "McGonagall"],
        correctIndex: 0
    },
    {
        question: "Welches Haus gehört Harry Potter an?",
        options: ["Gryffindor", "Hufflepuff", "Ravenclaw"],
        correctIndex: 0
    },
    {
        question: "Was ist der Patronus von Harry Potter?",
        options: ["Hirsch", "Eule", "Hund"],
        correctIndex: 0
    },
    {
        question: "Wie viele Geschwister hat Ron Weasley?",
        options: ["3", "6", "5"],
        correctIndex: 1
    },
    {
        question: "Was ist der Name von Harrys Eule?",
        options: ["Hedwig", "Errol", "Crookshanks"],
        correctIndex: 0
    },
    {
        question: "Welcher Lehrer unterrichtet Verteidigung gegen die dunklen Künste im ersten Buch?",
        options: ["Quirrell", "Lockhart", "Snape"],
        correctIndex: 0
    },
    {
        question: "Was ist der Name des Zaubereiministeriums-Sprechenden Huts?",
        options: ["Fawkes", "Sorting Hat", "Gryffindor Hat"],
        correctIndex: 1
    },
    {
        question: "Welche Zutat fehlt Harry, um den Polyjuice-Trank zu vollenden?",
        options: ["Schlangenhaut", "Ein Haar von Millicent Bulstrode", "Ein Tropfen Einhornblut"],
        correctIndex: 1
    },
    {
        question: "Was ist der Name des geflügelten Pferdes, das Hagrid in den Verbotenen Wald bringt?",
        options: ["Buckbeak", "Thestral", "Fluffy"],
        correctIndex: 0
    },
    {
        question: "Wie viele Teile hat die Buchreihe 'Harry Potter'?",
        options: ["5", "6", "7"],
        correctIndex: 2
    },
];

const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const audioElement = document.getElementById("audio"); // Das Audio-Element


// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Mische die Reihenfolge der Fragen
shuffleArray(questions);





// timer function

function startTimer(duration) {
    let timer = duration,
    minutes,
    seconds;
    timerinterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds; //wenn die sekunden kleiner als 10 sind, dann wird eine 0 vor die zahl gesetzt
        timerElement.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }
    , 1000);
}



function playSound() {
audioElement.play("ping.mp3");   //hier wird das audio element mit abgespielt 
}
startTimer(180);

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

