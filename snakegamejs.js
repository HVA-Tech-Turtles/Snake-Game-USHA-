//board
var blockSize=15;
var rows=30;
var cols=40;
var board;
var context;
var score=0;

//snake head
var snakeX =blockSize*5;
var snakeY=blockSize*5;

//food
var foodX;
var foodY;

//speed
velocityX=0;
velocityY=0;

//snake body 
var snakeBody=[];

//gameover condition
var gameOver=false;

var popup=document.getElementById("popup");
var startGame=document.getElementById(".startGame");
var scoreDisplay=document.getElementById("scoreDisplay");

function start() {
    document.getElementById('popup').style.display="none";
    /*document.addEventListener("keyup",changeDirection);
    createBoard();
    playAgain.addEventListener("click",replay);
}

function createBoard() {*/
    board=document.getElementById("board");
    board.height= rows*blockSize;
    board.width=cols*blockSize;
    context=board.getContext("2d");
    
    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,1000/10);
}

function update(){
    if (gameOver) {
        return;
    }

    context.fillStyle="antiquewhite";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX==foodX && snakeY==foodY)
    {
        //score=score+1;
        //scoreDisplay.write(score++);
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for(let i=snakeBody.length-1;i>0;i--) {
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0]=[snakeX, snakeY];
    }

    context.fillStyle="green";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);  //coordinates and width,height
    for(let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //gameOver conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over!!!");
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!!!");
        }
    }
}

function placeFood(){
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize;
}

function changeDirection(e){
    if(e.code =="ArrowUp" && velocityY!=1)
    {
        velocityX=0;
        velocityY=-1;
    }
    if(e.code =="ArrowDown" && velocityY!=-1)
    {
        velocityX=0;
        velocityY=1;
    }
    if(e.code =="ArrowLeft" && velocityX!=1)
    {
        velocityX=-1;
        velocityY=0;
    }
    if(e.code =="ArrowRight" && velocityX!=-1)
    {
        velocityX=1;
        velocityY=0;
    }
}

function upClick() {
    if(velocityY!=1){
    velocityX=0;
    velocityY=-1;
    }
}
function downClick() {
    if(velocityY!=-1){
    velocityX=0;
    velocityY=1;
    }
}
function leftClick() {
    if(velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
}
function rightClick() {
    if(velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}
