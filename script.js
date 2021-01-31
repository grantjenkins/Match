//ensure the DOM has been fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
  
  //card array including name and img src
  const cardArrayAll = [
    {
      name: 'gnome',
      img: 'images/gnome.png'
    },
    {
      name: 'inkscape',
      img: 'images/inkscape.png'
    },
    {
      name: 'armchair',
      img: 'images/armchair.png'
    },
    {
      name: 'firefox',
      img: 'images/firefox.png'
    },
    {
      name: 'gimp',
      img: 'images/gimp.png'
    },
    {
      name: 'owl',
      img: 'images/owl.png'
    },
    {
      name: 'pan',
      img: 'images/pan.png'
    },
    {
      name: 'pig',
      img: 'images/pig.png'
    },
    {
      name: 'apple',
      img: 'images/apple.png'
    },
    {
      name: 'atom',
      img: 'images/atom.png'
    },
    {
      name: 'battery',
      img: 'images/battery.png'
    },
    {
      name: 'bell',
      img: 'images/bell.png'
    },
    {
      name: 'calligr',
      img: 'images/calligr.png'
    },
    {
      name: 'shoe',
      img: 'images/shoe.png'
    },
    {
      name: 'gridiron',
      img: 'images/gridiron.png'
    },
    {
      name: 'lightbulb',
      img: 'images/lightbulb.png'
    },
    {
      name: 'meat',
      img: 'images/meat.png'
    },
    {
      name: 'paint',
      img: 'images/paint.png'
    },
    {
      name: 'carrot',
      img: 'images/carrot.png'
    },
    {
      name: 'calendar',
      img: 'images/calendar.png'
    },
    {
      name: 'jar',
      img: 'images/jar.png'
    },
    {
      name: 'mypaint',
      img: 'images/mypaint.png'
    },
    {
      name: 'radio',
      img: 'images/radio.png'
    },
    {
      name: 'stellarium',
      img: 'images/stellarium.png'
    },
    {
      name: 'telegram',
      img: 'images/telegram.png'
    },
    {
      name: 'vlc',
      img: 'images/vlc.png'
    }
  ];
  //card array that holds the current game cards
  let cardArray = [];
  //get grid createElement
  const grid = document.getElementById("grid");
  //get message elements
  const message = document.getElementById('message');
  //get card content element
  const cardContent = document.getElementById('card-content');
  //get difficulty element
  const difficultyContent = document.getElementById('current-difficulty')

  //number of cards (based on difficulty)
  let numberOfCards = 16; //default to easy
  //card size based in numberOfCards (difficulty)
  let cardSize = 105;
  //holds the two cards that are chosen
  let cardsChosen = [];
  //holds the ids of the matched cards
  let matches = [];
  //holds the number of turns in a game
  let turns = 0;
  //has the game started yet? used to change the text on the main scene
  let gameStarted = false;

  //create the board
  function createBoard() {
    //clear the game array ready for adding new cards
    cardArray.length = 0;

    //randomly sort the ALL cards array
    cardArrayAll.sort(() => 0.5 - Math.random());

    //get the first n cards from all cards based on difficulty and add to game cards array
    //need to of each card, so two separate push commands are required
    for(let i = 0; i < numberOfCards / 2; i++) {
      cardArray.push({
        name: cardArrayAll[i].name,
        img: cardArrayAll[i].img
      });
      cardArray.push({
        name: cardArrayAll[i].name,
        img: cardArrayAll[i].img
      });
    }

    //randomly sort the game cards array now that we have our list of cards
    cardArray.sort(() => 0.5 - Math.random());

    //loop through the cards array
    for(let i = 0; i < cardArray.length; i++) {
      //create new element for each card
      let card = document.createElement('img');
      //set default (initial) block image
      card.setAttribute('src', 'images/blocks.png');
      //set width of image
      card.setAttribute('width', cardSize+'px');
      //capture id for each card
      card.setAttribute('data-id', i);
      //set click event for each card to call flipCard function
      card.addEventListener('click', flipCard);
      //add card element to the grid
      grid.appendChild(card);
    }
  }

  //checks if the two cards match
  function checkForMatch() {
    //get all the cards in the grid
    let cards = document.querySelectorAll('#grid > img');
    //get the ids of the two cards that are currently chosen
    const card1 = cardsChosen[0].id;
    const card2 = cardsChosen[1].id;
    //compare the two cards using their name
    if(cardsChosen[0].name === cardsChosen[1].name) {
      //if they match then add the ids to the matches array
      matches.push(card1);
      matches.push(card2);

      //spin the two cards that match
      cards[card1].classList.add('match');
      cards[card2].classList.add('match');
    }
    else { //if they don't match
      //reset the images for each card to the default block image
      cards[card1].setAttribute('src', 'images/blocks.png');
      cards[card2].setAttribute('src', 'images/blocks.png');
    }

    //add to the number of turns
    turns++;

    //clear the chosen cards array
    cardsChosen.length = 0;

    //update the number of matches/turns displayed on the screen
    message.textContent = 'Matches: ' + (matches.length / 2) + ', Turns: ' + turns;

    //MIGHT NEED TO CHANGE THIS IF GO WITH DIFFUCLTY AND NUMBER OF IMAGES USED
    //if the number of matches is equal to the number of images
    //1/2 because we only record a single match for TWO cards
    if(matches.length === cards.length) {
      //update the message display on the screen
      message.textContent = 'You found them all!';
      //add spin class to all cards so the spin animation runs
      //and remove match class to remove the current forwards animations
      cards.forEach(function(card) {
        card.classList.remove('match');
        card.classList.add('spin');
      })

      //add class to perform the grid flip animation
      cardContent.classList.add('over');

      //check if game already started and change text
      if(!gameStarted) {
        //update the content
        document.getElementById('card-body-heading').textContent = "Congratulations!!";
        document.getElementById('card-body-message').textContent = "You completed the game in " + turns + " turns.";
        //set the game to started
        gameStarted = true;
      }
    }
  }

  //handles the flipping over of the cards
  function flipCard() {
    //perform some initial checks to confirm valid card

    //only allow two cards to be selected at a once
    if(cardsChosen.length === 2) {
      return;
    }

    //get the id of the current card
    let id = this.getAttribute('data-id');

    //only if the cards haven't already been matched
    if(matches.includes(id)) {
      return;
    }

    //ensure that you can't select the same card twice
    if(cardsChosen.length === 1 && cardsChosen[0].id === id) {
      return;
    }

    //add the card to the chosen cards array (name and id)
    cardsChosen.push({
      name: cardArray[id].name,
      id: id
    });

    //change the image displayed to the actual card image
    this.setAttribute('src', cardArray[id].img);

    //if two cards are chosen then check for a match after 1 second delay
    if(cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }

  function resetGame() {
    //reset number of matches and turns
    matches.length = 0, turns = 0;

    //update the number of matches/turns displayed on the screen
    message.textContent = 'Matches: 0, Turns: 0';

    //clear all the existing images from the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    //reset the board
    createBoard();

    //turn the board back over to see the cards
    cardContent.classList.remove('over');
  }

  function setDifficulty() {
    //set the number of cards to be used 
    numberOfCards = this.getAttribute('data-cards');

    switch(numberOfCards) {
      case "16":
        cardSize = 105;
        difficultyContent.textContent = "Difficulty: Easy";
        break;
      case "24":
        cardSize = 80;
        difficultyContent.textContent = "Difficulty: Medium";
        break;
      case "36":
        cardSize = 70;
        difficultyContent.textContent = "Difficulty: Hard";
        break;
    }
  }

  //add click event for the start button
  document.getElementById('startButton').addEventListener('click', resetGame);
  //add click event for the difficulty buttons
  document.getElementById('easyButton').addEventListener('click', setDifficulty);
  document.getElementById('mediumButton').addEventListener('click', setDifficulty);
  document.getElementById('hardButton').addEventListener('click', setDifficulty);

  //create the initial board with the cards
  createBoard();

});