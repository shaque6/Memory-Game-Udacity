/*
 * Create the stars list
 */

 let stars = document.querySelector('.stars');
 stars.innerHTML += `<li><i class="fa fa-star"></i></li>`;
 stars.innerHTML += `<li><i class="fa fa-star"></i></li>`;
 stars.innerHTML += `<li><i class="fa fa-star"></i></li>`;

/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond' , 'fa-diamond',
              'fa-paper-plane-o' , 'fa-paper-plane-o',
              'fa-anchor' , 'fa-anchor',
              'fa-bolt' , 'fa-bolt',
              'fa-cube' , 'fa-cube',
              'fa-leaf' , 'fa-leaf',
              'fa-bicycle' , 'fa-bicycle',
              'fa-bomb' , 'fa-bomb',
            ];

function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

let moves = 0;
let moveCard = document.querySelector('.moves');
moveCard.innerHTML = moves;

let matchNumber; //number of cards that are Matched

//variables needed for Modal
let totalMoves = document.querySelector('.totalMoves');
let starRating = document.querySelector('.starRating');
let totalTime = document.querySelector('.totalTime');

function initGame(){
  matchNumber = 0;
  moves = 0;
  moveCard.innerHTML = moves;

  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  })
  deck.innerHTML = cardHTML.join('');
}

initGame();

//starting timer after game is initiated
let second = 0;
let minute = 0;
let time = ' min sec '
let inter = setInterval(function(){
  time = (minute + ' min ' + second + ' sec');
  second++;
  if (second == 60){
    minute++;
    second = 0;
  }
},1000);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




//If someone wants to restart, the page will refresh starting a new game
const restartCard = document.querySelector('.restart');
restartCard.addEventListener('click', function(e){
    location.reload();
})

//function to display the card's symbol
function showCard(card){
  card.classList.add('open','show');
}

//function to add the card to a *list* of "open" cards
function addCardToOpen(card){
  openCards.push(card);
}

//function for if the cards do match, lock the cards in the open position
function lockOpenCardPosition(openCards){
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
}

//function for if the cards do not match, remove the cards from the list and hide the card's symbol
function hideCard(openCards , card){
  setTimeout(function(){
    openCards.forEach(function(card){
      card.classList.remove('open','show');
    });
    openCards = [];
  },1000);
}


//getting all the Cards
const allCards = document.querySelectorAll('.card');

//initializing the openCards array
let openCards = [];

//main event listener
allCards.forEach(function(card){
  card.addEventListener('click',function(e){

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      addCardToOpen(card);
      showCard(card);

        if (openCards.length >= 2){
          //Check for match
          if (openCards[0].dataset.card == openCards[1].dataset.card){
            // openCards[0].classList.add('match');
            // openCards[1].classList.add('match');
            lockOpenCardPosition(openCards);
            openCards = [];
            matchNumber += 1;
            console.log('Matched Cards:' , matchNumber);

          } else {
            //If no match hide them
            // setTimeout(function(){
            //   openCards.forEach(function(card){
            //     card.classList.remove('open','show');
            //   });
            //   openCards = [];
            // },1000);
            hideCard(openCards , card);
          }
          moves += 1;
          // if at least 12 moves, remove one star
          if (moves == 12){
            stars.removeChild(stars.childNodes[0]);
          }
          // if at least 18 moves, remove second star
          if (moves == 18){
            stars.removeChild(stars.childNodes[0]);
          }
          moveCard.innerHTML = moves;
          if (matchNumber == 2){
            clearInterval(inter); //stopping timer
            console.log('Game Done');
            console.log(time);
            // Get the modal
            totalMoves.innerHTML += `${moves}`;
            starRating.innerHTML += `${stars.childElementCount}`;
            totalTime.innerHTML += `${time}`;
            var modal = document.getElementById('myModal');

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];


            modal.style.display = "block";


            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
              location.reload();
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
                location.reload();
              }
            }
          }
        }
      }
  });
});
