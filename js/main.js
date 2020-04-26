var cards = [{
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  }, {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  }, {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  }, {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }];
  var cardsInPlay = [];
  var score = 0;
  var resetButton = document.getElementById('reset');
  var statusMessage = document.getElementById('status-message');
  var flipCount = 0;
  
  var createBoard = function() {
    for (var i = 0; i < cards.length; i++) {
      var cardElement = document.createElement('img');
      cardElement.setAttribute('src', 'images/back.png');
      cardElement.setAttribute('data-id', i);
      cardElement.addEventListener('click', flipCard);
      document.getElementById('game-board').appendChild(cardElement);
    }
  }
  
  var resetGame = function() {
    for (var i = 0; i < cards.length; i++) {
      var cardElement = document.querySelector('img');
      cardElement.remove();
      console.log('removeboard' + i);
    }
    score = -1;
    cardsInPlay.length = 0;
    updateScore();
    createBoard();
    statusMessage.textContent = "GAME RESET. TRY AGAIN!"
    resetButton.style.visibility = "hidden";
    flipCount = 0;
  }
  
  var updateScore = function() {
    if (score < 2) {
      score++;
      console.log('Score is ' + score);
      document.getElementById('score').textContent = "Score: " + score;
      if (score === 2) {
        statusMessage.textContent = "YOU WIN!";
        resetButton.style.visibility = "visible";
      }
    }
  }
  
  var checkForMatch = function() {
    if (cardsInPlay.length === 2) {
      if (cardsInPlay[0] === cardsInPlay[1]) {
        alert("YOU FOUND A MATCH!")
        cardsInPlay.length = 0;
        updateScore();
      } else {
        alert("SORRY, TRY AGAIN!");
        cardsInPlay.length = 0;
  
      };
    };
  };
  
  var flipCard = function() {
    if (flipCount > 4) {
      statusMessage.textContent = "STOP CHEATING :("
    } else {
      var cardId = this.getAttribute('data-id');
     this.setAttribute('src', cards[cardId].cardImage);
     console.log('User Flipped ' + cards[cardId].rank);
     console.log(cards[cardId].suit);
     console.log(cards[cardId].cardImage);
     cardsInPlay.push(cards[cardId].rank);
     checkForMatch();
     flipCount++;
    }
  };
  
  resetButton.addEventListener('click', resetGame);
  createBoard();