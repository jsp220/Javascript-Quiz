var resetButton = document.querySelector(".reset-button");
var startButton = document.querySelector(".start-button");
var scoreListEl = document.querySelector(".score-list");
for (i=1; i<=5; i++) {
    eval("var liEl" + i + " = document.querySelector('.score-" + i + "')");
};
var timerEl = document.querySelector(".timer-count");
var questionNoEl = document.querySelector(".question-no");
var questionTextEl = document.querySelector(".question-text");
var optionsEl = document.querySelector(".options");
var option0El = document.querySelector(".option-0");
var option1El = document.querySelector(".option-1");
var option2El = document.querySelector(".option-2");
var option3El = document.querySelector(".option-3");
var rightWrongEl = document.querySelector(".right-wrong");

var highScores = [];
var isWin = false;
var timerCount;
var gameOver = true;
var index;
var questionText = ["Which Javascript method allows you to flexibly select any element in the html file by tag name, class, or ID?",
                    "Which of the following command allows you to create a variable that cannot be reassigned?", 
                    "Which kind of brackets/parentheses are used to define an object?", 
                    "Which of the following expressions will result in a random integer between 0 and the last index of the array randomArray?",
                    "Which data type consists of two possible values - 'true' and 'false'?"];
var answerOptions = ["toUppercase", "querySelector", "getElementById", "getElementsByTagName", 
                       "let", "var", "const", "variable", 
                       "{}", "[]", "()", "<>",
                       "Math.random * randomArray", "Math.floor * randomArray[i]", "Math.floor() * Math.random() * randomArray.length", "Math.floor(Math.random() * randomArray.length)",
                       "string", "boolean", "number", "balloon"];
var correctOption = [1, 2, 0, 3, 1];
var correctAnswer = "";


function getHighScore() {
    var storedHighScore = localStorage.getItem("highScores");
    
    if (storedHighScore == null) {
        highScores = [];
    } else {
        highScores = JSON.parse(storedHighScore);

        for (var i=1; i <= highScores.length; i++) {
            var liString = "liEl"+i;
            eval(liString + ".textContent = " + highScores[i-1]);
            eval(liString + ".style.display = 'list-item'");
        }
    }
}

function resetScores() {
    localStorage.setItem("highScores", "[]");
    for (var i=1; i <= highScores.length; i++) {
        var liString = "liEl"+i;
        eval(liString + ".textContent = ''");
        eval(liString + ".style.display = 'none'");
    }
}

function startQuiz() {
    gameOver = false;
    timerCount = 90;
    timerEl.textContent = timerCount;
    startButton.disabled = true;
    index = 0;
    startTimer();
    quizQuestions();
    return;
}

function startTimer() {
    var timer = setInterval(function() {
        if(gameOver) {
            clearInterval(timer);
            return;
        }

        timerCount--;

        timerEl.textContent = timerCount;

        if (timerCount >= 0) {
            if (isWin) {
                clearInterval(timer);
                winGame();
                gameOver = true;
                return;
            }
        }
        if (timerCount == 0) {
            clearInterval(timer);
            loseGame();
            gameOver = true;
            return;
        }
    }, 1000);
}

// quizQuestions goes here


resetButton.addEventListener("click", resetScores);
startButton.addEventListener("click", startQuiz);


getHighScore();

// .options display has to be changed to flex when game starts

// for testing getHighScore()
// abc = [30, 25, 20];
// localStorage.setItem("highScores", JSON.stringify(abc));

function quizQuestions() {
    questionNoEl.textContent = "Question " + eval(index+1);
    questionNoEl.style.display = "inline";
    questionTextEl.textContent = questionText[index];
    for (var i = 0; i < 4; i++) {
        var optionEl = "option"+i+"El";
        var optionLetter = String.fromCharCode(i+65);
        var optionText = answerOptions[index * 4 + i];
        eval(optionEl + ".textContent = '" + optionLetter + ". " + optionText + "'");
    }
    optionsEl.style.display = "flex";
    correctAnswer = answerOptions[index * 4 + correctOption[index]];
    option0El.addEventListener("click", evalAnswer);
    option1El.addEventListener("click", evalAnswer);
    option2El.addEventListener("click", evalAnswer);
    option3El.addEventListener("click", evalAnswer);
}

function evalAnswer(event) {
    var answer = event.target.innerHTML.slice(3);
    if (answer === correctAnswer) {
        isCorrect();
    } else {
        isIncorrect();
    }
}

function isCorrect() {
    rightWrongEl.textContent = "Correct!";
}

function isIncorrect() {
    rightWrongEl.textContent = "Incorrect.";
    timerCount = timerCount - 10;
}
