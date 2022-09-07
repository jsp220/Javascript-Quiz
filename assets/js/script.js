var resetButton = document.querySelector(".reset-button");
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var scoreListEl = document.querySelector(".score-list");
for (i=1; i<=5; i++) {
    eval("var liEl" + i + " = document.querySelector('.score-" + i + "')");
};

var highScores = [];
var isWin = false;
var timerCount;
var gameOver = true;

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
    startTimer();
    questionOne();
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

resetButton.addEventListener("click", resetScores);
startButton.addEventListener("click", startQuiz);


getHighScore();

// .options display has to be changed to flex when game starts

// for testing getHighScore()
// abc = [30, 25, 20];
// localStorage.setItem("highScores", JSON.stringify(abc));