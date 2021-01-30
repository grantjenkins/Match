//ensure the DOM has been fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
  
  //card array including name and img src
  const cardArray = [
    {
      name: 'gnome',
      img: 'images/gnome.png'
    },
    {
      name: 'inkscape',
      img: 'images/inkscape.png'
    },
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
    }
  ];
  //get grid createElement
  const grid = document.getElementById("grid");
  //get message elements
  const message = document.getElementById('message');

  const cardContent = document.getElementById('card-content');

  //holds the two cards that are chosen
  let cardsChosen = [];
  //holds the number of matches (1/2 length of cards)
  let matches = 0;
  //holds the number of turns in a game
  let turns = 0;

  //create the board
  function createBoard() {
    //randomly sort the cards array
    cardArray.sort(() => 0.5 - Math.random());

    //loop through the cards array
    for(let i = 0; i < cardArray.length; i++) {
      //create new element for each card
      let card = document.createElement('img');
      //set default (initial) block image
      card.setAttribute('src', 'images/blocks.png');
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
      //if they match then increase the number of matches
      matches++;
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
    message.textContent = 'Matches: ' + matches + ', Turns: ' + turns;

    //if the number of matches is 1/2 length of the cards array
    //1/2 because we only record a single match for TWO cards
    if(matches === cards.length/2) {
      //update the message display on the screen
      message.textContent = 'Congratulations! You found them all!';
      //add spin class to all cards so the spin animation runs
      cards.forEach(function(card) {
        card.classList.add('spin');
      })

      cardContent.classList.add('over');
    }
  }

  //handles the flipping over of the cards
  function flipCard() {
    //only allow two cards to be selected at a once
    if(cardsChosen.length === 2) {
      return;
    }

    //get the id of the current card
    let id = this.getAttribute('data-id');

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
    matches = 0, turns = 0;

    //update the number of matches/turns displayed on the screen
    message.textContent = 'Matches: ' + matches + ', Turns: ' + turns;

    //clear all the existing images from the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    //reset the board
    createBoard();

    cardContent.classList.remove('over');
  }

  //add click event for the start button
  document.getElementById('startButton').addEventListener('click', resetGame);

  //create the initial board with the cards
  createBoard();

});