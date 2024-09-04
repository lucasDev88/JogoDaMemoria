const cardsArray = [
    { name: 'primavera', img: 'https://via.placeholder.com/100/ffadad' },
    { name: 'verao', img: 'https://via.placeholder.com/100/fdffb6' },
    { name: 'outono', img: 'https://via.placeholder.com/100/ff9a76' },
    { name: 'inverno', img: 'https://via.placeholder.com/100/a0c4ff' },
    { name: 'primavera', img: 'https://via.placeholder.com/100/ffadad' },
    { name: 'verao', img: 'https://via.placeholder.com/100/fdffb6' },
    { name: 'outono', img: 'https://via.placeholder.com/100/ff9a76' },
    { name: 'inverno', img: 'https://via.placeholder.com/100/a0c4ff' }
];

const gameContainer = document.querySelector('.memory-game');
const timeDisplay = document.getElementById('time');
const attemptsDisplay = document.getElementById('attempts');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let attempts = 0;
let timer;
let time = 0;

function startGame() {
    time = 0;
    matches = 0;
    attempts = 0;
    timeDisplay.textContent = time;
    attemptsDisplay.textContent = attempts;
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
    }, 1000);

    gameContainer.innerHTML = '';
    const shuffledArray = cardsArray.sort(() => 0.5 - Math.random());
    shuffledArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `
            <img src="${item.img}" class="front-face">
            <div class="back-face"></div>
        `;
        card.dataset.name = item.name;
        gameContainer.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsDisplay.textContent = attempts;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matches++;
    if (matches === cardsArray.length / 2) {
        clearInterval(timer);
        setTimeout(() => alert('Você venceu!'), 300);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.getElementById('restart').addEventListener('click', startGame);

startGame();
