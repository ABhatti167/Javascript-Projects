const gameBoard = document.getElementById("gameContainer")
const scoreBlue = document.getElementById("blueScore")
const scoreRed = document.getElementById("redScore")
const resetButton = document.getElementById("reset")

const ctx = gameBoard.getContext("2d")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height

const backgroundColor = "rgb(0, 204, 31)"
const blueColor = "lightblue"
const redColor = "red"
const paddleBorder = 'black'
const ballColor = 'white'
const ballBorder = "black"

const ballRadius = 25
const paddleSpeed = 25

let intervalID;
let ballSpeed = 1
let ballX = gameWidth/2
let ballY = gameHeight/2

let ballxVelocity = 0
let ballyVelocity = 0

let bluePlayerScore = 0
let redPlayerScore = 0

let bluePaddle = {
    width: 25,
    height:130,
    x: 5, y: 0

}
let redPaddle = {
    width: 25,
    height: 130,
    x: gameWidth-30, y: 0
}

window.addEventListener('keydown', changeDirection)
resetButton.addEventListener('click', resetGame)

gameStart()


function gameStart() {
    createBall()
    nextTick()
}
function changeDirection(event) {
    let keyPressed = event.keyCode

    const bluePaddleUp = 87
    const bluePaddleDown = 83
    const redPaddleUp = 38
    const redPaddleDown = 40

    switch (keyPressed) {

        case (bluePaddleUp):
            event.preventDefault();
        if(bluePaddle.y > 0){
        bluePaddle.y-=paddleSpeed
        }
        break;
        case (bluePaddleDown):
            event.preventDefault();
            if (bluePaddle.y < (gameHeight-bluePaddle.height)) {
            bluePaddle.y += paddleSpeed
            }
            break;
        case (redPaddleUp):
            event.preventDefault();
            if (redPaddle.y > 0) {
            redPaddle.y -= paddleSpeed
            }
            break;
        case (redPaddleDown):
            event.preventDefault();
            if (redPaddle.y < (gameHeight-redPaddle.height)) {
            redPaddle.y += paddleSpeed
            }
            break;
    }
}
function clearBoard() {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0,0,gameWidth,gameHeight)
}
function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard()
        drawPaddles()
        moveBall()
        drawBall(ballX, ballY)
        checkCollision()
        nextTick()
    },10)
}
function drawPaddles() {
    ctx.strokeStyle = "black"


    ctx.fillStyle = blueColor
    ctx.fillRect(bluePaddle.x,bluePaddle.y, bluePaddle.width, bluePaddle.height)
    ctx.strokeRect(bluePaddle.x, bluePaddle.y, bluePaddle.width, bluePaddle.height)

    ctx.fillStyle = redColor
    ctx.fillRect(redPaddle.x, redPaddle.y, redPaddle.width, redPaddle.height)
    ctx.strokeRect(redPaddle.x, redPaddle.y, redPaddle.width, redPaddle.height)

}
function createBall() {

    ballSpeed = 1
    if(Math.round(Math.random()) == 1) {
        ballxVelocity = 1
    } else {
        ballxVelocity = -1
    }
    if (Math.round(Math.random()) == 1) {
        ballyVelocity = 1
    } else {
        ballyVelocity = -1
    }
    ballX = gameWidth/2
    ballY = gameHeight/2
    drawBall(ballX,ballY)
}
function moveBall() {
    ballX += (ballSpeed * ballxVelocity)
    ballY += (ballSpeed * ballyVelocity)
}
function drawBall(ballX, ballY) {

    ctx.fillStyle = ballColor
    ctx.strokeStyle = ballBorder
    ctx.lineWidth = 2

    ctx.beginPath()

    ctx.arc(ballX,ballY,ballRadius,0,2 * Math.PI)
    ctx.stroke()
    ctx.fill()
}
function checkCollision() {

    if(ballY <= ballRadius) {
        ballyVelocity *= -1
    } else if (ballY >= gameHeight - ballRadius) {
        ballyVelocity *= -1
    }
    if (ballX <=0) {
        redPlayerScore +=1
        updateScore()
        createBall()
        return;
    } else if (ballX >= gameWidth) {
        bluePlayerScore += 1
        updateScore()
        createBall()
        return;
    }
    if (ballX <= (bluePaddle.x + bluePaddle.width + ballRadius)) {
        if (ballY > (bluePaddle.y-10) && ballY < (bluePaddle.y + bluePaddle.height+10)) {
            ballX = (bluePaddle.x + bluePaddle.width) + ballRadius
            ballxVelocity *= -1
            ballSpeed += 1
        }
    }
    if (ballX > (redPaddle.x - ballRadius)) {
        if (ballY > (redPaddle.y-10) && ballY < (redPaddle.y + redPaddle.height+10)) {
            ballX = redPaddle.x - ballRadius
            ballxVelocity *= -1
            ballSpeed+=1
        }
    }
}
function updateScore() {
    scoreBlue.textContent = bluePlayerScore
    scoreRed.textContent = redPlayerScore
}
function resetGame() {
     ballSpeed = 1
     ballX = gameWidth / 2
     ballY = gameHeight / 2

     ballxVelocity = 0
     ballyVelocity = 0

     bluePlayerScore = 0
     redPlayerScore = 0

     bluePaddle = {
        width: 25,
        height: 75,
        x: 0, y: 0

    }
     redPaddle = {
        width: 25,
        height: 75,
        x: gameWidth - 25, y: 0
    }
    updateScore()
    clearInterval(intervalID)
    gameStart()
}