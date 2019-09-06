var colors = [];
var startingNumber = 12;
var pickedColor;
var timesRun;
var phaseInterval;
var intTimer = 2000;
var maxPhases = 12;
var isLocked = true;
var squares = document.querySelectorAll(".square");
var startBtn = document.querySelector("#startBtn");
var modeButtons = document.querySelectorAll(".mode");
var goalSquare = document.querySelector("#goalSquare");
var score = document.querySelector("#score");
var userMessage = document.querySelector("#userMessage");
var timer = document.querySelector("#timer");



generateRandomColors(startingNumber);
setBackgrounds();
setMode();
hideSquares();

startBtn.addEventListener("click", function(){
    score.textContent = "0";
    timesRun = 0;
    addListeners();
    startGame();
});

function setMode(){
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
                timer.textContent = "2.5";
            } else if(selectedMode === "Medium"){
                startingNumber = 8;
                maxPhases = 10;
                intTimer = 2000;
                timer.textContent = "2";
            } else if(selectedMode === "Hard"){
                startingNumber = 12;
                maxPhases = 14;
                intTimer = 1500;
                timer.textContent = "1.5";
            } else {
                startingNumber = 16;
                maxPhases = 18;
                intTimer = 1000;
                timer.textContent = "1.0";
            }
            generateRandomColors(startingNumber);
            setBackgrounds();
            hideSquares();
        });
    }
}

function hideSquares(){
    for(var i = startingNumber; i < squares.length; i++){
        squares[i].style.display = "none";
    }
}

function showAllSquares(){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.display = "block";
    }
}

function startGame(){
    clearInterval(phaseInterval);
    phaseInterval = setInterval(nextPhase, intTimer);
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
    clearInterval(phaseInterval);
    removeListeners();
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
        score.textContent++;
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

