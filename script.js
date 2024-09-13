console.log("Hello World!");

//declaring variables
let choices = ["rock", "paper", "scissors", "piatra", "hartie", "foarfeca"]; //adaug variantele in romana care vor fi alese daca langRO contine clasa activeButton
let playerSelection = "";
let playAgain = document.querySelector(".playAgain");
let winningScore = 5;
//sounds
let clickSound = new Audio("clicksound.mp3");
let winSound = new Audio("win.mp3");
let loseSound = new Audio("lose.mp3");
//variables representing the images the user will select
let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
//score and display status
let playerScore = document.querySelector(".scorePointsUser");
let computerScore = document.querySelector(".scorePointsComputer");
let computerPoints = 0;
let playerPoints = 0;
let displayChoice = document.querySelector(".displayChoice"); //displays the choices of both players
//languages
let langRO = document.querySelector(".ro-lang");
let langEN = document.querySelector(".en-lang");
let header = document.querySelector(".heading");
let para1 = document.querySelector(".para1");
let para2 = document.querySelector(".para2");
let result = document.querySelector(".result");

//generating a random number
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  if (langRO.classList.contains("activeButton")) {
    choices = ["piatra", "hartie", "foarfeca"];
  }
  return choices[Math.floor(Math.random() * choices.length)];
}

//applies a red border to the user's choice
function selectedByUser(x, y, z) {
  x.classList.add("selected-by-user");
  y.classList.remove("selected-by-user");
  z.classList.remove("selected-by-user");
}

//applies a blue border to the computer's choice
function selectedByComputer() {
  if (computerSelection == playerSelection) {
    //in case of equality (rock === rock), remove all borders
    rock.classList.remove("selected-by-computer", "selected-by-user");
    paper.classList.remove("selected-by-computer", "selected-by-user");
    scissors.classList.remove("selected-by-computer", "selected-by-user");
  } else if (computerSelection == choices[0]) {
    rock.classList.add("selected-by-computer");
    paper.classList.remove("selected-by-computer");
    scissors.classList.remove("selected-by-computer");
  } else if (computerSelection == choices[1]) {
    paper.classList.add("selected-by-computer");
    rock.classList.remove("selected-by-computer");
    scissors.classList.remove("selected-by-computer");
  } else {
    scissors.classList.add("selected-by-computer");
    paper.classList.remove("selected-by-computer");
    rock.classList.remove("selected-by-computer");
  }
}

//removing hover effect when the game is over
function stopHover(x, y, z) {
  x.classList.add("noHover");
  y.classList.add("noHover");
  z.classList.add("noHover");
}

//takes place when one of the players reaches 5 points
function endGame(player, computer) {
  stopHover(rock, paper, scissors);
  if (langRO.classList.contains("activeButton")) {
    playAgain.innerText = "Vrei sa mai incerci o data?";
  }

  if (player > computer) {
    displayChoice.innerText = "This match was yours! Congratulations!";
    winSound.play();
    playAgain.classList.remove("hide");
  } else {
    displayChoice.innerText = "Maybe next time :(";
    loseSound.play();
    playAgain.classList.remove("hide");
  }
}

//restoring everything back to the initial values for the playAgain function
//by clicking

//removes borders when the game is restarted
function removeBorders(x, y, z) {
  x.classList.remove("selected-by-computer", "selected-by-user");
  y.classList.remove("selected-by-computer", "selected-by-user");
  z.classList.remove("selected-by-computer", "selected-by-user");
}

//restoring hover effect when the game is restarted
function addHover(x, y, z) {
  x.classList.remove("noHover");
  y.classList.remove("noHover");
  z.classList.remove("noHover");
}

function reset() {
  playerPoints = 0;
  playerScore.innerText = playerPoints;
  computerPoints = 0;
  computerScore.innerText = computerPoints;
  playAgain.classList.add("hide");
  displayChoice.innerText = "";
  removeBorders(rock, paper, scissors);
  addHover(rock, paper, scissors);
}

playAgain.addEventListener("click", reset);

//by pressing down the enter key
document.addEventListener("keydown", function (event) {
  if (!playAgain.classList.contains("hide")) {
    if (event.keyCode === 13) {
      reset();
    }
  }
});

//switching languages - english will be default

langRO.addEventListener("click", function () {
  langRO.classList.add("activeButton");
  langEN.classList.remove("activeButton");

  header.innerText = "Foarfeca, hartie, piatra?";
  para1.innerText =
    "Cum merge jocul: vei duce o lupta impotriva campionului nostru - computerul.";
  para2.innerText = "Primul care ajunge la 5 puncte, castiga lupta!";
  result.innerText = "Rezultat:";
  playAgain.innerText = "Vrei sa mai incerci o data?";
});

//english is the default language
langEN.addEventListener("click", function () {
  langEN.classList.add("activeButton");
  langRO.classList.remove("activeButton");

  header.innerText = "Rock, paper, scissors?";
  para1.innerText =
    "Here's how it works: you will play with our biggest fighter - a computer.";
  para2.innerText = "The first one to gain 5 points wins.";
  result.innerText = "Score:";
});

//manipulation
rock.addEventListener("click", function () {
  /* if (langRO.classList.contains("activeButton")) {
    playerSelection = choices[3];
  } else {
    playerSelection = choices[0];
  } //asa prezentam alegerea user-ului in functie de limba aleasa*/
  playerSelection = choices[0];
  computerSelection = getComputerChoice();
  if (langRO.classList.contains("activeButton")) {
    displayChoice.innerText = `Ai ales ${playerSelection}. Computerul a ales ${computerSelection}. `;
  } else {
    displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;
  }

  if (playerPoints < winningScore && computerPoints < winningScore) {
    //applies a red border on the image selected by the user
    selectedByUser(rock, paper, scissors);
    selectedByComputer();

    clickSound.play();
    //without this if statement, the score will continue to go up past 5
    if (computerSelection == choices[0]) {
      displayChoice.innerText += " It's a tie!";
    } else if (computerSelection == choices[1]) {
      computerPoints++;
      displayChoice.innerText += " You lose!";
      computerScore.innerText = computerPoints;
    } else {
      playerPoints++;
      displayChoice.innerText += " You win!";
      playerScore.innerText = playerPoints;
    }
  }
  //when one of the players reaches 5 points, the game ends
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});

paper.addEventListener("click", function () {
  playerSelection = choices[1];
  computerSelection = getComputerChoice();
  displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;

  if (playerPoints < winningScore && computerPoints < winningScore) {
    selectedByUser(paper, rock, scissors);
    selectedByComputer();

    clickSound.play();
    if (computerSelection == choices[0]) {
      playerPoints++;
      displayChoice.innerText += " You win!";
      playerScore.innerText = playerPoints;
    } else if (computerSelection == choices[2]) {
      computerPoints++;
      displayChoice.innerText += " You lose!";
      computerScore.innerText = computerPoints;
    } else {
      displayChoice.innerText += " It's a tie!";
    }
  }
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});

scissors.addEventListener("click", function () {
  playerSelection = choices[2];
  computerSelection = getComputerChoice();
  displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;

  if (playerPoints < winningScore && computerPoints < winningScore) {
    selectedByUser(scissors, rock, paper);
    selectedByComputer();

    clickSound.play();
    if (computerSelection == choices[2]) {
      displayChoice.innerText += " It's a tie!";
    } else if (computerSelection == choices[0]) {
      computerPoints++;
      displayChoice.innerText += " You lose!";
      computerScore.innerText = computerPoints;
    } else {
      playerPoints++;
      displayChoice.innerText += " You win!";
      playerScore.innerText = playerPoints;
    }
  }
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});

//inlocuit sirurile cu index matrice yes
//chenar colorat pe alegerile jucatorului si al pc-ului YES
// sa putem schimba limba in romana!

//familiarizare cu jquery
//ajax
//calculator

//javascript
document.querySelector(".rock").addEventListener("click", function () {});
//jquery
$("button").click(function () {});

/*
intrebari:
- cum pot avea double border in caz de egalitate
-cum pot traduce displayChoice avand in vedere ca este un paragraf dinamic? as putea umple tot codul
cu if/else statement-uri daaar suna a super complicatie
- would you like to play again sa mearga si cu enter
- sa poti naviga printre butoane cu sageti?
*/
