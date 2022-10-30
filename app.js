const cardsArray = [
  {'name':'memeface12','img':'img/memeface12.png'},
  {'name':'memeface11','img':'img/memeface11.png'},
  {'name':'memeface10','img':'img/memeface10.png'},
  {'name': 'memeface9','img': 'img/memeface9.png'},
  {'name': 'memeface8','img': 'img/memeface8.png'},
  {'name': 'memeface7','img': 'img/memeface7.png'},
  {'name': 'memeface6','img': 'img/memeface6.png'},
  {'name': 'memeface5','img': 'img/memeface5.png'},
  {'name': 'memeface4','img': 'img/memeface4.png'},
  {'name': 'memeface3','img': 'img/memeface3.png'},
  {'name': 'memeface2','img': 'img/memeface2.png'},
  {'name': 'memeface1','img': 'img/memeface1.png'},
],
  cardHalloweenArray = [
  {'name':'halloween12','img':'img/halloween12.png'},
  {'name':'halloween11','img':'img/halloween11.png'},
  {'name':'halloween10','img':'img/halloween10.png'},
  {'name': 'halloween9','img': 'img/halloween9.png'},
  {'name': 'halloween8','img': 'img/halloween8.png'},
  {'name': 'halloween7','img': 'img/halloween7.png'},
  {'name': 'halloween6','img': 'img/halloween6.png'},
  {'name': 'halloween5','img': 'img/halloween5.png'},
  {'name': 'halloween4','img': 'img/halloween4.png'},
  {'name': 'halloween3','img': 'img/halloween3.png'},
  {'name': 'halloween2','img': 'img/halloween2.png'},
  {'name': 'halloween1','img': 'img/halloween1.png'},
];

let playerOne = {
  name: '',
  moves: 0,
  points: 0
},
    playerTwo = {
  name: '',
  moves: 0,
  points: 0
}

let firstGuess = '',
    secondGuess = '',
    count = 0,
    movesTillWin = 0,
    turn = 0,
    previousTarget = null,  
    gridDimensionInput = 0,
    darkThemeToggle = false;

const delay = 1000;

const winnerDisplay = document.getElementById('winnerName'),
      restartGameButtons = document.querySelectorAll('.restartGame'),
      menuGameButtons = document.querySelectorAll('.menuGame'),
      startGameButton = document.getElementById('startGame'),
      singlePlayerButton = document.getElementById('singlePlayerMode'),
      multiPlayerButton = document.getElementById('multiPlayerMode'),
      firstPlayerPoints = document.getElementById('firstPlayerPoints'),
      secondPlayerPoints = document.getElementById('secondPlayerPoints'),
      firstPlayerMoves = document.getElementById('firstPlayerMoves');

const game = document.getElementById('game'),
      grid = document.createElement('section');

grid.setAttribute('class', 'grid');
game.appendChild(grid);

const gridDimension = (gridDimension) => {
  // shuffle the array
  let gameGrid = darkThemeToggle === false ? 
              cardsArray.sort(() => 0.5 - Math.random()) : 
              cardHalloweenArray.sort(() => 0.5 - Math.random());

  // slice the array with a given grid dimension
  let newGridDimensioned = gameGrid.slice(-gridDimension).concat(gameGrid.slice(-gridDimension));

  newGridDimensioned.sort(()=> 0.5 - Math.random());

  // Creat cards
  newGridDimensioned.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = window.screen.width > 450 ? '100px' : '80px';
    card.dataset.name = name;
  
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.width = window.screen.width > 450 ? '100px' : '80px';
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;
    back.style.width = window.screen.width > 450 ? '100px' : '80px';
  
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  themeFrontCardToggle();
}

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach( card => card.classList.add('match') );

  //every time we call this function we find a pair of cards and count it
  movesTillWin++;

  //display the winner name, if pair of cards found is equal with pairs input
  if(movesTillWin === gridDimensionInput) {
    if(playerOne.name !== '' && playerTwo.name !== ''){
      winnerDisplay.textContent = `${ playerOne.points === playerTwo.points ? "" : 
                                      playerOne.points > playerTwo.points ? playerOne.name : playerTwo.name} is 
                                    ${playerOne.points === playerTwo.points ? "a draw" : "winner"}`;                            
      document.querySelector('.singlePlayerStats').style.display = "unset";
      document.querySelector('.multiPlayerStats').style.display = "none";
      firstPlayerMoves.textContent = playerOne.points === playerTwo.points ? "-" : 
                                  playerOne.points > playerTwo.points ? playerOne.points : playerTwo.points 
    }else {
      //single player mode
      winnerDisplay.textContent = 'You Win';
    }  
  }
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');
  selected.forEach( card => card.classList.remove('selected') );
};

grid.addEventListener('click', event => {
  const clicked = event.target;

  //while seTimeout run, you cannot run this function
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || 
      clicked.parentNode.classList.contains('selected') || 
      clicked.parentNode.classList.contains('match')) {
    return;
  }

  if(turn % 2 === 0) {
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
  
      if (firstGuess && secondGuess) {
        document.getElementById('secondPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-white)';
        document.getElementById('firstPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-black)';
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          playerOne.points++;
        }
        setTimeout(resetGuesses, delay);
        playerOne.moves++;
      }
      previousTarget = clicked;
      if(count==2) turn++;
    }
  }else {
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
  
      if (firstGuess && secondGuess) {
        document.getElementById('secondPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-black)';
        document.getElementById('firstPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-white)';
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          playerTwo.points++;
        }
        setTimeout(resetGuesses, delay);

        //for singlePlayer we count every moves
        playerOne.moves++;
      }
      previousTarget = clicked;
      if(count==2) turn++;
    }
  }

  firstPlayerMoves.textContent = playerOne.moves;
  firstPlayerPoints.textContent = playerOne.points;
  secondPlayerPoints.textContent = playerTwo.points;
});

const cleanPlayerStats = () => {
  playerOne = {
    name: '',
    moves: 0,
    points: 0
  };
  playerTwo = {
    name: '',
    moves: 0,
    points: 0
  };
  turn = 0;
  
  //clean the parent node
  grid.textContent = '';

  firstPlayerPoints.textContent = playerOne.points;
  secondPlayerPoints.textContent = playerTwo.points;
  firstPlayerMoves.textContent = playerOne.moves;
}

singlePlayerButton.onclick = () => {
  document.getElementById('inputsPlayersDisplay').style.display = 'none';
  document.querySelector('.gridDimension').style.display  = 'unset';
  document.getElementById('inputSinglePlayerDisplay').style.display = 'unset';
  document.querySelector('.singlePlayerStats').style.display = 'unset';
  document.querySelector('.multiPlayerStats').style.display = 'none'; 
  winnerDisplay.textContent = 'Your Stats';
}

multiPlayerButton.onclick = () => {
  document.getElementById('inputsPlayersDisplay').style.display = 'unset';
  document.querySelector('.gridDimension').style.display  = 'unset';
  document.getElementById('inputSinglePlayerDisplay').style.display = 'none';
  document.querySelector('.singlePlayerStats').style.display = 'none';
  document.querySelector('.multiPlayerStats').style.display = 'unset';

  //default grid input
  gridDimensionInput = 6;
} 

document.getElementById('grid3x4').onclick = () => {
  gridDimensionInput = 6;
  gridDimension(gridDimensionInput);
  displayGame();
}

document.getElementById('grid4x4').onclick = () => {
  gridDimensionInput = 8;
  gridDimension(gridDimensionInput);
  displayGame();
}

const displayGame = () => {
  document.querySelector('.grid').style.width = window.screen.width > 700 ? '450px' : 'unset';
  document.querySelector('.menuGameDisplay').style.display = 'none';
  document.querySelector('.renderGameDisplay').style.display  = 'unset';
}

restartGameButtons.forEach(button => {
  button.onclick = () => {
  cleanPlayerStats();

  //render the game table again
  gridDimension(gridDimensionInput);

  //first player moves always first
  document.getElementById('firstPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-white)';
  document.getElementById('secondPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-black)';
  }
})

menuGameButtons.forEach(button => {
  button.onclick = () => {
    cleanPlayerStats();
    document.querySelector('.menuGameDisplay').style.display = 'unset';
    document.querySelector('.renderGameDisplay').style.display  = 'none';
  
    //remove the grid buttons
    document.querySelector('.gridDimension').style.display = 'none';
  }
})

document.getElementById('secondPlayerInput').onchange = () => {
  if(document.getElementById('firstPlayerInput').value && document.getElementById('secondPlayerInput').value) {
      startGameButton.disabled = false;
    }else {
      startGameButton.disabled = true;
    }
}

startGameButton.onclick = () => {
  playerOne.name = document.getElementById('firstPlayerInput').value;
  playerTwo.name = document.getElementById('secondPlayerInput').value;
  gridDimension(gridDimensionInput); 
  displayGame();

  document.getElementById('firstPlayerNameM').textContent = playerOne.name;
  document.getElementById('secondPlayerName').textContent = playerTwo.name;

  document.getElementById('firstPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-white)';
  document.getElementById('secondPlayerCard').style.boxShadow = '0px 0px 13px 0px var(--shadow-black)';
}

document.getElementById('grid3x4MP').onclick = () => {
  gridDimensionInput = 6;
}

document.getElementById('grid4x4MP').onclick = () => {
  gridDimensionInput = 8;
}

/*===========
 toggle theme
=============*/

const rootVariables = document.querySelector(':root');

document.getElementById('checkbox').onchange = () => {
  darkThemeToggle = !darkThemeToggle;

  if (darkThemeToggle) {
    rootVariables.style.setProperty('--cl-primary','#1C1C1C');
    rootVariables.style.setProperty('--cl-primary-hover','#F4831B');
    document.querySelectorAll('.btn').forEach((element) => element.style.border = 'solid 1px var(--cl-primary-hover)');
    document.querySelectorAll('.cardStats').forEach((element) => element.style.border = 'solid 1px var(--cl-primary-hover)');
    document.querySelector('.gameTitle').style.fontFamily = "Nosifer";
    document.querySelector('.gameTitle').style.color = "#660000";
    document.getElementById('singlePlayerMode').classList.add('bubbleEffect');
    document.getElementById('multiPlayerMode').classList.add('bubbleEffect');
    document.getElementById('lineTitleTheme').classList.remove('lineTitle');

    document.querySelector('.fixedVolume').style.display = 'unset';
    document.getElementById('volume').src = './img/volume-high-solid.png';

    document.getElementById('background-video').muted = false;
    document.getElementById('background-video').style.display = 'unset';
  }else {
    rootVariables.style.setProperty('--cl-primary','#43288A');
    rootVariables.style.setProperty('--cl-primary-hover','#CBB9FC');
    document.querySelectorAll('.btn').forEach((element) => element.style.border = 'none');
    document.querySelectorAll('.cardStats').forEach((element) => element.style.border = 'none');
    document.getElementById('singlePlayerMode').classList.remove('bubbleEffect');
    document.getElementById('multiPlayerMode').classList.remove('bubbleEffect');
    document.getElementById('lineTitleTheme').classList.add('lineTitle');

    document.querySelector('.fixedVolume').style.display = 'none';
    document.querySelector('.gameTitle').style.fontFamily = "Arial";
    document.querySelector('.gameTitle').style.color = "white";
    
    document.getElementById('background-video').muted = true;
    document.getElementById('background-video').style.display = 'none'; 
  }
}

const themeFrontCardToggle = () => darkThemeToggle ? 
document.querySelectorAll('.front').forEach((element) => element.style.backgroundImage = "url('./img/pumpkin.png')") : 
document.querySelectorAll('.front').forEach((element) => element.style.backgroundImage = "url('./img/memeLogo.png')");

let volumeToggle = true;

document.querySelector('.fixedVolume').onclick = () => {
  volumeToggle =!volumeToggle;

  if (volumeToggle && darkThemeToggle){
    document.getElementById('background-video').muted = false;
    document.getElementById('volume').src = './img/volume-high-solid.png';
  }else {
    document.getElementById('background-video').muted = true;
    document.getElementById('volume').src = './img/volume-xmark-solid.png'; 
  }
}
