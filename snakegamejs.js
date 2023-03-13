//board
var blockSize=15;
var rows=30;
var cols=40;
var board;
var context;
var score=0;
var time=0;
var dist=0;
var count=0;
var speed=1000;

//snake head
var snakeX=blockSize*5;
var snakeY=blockSize*5;

//food
var foodX;
var foodY;

//speed
var velocityX=0;
var velocityY=0;

//snake body 
var snakeBody=[];

//gameover condition
var gameOver=false;

var popup=document.getElementById("popup");
var startGame=document.getElementById(".startGame");


function start(){
  document.getElementById('popup').style.display="none";

  board=document.getElementById("board");
  board.height= rows*blockSize;
  board.width=cols*blockSize;
  context=board.getContext("2d");
    
  placeFood();
  document.addEventListener("keyup",changeDirection);
  setInterval(update,speed/10);
}

function update(){

  if(gameOver){
    return;
  }

  context.fillStyle="bisque";  //board
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle="red";     //food
  context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX==foodX && snakeY==foodY)
    {
        count++;
        snakeBody.push([foodX, foodY]);
        score += (10*count);
        if(count>0)
        {
            setInterval(update,(speed*count*5)/10);
        }
        var scoreDisplay=document.getElementById("scoreDisplay");
        scoreDisplay.innerHTML = '&nbsp;' + score;
        placeFood();
    }

    for(let i=snakeBody.length-1;i>0;i--) {
        snakeBody[i]=snakeBody[i-1];  
    }
    if(snakeBody.length) {
        snakeBody[0]=[snakeX, snakeY];
    }

    context.fillStyle="green";
    snakeX += (velocityX)*blockSize;
    snakeY += (velocityY)*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); //coordinates,width,height

    time+=1;  //time increment
    var timeDisplay=document.getElementById("timeDisplay");
    timeDisplay.innerHTML='&nbsp;'+time;

    for(let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //gameOver conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        document.getElementById("game-over").style.display = "block";
        //context.fillStyle="blue";
        //alert("Game Over!!!");
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            document.getElementById("game-over").style.display = "block";
            //context.fillStyle="blue";
            //alert("Game Over!!!");
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