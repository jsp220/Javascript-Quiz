var scoreListEl = document.querySelector(".score-list");
var liEl1 = document.querySelector(".score-1");
var liEl2 = document.querySelector(".score-2");
var liEl3 = document.querySelector(".score-3");
var liEl4 = document.querySelector(".score-4");
var liEl5 = document.querySelector(".score-5");
var resetButton

var highScores = [];

function getHighScore() {
    var storedHighScore = localStorage.getItem("highScores");
    
    if (storedHighScore == null) {
        highScores = [];
    } else {
        highScores = JSON.parse(storedHighScore);

        for (var i=1; i <= highScores.length; i++) {
            var liString = "liEl"+i;
            console.log(liString);
            eval(liString + ".textContent = " + highScores[i-1]);
            eval(liString + ".style.display = 'list-item'");
        }
    }
}

getHighScore();

// .options display has to be changed to flex when game starts

// for testing getHighScore()
// abc = [30, 25, 20];
// localStorage.setItem("highScores", JSON.stringify(abc));