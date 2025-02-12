const topLeft = document.querySelector('.top-left-quarter');
const topRight = document.querySelector('.top-right-quarter');
const bottomLeft = document.querySelector('.bottom-left-quarter');
const bottomRight = document.querySelector('.bottom-right-quarter');
const startButton = document.querySelector('#start-button');
const scoreDisplay = document.querySelector('#score');
const gameOverMessage = document.querySelector("#game-over-message");
const finalScore = document.querySelector("#final-score");
const highScoresList = document.querySelector("#high-scores");
const scoreboard = document.querySelector("#scoreboard");

const sounds = {
    topLeft: new Audio('Audio/huh-cat-meme.mp3'),
    topRight: new Audio('Audio/pum.mp3'),
    bottomLeft: new Audio('Audio/pummm.mp3'),
    bottomRight: new Audio('Audio/short-augh.mp3'),
    gameOver: new Audio('Audio/undertale-soul-shatter.mp3')
};

let score = 0;

const getRandomQuarter = () => {
    const quarters = [topLeft, topRight, bottomLeft, bottomRight];
    return quarters[Math.floor(Math.random() * quarters.length)];
}

const sequences = [getRandomQuarter()];
let sequenceToGuess = [...sequences];

const flash = async (quarter) => {
    quarter.classList.add('active');

    playsound(quarter);
    await new Promise((resolve => setTimeout(resolve,500)));
    quarter.classList.remove('active');
    await new Promise((resolve => setTimeout(resolve,250)));
}

const playsound = (quarter) => {
    switch(quarter){
        case topLeft:
            sounds.topLeft.play();
            break;
        case topRight:
            sounds.topRight.play();
            break;
        case bottomLeft:
            sounds.bottomLeft.play();
            break;
        case bottomRight:
            sounds.bottomRight.play();
            break;
    };
};

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
        sounds.gameOver.play();
        startButton.style.display = 'block';
        saveScore(score);
        sequences.length = 1;
        sequenceToGuess = [...sequences];
        score = 0;
        scoreDisplay.textContent = `Puntuacion: ${score}`;

        setTimeout(() => {
            gameOverMessage.classList.add("hidden");
        }, 2000);
        showScoreboard();
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
    score=0;
    sequences.push(getRandomQuarter());
    sequenceToGuess = [...sequences];
    canClick = false;
    startButton.style.display = 'none';
    gameOverMessage.classList.add("hidden");
    main();
}

startButton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    gameOverMessage.classList.add("hidden");
});

const saveScore = (score) => {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

const showScoreboard = () => {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.getElementById('high-scores');
    highScoresList.innerHTML = '';
    if (highScores.length === 0) {
        highScores = [0, 0, 0, 0, 0];
    } else {
        highScores = highScores.slice(0, 5);
    }
    
    highScoresList.innerHTML = highScores.map(score => `<li>${score}</li>`).join('');
    scoreboard.classList.remove('hidden');
    setTimeout(() => {
        scoreboard.classList.add("hidden");
    }, 8000);
};