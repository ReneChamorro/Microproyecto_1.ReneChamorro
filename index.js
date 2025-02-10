document.addEventListener('DOMContentLoaded', () => {
    const quarters = document.querySelectorAll('.quarter');
    let sequence = [];
    let userSequence = [];
    let score = 0;

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    function startGame() {
        sequence = [];
        userSequence = [];
        score = 0;
        updateScore();
        nextRound();
    }

    function nextRound() {
        userSequence = [];
        sequence.push(getRandomQuarter());
        playSequence();
    }

    function playSequence() {
        sequence.forEach((quarter, index) => {
            setTimeout(() => {
                quarter.classList.add('active');
                setTimeout(() => quarter.classList.remove('active'), 500);
            }, index * 1000);
        });
    }

    function getRandomQuarter() {
        const quartersArray = Array.from(quarters);
        return quartersArray[Math.floor(Math.random() * quartersArray.length)];
    }

    quarters.forEach(quarter => {
        quarter.addEventListener('click', () => {
            userSequence.push(quarter);
            if (!checkSequence()) {
                alert('Juego Terminado');
                return;
            }
            if (userSequence.length === sequence.length) {
                score++;
                updateScore();
                nextRound();
            }
        });
    });

    function checkSequence() {
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== sequence[i]) return false;
        }
        return true;
    }

    function updateScore() {
        document.getElementById('score').textContent = `Puntuación: ${score}`;
    }
});
