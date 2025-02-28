const questions = [
    {
        question: "Qual a data da nossa primeira chamada?",
        options: ["12/12/2024", "14/12/2024", "13/12/2024", "11/12/2024"],
        correctAnswer: "13/12/2024"
    },
    // {
    //     question: "Qual é minha cor favorita?",
    //     options: ["Azul", "Preto", "Branco", "Vermelho"],
    //     correctAnswer: "Preto"
    // },
    // {
    //     question: "Qual é meu endereço?",
    //     options: ["Rua Rogério de Carvalho Santos, 670", "Rua Ronaldo de Carvalho Santos, 670", "Rua Roger de Andrade Santos, 660", "Rua Rogério de Andrade Santos, 670"],
    //     correctAnswer: "Rua Rogério de Andrade Santos, 670"
    // },
    // {
    //     question: "Qual é minha comida favorita?",
    //     options: ["Pizza", "Lasanha", "Strogonoff", "Baião de Dois"],
    //     correctAnswer: "Pizza"
    // },
    // {
    //     question: "Qual é o nome dos meus pais?",
    //     options: ["Consolação e Eliomar", "Consola e Elismar", "Consolação e Elismar", "Consola e Edimar"],
    //     correctAnswer: "Consola e Elismar"
    // },
    // {
    //     question: "Em qual cidade eu nasci?",
    //     options: ["Arujá", "São Paulo", "Mogi das Cruzes", "Santa Isabel"],
    //     correctAnswer: "Santa Isabel"
    // },
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const optionButtons = document.querySelectorAll('.option');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        optionButtons[index].textContent = option;
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            Swal.fire({
                title: 'Parabêns, meu amor ❤️!',
                text: 'Resposta correta.',
                icon: 'success',
                confirmButtonText: 'Proxima Pergunta',
                confirmButtonColor: '#e67e22'
            })
            loadQuestion();
        } else {
            Swal.fire({
                title: 'Parabêns, nenémzinha ❤️!',
                html: 'Você acertou todas as perguntas!.<br>Clique no botão abaixo para ir para o próximo jogo.',
                icon: 'success',
                confirmButtonText: 'Proximo Jogo',
                confirmButtonColor: '#e67e22'
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.href = '.html';
                }
            })
        }
    } else {
        Swal.fire({
            title: 'Ops!!!',
            text: 'Resposta incorreta. O jogo vai reiniciar...',
            icon: 'error',
            confirmButtonText: 'Reiniciar Jogo',
            confirmButtonColor: '#e67e22'
        })
        currentQuestionIndex = 0;
        loadQuestion();
    }
}

optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        checkAnswer(this.textContent);
    });
});

loadQuestion();