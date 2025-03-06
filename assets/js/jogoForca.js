const words = [
    { word: "ALFREDA", hint: "Nome de um animalzinho de estimação." },
    { word: "NENENZINHA", hint: "Apelido carinhoso." },
    { word: "EVERYTHING-GOOD", hint: "Uma música." },
    { word: "QUANTO", hint: "Palavra indecifrável da Syntia." },
    { word: "THOUSAND-FOOT-KRUTCH", hint: "Uma banda que você gosta muito." },
    { word: "INCRIVEL", hint: "Algo que você é." },
    { word: "VIEIRA", hint: "Meu nome do meio (porquê um dia você esqueceu kkk)." },
];

let remainingWords = [...words];
let selectedWord = '';
let selectedHint = '';
let guessedLetters = [];
let attempts = 6;
let hintUsed = false;

const hangmanDrawing = document.getElementById('hangmanDrawing');
const wordDisplay = document.getElementById('wordDisplay');
const attemptsDisplay = document.getElementById('attempts');
const letterInput = document.getElementById('letterInput');
const wordInput = document.getElementById('wordInput');
const guessButton = document.getElementById('guessButton');
const guessWordButton = document.getElementById('guessWordButton');
const hintButton = document.getElementById('hintButton');
const hintBox = document.getElementById('hintBox');
const hintText = document.getElementById('hintText');

function selectNewWord() {
    if (remainingWords.length === 0) {

        Swal.fire({
            title: 'Parabêns, nenémzinha ❤️!',
            html: `Você acertou todas as palavras!<br>Clique no botão abaixo para ir para o próximo jogo.`,
            icon: 'success',
            confirmButtonText: 'Proximo Jogo',
            confirmButtonColor: '#e67e22'
        }).then((result) => {
            document.addEventListener("click", () => {
                window.location.href = '../forca/parabensForca.html';
            })

            if(result.isConfirmed) {
                window.location.href = '../forca/parabensForca.html';
            }
        })
        return;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);

    selectedWord = remainingWords[randomIndex].word;
    selectedHint = remainingWords[randomIndex].hint;

    remainingWords.splice(randomIndex, 1);

    guessedLetters = [];
    attempts = 6;
    hintUsed = false;

    updateDisplay();
    updateHangmanDrawing();
    resetHintButton();
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    attemptsDisplay.textContent = `Tentativas restantes: ${attempts}`;

    if (!wordDisplay.textContent.includes('_')) {
        letterInput.value = "";
        wordInput.value = "";

        Swal.fire({
            title: 'Parabêns, meu amor ❤️!',
            html: `Você acertou a palavra <strong>"${selectedWord}"!</strong>.`,
            icon: 'success',
            confirmButtonText: 'Proxima Palavra',
            confirmButtonColor: '#e67e22'
        })
        selectNewWord();
    }
}

function updateHangmanDrawing() {
    const stages = [
        `
           -----
           |   |
               |
               |
               |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
               |
               |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
           |   |
               |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
          /|   |
               |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
          /|\\  |
               |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
          /|\\  |
          /    |
               |
        ----------
        `,
        `
           -----
           |   |
           O   |
          /|\\  |
          / \\  |
               |
        ----------
        `
    ];
    hangmanDrawing.textContent = stages[6 - attempts];
}

function resetGame() {
    selectNewWord();
}

function resetHintButton() {
    hintButton.textContent = 'DICA';
    hintButton.disabled = false;
    hintBox.classList.remove('visible');
    hintText.textContent = '';
}

// Função para tentar adivinhar uma letra
guessButton.addEventListener('click', function() {
    const letter = letterInput.value.toUpperCase();

    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (!selectedWord.includes(letter)) {
            attempts--;
        }

        updateDisplay();
        updateHangmanDrawing();

        if (attempts === 0) {
            Swal.fire({
                title: 'Ah, não 😞!',
                html: `Você perdeu. Tente novamente`,
                icon: 'error',
                confirmButtonText: 'Recomeçar',
                confirmButtonColor: '#e67e22'
            })
            resetGame();
        }
    }
    letterInput.value = '';
});

// Função para tentar adivinhar a palavra inteira
guessWordButton.addEventListener('click', function() {
    const guessedWord = wordInput.value.toUpperCase();

    if (guessedWord === selectedWord) {
        letterInput.value = "";
        wordInput.value = "";

        Swal.fire({
            title: 'Parabêns, meu amor ❤️!',
            html: `Você acertou a palavra <strong>"${selectedWord}"!</strong>.`,
            icon: 'success',
            confirmButtonText: 'Proxima Palavra',
            confirmButtonColor: '#e67e22'
        })
        selectNewWord();
    } else {
        attempts--;
        updateDisplay();
        updateHangmanDrawing();

        if (attempts === 0) {
            Swal.fire({
                title: 'Ah, não 😞!',
                html: `Você perdeu. Tente novamente`,
                icon: 'error',
                confirmButtonText: 'Recomeçar',
                confirmButtonColor: '#e67e22'
            })
            resetGame();
        } else {
            if(guessedWord === '') {
                attempts++;
                updateDisplay();
                updateHangmanDrawing();

                Swal.fire({
                    title: 'Ops!',
                    html: `Você precisa digitar uma palavra para tentar adivinhar.`,
                    icon: 'info',
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#e67e22'
                })
            } else {
                Swal.fire({
                    title: 'Ops!',
                    html: `Essa não é a palavra correta. Continue tentando!`,
                    icon: 'warning',
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#e67e22'
                })
            }

        }
    }
    wordInput.value = '';
});

// Função para exibir a dica
hintButton.addEventListener('click', function() {
    if (!hintUsed) {
        hintText.innerHTML = `<strong>Dica:</strong> ${selectedHint}`;
        hintBox.classList.add('visible');
        hintButton.textContent = 'Dica Usada';
        hintButton.disabled = true;
        hintUsed = true;
    }
});

selectNewWord();