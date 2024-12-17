const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        options: ["Paris", "Lyon", "Marseille", "Nice"],
        answer: "Paris"
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        options: ["Victor Hugo", "Émile Zola", "Molière", "Jean-Paul Sartre"],
        answer: "Victor Hugo"
    },
    {
        question: "Combien de continents y a-t-il ?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Quelle est la plus grande planète du système solaire ?",
        options: ["Jupiter", "Mars", "Saturne", "Terre"],
        answer: "Jupiter"
    },
    {
        question: "Quel est l'élément chimique avec le symbole H ?",
        options: ["Hydrogène", "Hélium", "Oxygène", "Carbone"],
        answer: "Hydrogène"
    },
    {
        question: "Qui a peint la Joconde ?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
        answer: "Pacifique"
    },
    {
        question: "Dans quelle ville se trouve la Statue de la Liberté ?",
        options: ["New York", "Los Angeles", "Chicago", "San Francisco"],
        answer: "New York"
    },
    {
        question: "Qui a inventé l'ampoule électrique ?",
        options: ["Thomas Edison", "Nikola Tesla", "Marie Curie", "Albert Einstein"],
        answer: "Thomas Edison"
    },
    {
        question: "Quelle est la langue officielle du Brésil ?",
        options: ["Espagnol", "Portugais", "Français", "Anglais"],
        answer: "Portugais"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Démarrer le quiz
document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = questionData.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Réinitialiser les options

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
        } else {
            clearInterval(timer);
            checkAnswer(null); // Si le temps est écoulé, on considère que la réponse est incorrecte
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    // Désactiver les options
    const options = document.querySelectorAll("#options-container button");
    options.forEach(option => option.disabled = true);

    // Afficher la réponse correcte si le temps est écoulé
    if (!selectedOption) {
        alert(`Temps écoulé ! La réponse correcte était : ${correctAnswer}`);
    }

    // Passer à la question suivante ou afficher les résultats
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 15;
        setTimeout(() => {
            loadQuestion();
            startTimer();
        }, 2000);
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
    document.getElementById("final-score").textContent = `Votre score: ${score}/10`;
}

document.getElementById("retry-btn").addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 15;
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
});