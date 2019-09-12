var colors = [];
var pickedColor;
var timesRun;
var phaseInterval;
var countdownInterval;
var score = 0;
var startingNumber = 12;
var intTimer = 2000;
var maxPhases = 12;
var isLocked = true;
var squares = document.querySelectorAll(".square");
var startBtn = document.querySelector("#startBtn");
var modeButtons = document.querySelectorAll(".mode");
var goalSquare = document.querySelector("#goalSquare");
var userMessage = document.querySelector("#userMessage");
var countdown = document.querySelector("#countdown");
var gameOver = document.querySelector("#gameOver");

setGame();

startBtn.addEventListener("click", function(){
	if(startBtn.textContent === "Start"){
		resetGame();
		score.textContent = "0";
		timesRun = 0;
		var i = 3;
		countdownInterval = setInterval(function(){
				if(i === 3){
					countdown.textContent = "3";
					i--;
				} else if (i === 2){
					countdown.textContent = "2";
					i--;
				} else if (i === 1){
					countdown.textContent = "1";
					i--;
				} else if (i === 0){
					i--;
					countdown.textContent = "GO";
					addListeners();
					startGame();
				} else if (i === -1){
					countdown.textContent = score;
					clearInterval(countdownInterval);
				}
			}
		, 1000);
	} else {
		stopGame();
	}
});

function setGame(){
	score = 0;
	showAllSquares();
	generateRandomColors(startingNumber);
	setBackgrounds();
	setMode();
	hideSquares();
}

function startGame(){
	setGame();
	startBtn.textContent = "End";
    clearInterval(phaseInterval);
    phaseInterval = setInterval(nextPhase, intTimer);
}

function resetGame(){
	gameOver.style.display = "none";
}

function setMode(){
	resetGame();
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            modeButtons[3].classList.remove("selected");
            this.classList.add("selected");
            var selectedMode = this.textContent;
            showAllSquares();
            if(selectedMode === "Easy"){
                startingNumber = 4;
                maxPhases = 10;
                intTimer = 2500;
            } else if(selectedMode === "Medium"){
                startingNumber = 8;
                maxPhases = 10;
                intTimer = 2000;
            } else if(selectedMode === "Hard"){
                startingNumber = 12;
                maxPhases = 14;
                intTimer = 1500;
            } else {
                startingNumber = 16;
                maxPhases = 18;
                intTimer = 1000;
            }
            generateRandomColors(startingNumber);
            setBackgrounds();
            hideSquares();
			gameOver.style.display = "none";
        });
    }
}

function hideSquares(){
    for(var i = startingNumber; i < squares.length; i++){
        squares[i].style.display = "none";
    }
}

function hideAllSquares(){
	for(var i = 0; i < squares.length; i++){
        squares[i].style.display = "none";
    }
}

function showAllSquares(){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.display = "block";
    }
}



function nextPhase() {
    if(timesRun >= maxPhases){
        stopGame();
    } else{
        colors = [];
        generateRandomColors(startingNumber);
        setBackgrounds();
    }
    timesRun += 1;
}

function stopGame(){
	startBtn.textContent = "Start";
    clearInterval(phaseInterval);
    removeListeners();
	hideAllSquares();
	finalScore.textContent = score;
	gameOver.style.display = "block";
}





//Generate random color array
function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    colors = arr;
    //pick the goal square color
    pickedColor = colors[Math.floor(Math.random() * num)];
    goalSquare.style.backgroundColor = pickedColor;
}

//Assing the array to the squares
function setBackgrounds() {
    for(var i = 0; i < squares.length; i++){ 
        squares[i].style.backgroundColor = colors[i];
    }
}

//Add Events Listeners to squares
function addListeners() {
    for(var i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", scoreListener);
    }
}

function removeListeners() {
    for(var i = 0; i < squares.length; i++){
        squares[i].removeEventListener("click", scoreListener);
    }
}

function scoreListener() {
    var squareColor = this.style.backgroundColor;
    if(squareColor === pickedColor){
        score++;
		countdown.textContent = score;
    } else {
        this.style.backgroundColor = "black";
    }
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

