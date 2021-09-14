//ZMIENNE

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const spanPlayer = document.querySelector('.player > span');
const spanAI = document.querySelector('.ai > span');

const startText = document.querySelector('.startGame');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const lineWidth = 6;
const lineHeight = 12;

const ballSize = 20;
let ballX = cw/2-ballSize/2;
let ballY = ch/2-ballSize/2;



let playerPaddelWidth = 20;
let playerPaddelHeight = 100;

let aiPaddelWidth = 20;
let aiPaddelHeight = 100;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

let playerPoints = 0;
let aiPoints = 0;

let playerWin = false;
let ballColor = "white";
let isBlue = true;

let gameInterval = 0;
let gameIsStart = false;

var audioPaddel = document.getElementById("audioPaddel"); 
var audioWall = document.getElementById("audioWall");
var audioPoints = document.getElementById("points"); 
var ambientSci = document.getElementById("ambientSci");
//KONIEC ZMIENNYCH
function playPaddelAudio() { 
    audioPaddel.play(); 
} 

function playWallAudio() { 
    audioWall.play(); 
} 

function playPointsAudio() { 
    audioPoints.play(); 
} 

function PlayAmbientSci() { 
    ambientSci.loop = true;
    ambientSci.volume = 0.4;
    ambientSci.play(); 
} 

//losowanie
function drawNumberY(){
    let number = Math.random() * 2;
    return number;
}

function drawNumberX(){
    let number = Math.random() * 6 + 3;
    return number;
}

let ballSpeedX = -drawNumberX();
let ballSpeedY = -drawNumberY();
function speedUp(){
    //Prędkość X
    if(ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX -=1.4;
    }
    else if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX +=1.4;
    }
     //Prędkość Y
    if(ballSpeedY < 0 && ballSpeedY > -16){
        ballSpeedY -=.3;
    }
    else if(ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY +=.3;
    }
}

function player(){
    ctx.fillStyle = "greenyellow";
    ctx.fillRect(playerX, playerY, playerPaddelWidth, playerPaddelHeight);
}

function ai(){
    ctx.fillStyle = "crimson";
    ctx.fillRect(aiX, aiY, aiPaddelWidth, aiPaddelHeight);
}

function gameOver(playerWin){
    if(playerWin == true)
    {
        ballColor = "white";
        playerPaddelHeight = 100;
        aiPaddelHeight = 100;
        ballX = cw/2-ballSize/2;
        ballY = ch/2-ballSize/2;
        ballSpeedX = -drawNumberX()
        ballSpeedY = -drawNumberY();
    }
    else if(playerWin == false)
    {
        ballColor = "white";
        playerPaddelHeight = 100;
        aiPaddelHeight = 100;
        ballX = cw/2-ballSize/2;
        ballY = ch/2-ballSize/2;
        ballSpeedX = drawNumberX();
        ballSpeedY = drawNumberY();
    }
    
}


//Kolorwanie Piłki

const colors = ["red", "green", "blue", "blue", "blue","white", "white", "white"];

function paintBallColor(){
    let color = Math.floor(Math.random() * colors.length);
    let paintBall = colors[color];
    return paintBall;
}

//RYSOWANIE PIŁKI

function ball(){
    ctx.fillStyle = ballColor;
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //Odbicia Piłki 
    if(ballX <= 0)
    {   
        if(ballColor == "white"){
            playPointsAudio();
            spanAI.textContent = ++aiPoints;
            playerWin = false;
            gameOver(playerWin);
        }
        else if(ballColor == "red"){
            playWallAudio();
            ballSpeedX = -ballSpeedX;
            speedUp();
            ballX += 100;
            ballColor = "white";
        }
        else if(ballColor == "green"){
            playPointsAudio();
            spanAI.textContent = ++aiPoints;
            playerWin = false;
            gameOver(playerWin);
        }

        else if(ballColor == "blue"){
            playPointsAudio();
            spanAI.textContent = ++aiPoints;
            playerWin = false;
            gameOver(playerWin);
        }
        
    }
    else if(ballX + ballSize >= cw)
    {
        if(ballColor == "white"){
            playPointsAudio();
            spanPlayer.textContent = ++playerPoints;
            playerWin = true;
            gameOver(playerWin);
        }
        else if(ballColor == "red")
        {
            playWallAudio();
            ballSpeedX = -ballSpeedX;
            speedUp();
            ballX -= 100;
            ballColor = "white";
        }
        else if(ballColor == "green"){
            playPointsAudio();
            spanPlayer.textContent = ++playerPoints;
            playerWin = true;
            gameOver(playerWin);
        }
        else if(ballColor == "blue"){
            playPointsAudio();
            spanPlayer.textContent = ++playerPoints;
            playerWin = true;
            gameOver(playerWin);
        }
    }

    if(ballY <= 0 || ballY + ballSize >= ch)
    {
        if(ballX + ballSize <= cw/2)
        {
            if(ballSpeedX < 0)
            {
                playWallAudio();
                console.log("mniej od połowy, < od zera");
                if(ballColor == "blue")
                {
                    ballSpeedX = -16;  
                    ballSpeedY = -ballSpeedY;
                    ballColor = "white";
                    isBlue = true;
                }
        
                else{
                    ballSpeedY = -ballSpeedY;
                    ballColor = paintBallColor();
                }
            }
            else if(ballSpeedX > 0)
            {
                console.log("mniej od połowy, > od zera");
                if(ballColor == "blue")
                {
                    ballSpeedX = -16;  
                    ballSpeedY = -ballSpeedY;
                    ballColor = "white";
                    isBlue = true;
                    playPointsAudio();
                }
        
                else{
                    ballSpeedY = -ballSpeedY;
                    playWallAudio();
                }
            }
        } //< od połowy, > od zera
        else if(ballX + ballSize > cw/2) 
        {
            if(ballSpeedX < 0)
            {
                console.log("więcej od połowy, < od zera");
                if(ballColor == "blue")
                {
                    ballSpeedX = 16;  
                    ballSpeedY = -ballSpeedY;
                    ballColor = "white";
                    isBlue = true;
                    playPointsAudio();
                }
        
                else{
                    ballSpeedY = -ballSpeedY;
                    playWallAudio();
                }
            }
            else if(ballSpeedX > 0)
            {
                console.log("więcej od połowy, > od zera");
                playWallAudio();
                if(ballColor == "blue")
                {
                    ballSpeedX = 16;  
                    ballSpeedY = -ballSpeedY;
                    ballColor = "white";
                    isBlue = true;
                }
        
                else{
                    ballSpeedY = -ballSpeedY;
                    ballColor = paintBallColor();
                }
            }
        }

        else{
            playWallAudio()
            ballSpeedY = -ballSpeedY;
            ballColor = paintBallColor();
        }
      
    }
    //Odbicie od paletki Gracza
    if(ballY+ballSize >= playerY  && ballY < playerY + playerPaddelHeight && (ballX <= playerX+playerPaddelWidth && ballX >= playerX-playerPaddelWidth))
    {
        playPaddelAudio();
        speedUp();
        if(ballColor == "white")
        {
            if(isBlue)
            {
                ballColor = "white";
                ballX += 10;
                ballSpeedX = -drawNumberX()-3;
                isBlue = false;
                console.log(ballSpeedX);
            }
            else
            {
                ballColor = paintBallColor();
                ballX += 10;
                ballSpeedX = -ballSpeedX;
            } 
        }
        else if(ballColor == "red")
        {
            playerPaddelHeight = playerPaddelHeight/1.5;
            ballSpeedX = -ballSpeedX;
            ballX += 10;
            ballColor = "white";
        }
        else if (ballColor == "blue")
        {
            
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY;
            ballSpeedX = 16;
            ballX += 10;
            ballColor = "white";
            isBlue = true;

        }

        else if(ballColor == "green")
        {
            if(playerPaddelHeight < 100)
            {
                playerPaddelHeight = playerPaddelHeight*1.25;
                ballSpeedX = -ballSpeedX;
                ballX += 10;
                ballColor = "white";
            }
            else{
                ballSpeedX = -ballSpeedX;
                ballX += 10;
                ballColor = "white";
            }
            
        }
            
    } 
    //Odbicie od paletki AI
    else if(ballY+ballSize >= aiY && ballY < aiY + aiPaddelHeight && (ballX+ballSize >= aiX && ballX <= aiX+aiPaddelWidth)) 
    {
        playPaddelAudio()
        if(ballColor == "white")
        {
            if(isBlue)
            {
                ballColor = "white";
                ballX -= 10;
                ballSpeedX = -drawNumberX()-3;
                isBlue = false;
                console.log(ballSpeedX);
            }
            else
            {
                ballColor = paintBallColor();
                ballX -= 10;
                ballSpeedX = -ballSpeedX;
            }
        }
        else if(ballColor == "red")
        {
            aiPaddelHeight = aiPaddelHeight/1.5;
            ballSpeedX = -ballSpeedX;
            ballX -= 10;
            ballColor = "white";
        }

        else if(ballColor == "green")
            {
                if(aiPaddelHeight < 100)
                {
                    aiPaddelHeight = aiPaddelHeight*1.5;
                    ballSpeedX = -ballSpeedX;
                    ballX -= 10;
                    ballColor = "white";
                }
                else{
                    ballSpeedX = -ballSpeedX;
                    ballX -= 10;
                    ballColor = "white";
                }
            }
        else if(ballColor == "blue")
            {
                ballSpeedX = -16;
                ballSpeedY = -ballSpeedY;
                ballX -= 10;
                ballColor = "white";
                isBlue = true;
            }
        }
    } 

//RYSOWANIE STOŁU
function table(){
    //stół
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch);
    //linie po środku
    for(let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray";
            ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
        }
    
}
//POZYCJA GRACZA
function playerPosition(e){;
    playerY = e.clientY - canvas.offsetTop - playerPaddelHeight/2;
    if(playerY <= 0) playerY = 0;
    else if(playerY >= ch-playerPaddelHeight) playerY = ch-playerPaddelHeight;
}
//POZYCJA AI
function aiPosition(){
   const middlePaddel = aiY + aiPaddelHeight/2;
   const middleBall = ballY + ballSize/2;

   if(aiY <= 0) aiY = 0;
   else if(aiY >= ch-aiPaddelHeight) aiY = ch-aiPaddelHeight;

    if(ballColor == "white" || ballColor == "green")
    {
        if(ballX > 500)
        {
           if(middlePaddel - middleBall > 200)
           {
               aiY -= 25;
           }
           else if(middlePaddel - middleBall > 50)
           {
            aiY -= 15;
           }
           else if(middlePaddel - middleBall < -200)
           {
            aiY += 25;
           }
           else if(middlePaddel - middleBall < -50)
           {
            aiY += 15;
           }    
        }
        else if(ballX <= 500 && ballX > 150)
        {
            if(middlePaddel - middleBall > 100)
            {
                aiY -= 3;
            }
            else if(middlePaddel - middleBall < -100)
            {
                aiY += 3;
            }
        }
        
    }
    if(ballColor == "red"){;
        if(ballX > 500)
        {
           if(middlePaddel - middleBall > 80)
           {
               aiY -= -5;
           }
           else if(middlePaddel - middleBall > 30)
           {
            aiY -= -10;
           }
        }
          
        
        else if(ballX <= 500 && ballX > 150)
        {
            if(middlePaddel - middleBall > 100)
            {
                aiY -= 3;
            }
            else if(middlePaddel - middleBall < -100)
            {
                aiY += 3;
            }
    }
}
if(ballColor == "blue")
    {
        if(ballX > 500)
        {
           if(middlePaddel - middleBall > 200)
           {
               aiY -= 30;
           }
           else if(middlePaddel - middleBall > 50)
           {
            aiY -= 20;
           }
           else if(middlePaddel - middleBall < -200)
           {
            aiY += 30;
           }
           else if(middlePaddel - middleBall < -50)
           {
            aiY += 20;
           }    
        }
        else if(ballX <= 500 && ballX > 150)
        {
            if(middlePaddel - middleBall > 100)
            {
                aiY -= 5;
            }
            else if(middlePaddel - middleBall < -100)
            {
                aiY += 5;
            }
        }
        
    }
}

canvas.addEventListener('mousemove', playerPosition);

window.addEventListener('click', startGame);

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
}

function startGame(){
    if(!gameIsStart)
    {
        startText.style.display = "none";
        PlayAmbientSci();
        gameInterval = setInterval(game, 1000/60);
        gameIsStart = true;
    }
    else
    {
        startText.style.display = "block";
        clearInterval(gameInterval);
        gameIsStart = false;
    }
}

game();