const topLeft = document.querySelector('.top-left-quarter');
const topRight = document.querySelector('.top-right-quarter');
const bottomLeft = document.querySelector('.bottom-left-quarter');
const bottomRight = document.querySelector('.bottom-right-quarter');
const startButton = document.querySelector('#start-button');
const scoreDisplay = document.querySelector('#score');
const gameOverMessage = document.querySelector("#game-over-message");
const finalScore = document.querySelector("#final-score");

let score = 0;

const getRandomQuarter = () => {
    const quarters = [topLeft, topRight, bottomLeft, bottomRight];
    return quarters[Math.floor(Math.random() * quarters.length)];
}

const sequences = [getRandomQuarter()];
let sequenceToGuess = [...sequences];

const flash = async (quarter) => {
    quarter.classList.add('active');
    await new Promise((resolve => setTimeout(resolve,500)));
    quarter.classList.remove('active');
    await new Promise((resolve => setTimeout(resolve,250)));
}

let canClick = false;

const quarterCLicked = (quarter) => {
    if (!canClick) return;
    const expectedQuarter = sequenceToGuess.shift();
    if(expectedQuarter === quarter){
        if(sequenceToGuess.length === 0){
            score++;
            scoreDisplay.textContent = `puntuacion: ${score}`;
            sequences.push(getRandomQuarter());
            sequenceToGuess = [...sequences];
            canClick = false;
            setTimeout(() => {
                main();
            }, 1000);

        }
    }
    else{
        finalScore.textContent = score;
        gameOverMessage.classList.remove("hidden");
        startButton.style.display = 'block';
        sequences.length = 1;
        sequenceToGuess = [...sequences];
        score = 0;
        scoreDisplay.textContent = `Puntuacion: ${score}`;

        setTimeout(() => {
            gameOverMessage.classList.add("hidden");
        }, 2000);
    }
}

const main = async () => {
    for (let quarter of sequences) {
        await flash(quarter);
    }
    canClick = true;
};

topLeft.addEventListener('click', () => quarterCLicked(topLeft));
topRight.addEventListener('click', () => quarterCLicked(topRight));
bottomLeft.addEventListener('click', () => quarterCLicked(bottomLeft));
bottomRight.addEventListener('click', () => quarterCLicked(bottomRight));


const startGame = () => {
    sequences.length = 0;
    sequenceToGuess = [];
    sequences.push(getRandomQuarter());
    sequenceToGuess = [...sequences];
    canClick = false;
    startButton.style.display = 'none';
    gameOverMessage.classList.add("hidden");
    main();
}

startButton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    gameOverMessage,classList.add("hidden");
});