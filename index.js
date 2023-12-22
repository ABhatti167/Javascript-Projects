const player = document.querySelector("#player")
const com = document.querySelector("#com")
const result = document.querySelector("#result")

const rock = document.querySelector("#rock")
const paper = document.querySelector("#paper")
const scissors = document.querySelector("#scissors")

const Rock = document.querySelector("#rock").textContent
const Paper = document.querySelector("#paper").textContent
const Scissors = document.querySelector("#scissors").textContent

const choices = document.querySelectorAll(".choice")

let player1;
let com1;


choices.forEach(button => button.addEventListener("click", () => {

    player1 = button.textContent
    com1 = computerTurn()

    player.textContent = "Player: " + player1
    com.textContent = "Computer: " + com1
    
    result.textContent = displayWinner()
}))




function displayWinner() {
    if(player1 == com1) {
        return "Draw"
    } else if (player1 == "Rock") {
        return (com1 == "Paper") ? "Player Wins" : "Computer Wins"
    } else if (player1 == "Paper") {
        return (com1 == "Rock") ? "Player Wins" : "Computer Wins"
    } else if (player1 == "Scissors") {
        return (com1 == "Paper") ? "Player Wins" : "Computer Wins"
    }
}

function computerTurn() {
    let value= Math.floor(Math.random() * 3 + 1)

    if (value == 1) {
        return "Rock"
    } else if (value == 2) {
        return 'Paper'
    } else if (value == 3) {
        return 'Scissors'
    }
}