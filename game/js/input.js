const mainEl = document.querySelector('main');
const inputEl = document.querySelector('#answer');

inputEl.addEventListener('blur', () => inputEl.focus());

const jsConfetti = new window.JSConfetti;
const errorSound = new Audio('/game/sounds/error-sound.mp3');
const correctSound = new Audio('/game/sounds/correct-sound.mp3');

export const resetInputState = wasCorrect => {
    inputEl.value = '';
    mainEl.animate(
        [
            { borderColor: wasCorrect ? '#7fff00' : '#d00' },
            { borderColor: '#fff' },
        ],
        {
            duration: 400,
        },
    );

    if (wasCorrect) {
        jsConfetti.addConfetti({
            confettiNumber: 100,
        });
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        jsConfetti.addConfetti({
            emojis: ['❌', '🤣', '💀'],
            confettiNumber: 10,
        })
        errorSound.currentTime = 0;
        errorSound.play();
    }
};

export const getInputState = () => {
    return inputEl.value;
};
