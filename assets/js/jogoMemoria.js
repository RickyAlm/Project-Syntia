const container = document.querySelector('.container');

const cards = [
    { id: 1, content: "❤️" },
    { id: 2, content: "🌻" },
    { id: 3, content: "😊" },
    { id: 4, content: "🙃" },
    { id: 5, content: "💑" },
    { id: 6, content: "🎉" },
    { id: 7, content: "🍣" },
    { id: 8, content: "🏖️" },
    { id: 9, content: "🥰" },
    { id: 10, content: "📸" },
    { id: 11, content: "🙈" },
    { id: 12, content: "😍" },
    { id: 13, content: "🐱" },
    { id: 14, content: "🐨" },
    { id: 15, content: "🍔" },
    { id: 16, content: "🍩" },
    { id: 17, content: "🌞" },
    { id: 18, content: "🍉" },
    { id: 19, content: "🍓" },
    { id: 20, content: "😄" },
    { id: 21, content: "🤭" },
    { id: 22, content: "🍀" },
    { id: 23, content: "🌼" },
    { id: 24, content: "🙊" },
];

const memoryBoard = document.getElementById('memory-board');
let flippedCards = [];
let matchedCards = [];
let currentLevel = 'easy';
let numberOfPairs;

function startGame(level) {
    currentLevel = level;

    switch (level) {
        case 'easy':
            numberOfPairs = 6;
            break;
        case 'medium':
            numberOfPairs = 12;
            break;
        case 'hard':
            numberOfPairs = 18;
            break;
        case 'veryHard':
            numberOfPairs = 24;
            break;
        default:
            numberOfPairs = 6;
    }

    const selectedCards = cards.slice(0, numberOfPairs);
    const duplicatedCards = [...selectedCards, ...selectedCards];
    duplicatedCards.sort(() => Math.random() - 0.5);

    memoryBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    memoryBoard.classList.remove('easy', 'medium', 'hard', 'veryHard');
    container.classList.remove('veryHard');

    memoryBoard.classList.add(level);

    if (level === 'veryHard') {
        container.classList.add('veryHard');
    }

    duplicatedCards.forEach(card => {
        memoryBoard.appendChild(createCard(card));
    });
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;
    cardElement.dataset.content = card.content;
    cardElement.textContent = card.content;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === numberOfPairs * 2) {
            setTimeout(() => {
                if (currentLevel === 'easy') {
                    addAlert.successAlert('fácil');
                    startGame('medium');
                } else if (currentLevel === 'medium') {
                    addAlert.successAlert('médio');
                    startGame('hard');
                } else if (currentLevel === 'hard') {
                    addAlert.successAlert('difícil');
                    startGame('veryHard');
                } else if (currentLevel === 'veryHard') {
                    document.addEventListener("click", () => {
                        window.location.href = '../recompensa/parabens.html';
                    })

                    Swal.fire({
                        title: 'Parabéns, meu amor!',
                        text: 'Você completou todos os níveis! Selecione o botão abaixo para continuar ❤️',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                        confirmButtonColor: '#e67e22'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '../recompensa/parabens.html';
                        }
                    });
                }
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

const addAlert = {
    successAlert: function (difficulty) {
        Swal.fire({
            title: 'Parabéns, meu amor!',
            text: `Você completou o nível ${difficulty}! Agora, a dificuldade vai aumentar. ❤️`,
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#e67e22'
        });
    },
    createAlert: function (title, text, icon, confirmButtonText) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButtonText,
            confirmButtonColor: '#e67e22'
        });
    }
};

startGame('veryHard');
