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

langEN.addEventListener("click", function () {
  langEN.classList.add("activeButton");
  langRO.classList.remove("activeButton");
  header.innerText = "Rock, paper, scissors?";
  para1.innerText =
    "Here's how it works: you will play with our biggest fighter - a computer.";
  para2.innerText = "The first one to gain 5 points wins.";
  result.innerText = "Score:";
  playAgain.innerText = "Would you like to play again?";
});

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
  } else if (
    computerSelection == choices[0] ||
    computerSelection == choices[3]
  ) {
    rock.classList.add("selected-by-computer");
    paper.classList.remove("selected-by-computer");
    scissors.classList.remove("selected-by-computer");
  } else if (
    computerSelection == choices[1] ||
    computerSelection == choices[4]
  ) {
    paper.classList.add("selected-by-computer");
    rock.classList.remove("selected-by-computer");
    scissors.classList.remove("selected-by-computer");
  } else {
    scissors.classList.add("selected-by-computer");
    paper.classList.remove("selected-by-computer");
    rock.classList.remove("selected-by-computer");
  }
}

//takes place when one of the players reaches 5 points
function endGame(player, computer) {
  stopHover(rock, paper, scissors);
  if (langRO.classList.contains("activeButton")) {
    playAgain.innerText = "Vrei sa mai incerci o data?";
  }
  if (player > computer) {
    if (langRO.classList.contains("activeButton")) {
      displayChoice.innerText = "Ai castigat! Felicitari!";
    } else {
      displayChoice.innerText = "This match was yours! Congratulations!";
    }
    winSound.play();
    playAgain.classList.remove("hide");
  } else {
    if (langRO.classList.contains("activeButton")) {
      displayChoice.innerText = "Poate data viitoare :(";
    } else {
      displayChoice.innerText = "Maybe next time :(";
    }
    loseSound.play();
    playAgain.classList.remove("hide");
  }
}

//restoring everything back to the initial values for the playAgain function

//resetting the game
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

//by click
playAgain.addEventListener("click", reset);

//by pressing down the enter key
document.addEventListener("keydown", function (event) {
  if (!playAgain.classList.contains("hide")) {
    if (event.keyCode === 13) {
      reset();
    }
  }
});

//removes borders when the game is restarted
function removeBorders(x, y, z) {
  x.classList.remove("selected-by-computer", "selected-by-user");
  y.classList.remove("selected-by-computer", "selected-by-user");
  z.classList.remove("selected-by-computer", "selected-by-user");
}

//removing hover effect when the game is over
function stopHover(x, y, z) {
  x.classList.add("noHover");
  y.classList.add("noHover");
  z.classList.add("noHover");
}

//restoring hover effect when the game is restarted
function addHover(x, y, z) {
  x.classList.remove("noHover");
  y.classList.remove("noHover");
  z.classList.remove("noHover");
}

//manipulation
rock.addEventListener("click", function () {
  computerSelection = getComputerChoice();
  //user's choice and the text displayed based on the selected language
  if (langRO.classList.contains("activeButton")) {
    playerSelection = choices[3];
    displayChoice.innerText = `Ai ales ${playerSelection}. Computerul a ales ${computerSelection}.`;
  } else {
    playerSelection = choices[0];
    displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;
  }

  if (playerPoints < winningScore && computerPoints < winningScore) {
    //applies a red border on the choice selected by the user
    selectedByUser(rock, paper, scissors);
    //applies a blue border on the choice selected by the computer
    selectedByComputer();
    clickSound.play();
    //without this if statement, the score will continue to go up past 5
    if (computerSelection == choices[0] || computerSelection == choices[3]) {
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Egalitate!";
      } else {
        displayChoice.innerText += " It's a tie!";
      }
    } else if (
      computerSelection == choices[1] ||
      computerSelection == choices[4]
    ) {
      computerPoints++;
      computerScore.innerText = computerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai pierdut!";
      } else {
        displayChoice.innerText += " You lose!";
      }
    } else if (
      computerSelection == choices[2] ||
      computerSelection == choices[5]
    ) {
      playerPoints++;
      playerScore.innerText = playerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai castigat!";
      } else {
        displayChoice.innerText += " You win!";
      }
    }
  }
  //when one of the players reaches 5 points, the game ends
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});

paper.addEventListener("click", function () {
  computerSelection = getComputerChoice();
  if (langRO.classList.contains("activeButton")) {
    playerSelection = choices[4];
    displayChoice.innerText = `Ai ales ${playerSelection}. Computerul a ales ${computerSelection}. `;
  } else {
    playerSelection = choices[1];
    displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;
  }

  if (playerPoints < winningScore && computerPoints < winningScore) {
    selectedByUser(paper, rock, scissors);
    selectedByComputer();

    clickSound.play();
    if (computerSelection == choices[0] || computerSelection == choices[3]) {
      playerPoints++;
      playerScore.innerText = playerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai castigat!";
      } else {
        displayChoice.innerText += " You win!";
      }
    } else if (
      computerSelection == choices[2] ||
      computerSelection == choices[5]
    ) {
      computerPoints++;
      computerScore.innerText = computerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai pierdut!";
      } else {
        displayChoice.innerText += " You lose!";
      }
    } else if (
      computerSelection == choices[1] ||
      computerSelection == choices[4]
    ) {
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Egalitate!";
      } else {
        displayChoice.innerText += " It's a tie!";
      }
    }
  }
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});

scissors.addEventListener("click", function () {
  computerSelection = getComputerChoice();
  if (langRO.classList.contains("activeButton")) {
    playerSelection = choices[5];
    displayChoice.innerText = `Ai ales ${playerSelection}. Computerul a ales ${computerSelection}.`;
  } else {
    playerSelection = choices[2];
    displayChoice.innerText = `You chose ${playerSelection}. The computer chose ${computerSelection}.`;
  }

  if (playerPoints < winningScore && computerPoints < winningScore) {
    selectedByUser(scissors, rock, paper);
    selectedByComputer();

    clickSound.play();
    if (computerSelection == choices[2] || computerSelection == choices[5]) {
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Egalitate!";
      } else {
        displayChoice.innerText += " It's a tie!";
      }
    } else if (
      computerSelection == choices[0] ||
      computerSelection == choices[3]
    ) {
      computerPoints++;
      computerScore.innerText = computerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai pierdut!";
      } else {
        displayChoice.innerText += " You lose!";
      }
    } else if (
      computerSelection == choices[1] ||
      computerSelection == choices[4]
    ) {
      playerPoints++;
      playerScore.innerText = playerPoints;
      if (langRO.classList.contains("activeButton")) {
        displayChoice.innerText += " Ai castigat!";
      } else {
        displayChoice.innerText += " You win!";
      }
    }
  }
  if (playerPoints == winningScore || computerPoints == winningScore) {
    endGame(playerPoints, computerPoints);
  }
});
