const mainEl = document.querySelector('main');
const inputEl = document.querySelector('#answer');

inputEl.addEventListener('blur', () => inputEl.focus());

const jsConfetti = new JSConfetti;
const errorSound = new Audio('../sounds/error-sound.mp3');
const correctSound = new Audio('../sounds/correct-sound.mp3');

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
        correctSound.play();
    } else {
        jsConfetti.addConfetti({
            emojis: ['❌', '🤣', '💀'],
            confettiNumber: 10,
        })
        errorSound.play();
    }
};

export const getInputState = () => {
    return inputEl.value;
};
