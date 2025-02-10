const topLeft = document.querySelector('.top-left-quarter');
const topRight = document.querySelector('.top-right-quarter');
const bottomLeft = document.querySelector('.bottom-left-quarter');
const bottomRight = document.querySelector('.bottom-right-quarter');
const startButton = document.querySelector('.start-button');

const getRandomQuarter = () => {
    const quarters = [topLeft, topRight, bottomLeft, bottomRight];
    return quarters[parseInt(Math.random() * quarters.length)];
}

const sequences = [getRandomQuarter()];
let sequenceToGuess = [...sequences];

const flash = (quarter) => {
    return new Promise((resolve) => {
        quarter.className += ' active';
        setTimeout(() => {
            quarter.className = quarter.className.replace(' active', '');
            
            setTimeout(() => {
                resolve();
            }, 250);

            resolve();
        }, 750);
    });
}

let canClick = false;

const quarterCLicked = (quarter) => {
    if (!canClick) return;
    console.log(quarter);
    const expectedQuarter = sequenceToGuess.shift();
    if(expectedQuarter === quarterCLicked){
        if(sequenceToGuess.length === 0){
            sequences.push(getRandomQuarter());
            sequenceToGuess = [...sequences];
            main();
        }
    }
    else{
        alert('Game Over!');
        startButton.style.display = 'block';
        sequences.length = 1;
        sequenceToGuess = [...sequences];
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
    main();
}

startButton.addEventListener('click', startGame);

