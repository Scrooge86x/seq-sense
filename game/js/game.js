import { questions } from './questions/questions.js';
import { toggleSettings, onLanguageChange, onModeChange, activeMode, activeLanguage } from './settings.js';
import { getInputState, resetInputState } from './input.js';
import particlesJsConfig from "./particles-js-config.json" with { type: "json" };

const getActiveModeData = () => questions[activeLanguage][activeMode];
document.querySelector('#current-mode').innerText = getActiveModeData().name;

let lastRandomIndex = -1;
const getRandomIndex = () => {
    const maxIndex = getActiveModeData().questions.length;
    let randomIndex = Math.floor(Math.random() * maxIndex);
    if (lastRandomIndex == randomIndex) {
        randomIndex = (randomIndex + 1) % maxIndex;
    }
    lastRandomIndex = randomIndex;
    return randomIndex;
};

let currentQuestion = null;
const setNewQuestion = index => {
    const questionList = getActiveModeData().questions;
    currentQuestion = { index, ...questionList[index] };

    const questionEl = document.querySelector('#question');
    questionEl.innerText = currentQuestion.question;
};
setNewQuestion(getRandomIndex());

onLanguageChange(() => {
    if (getActiveModeData().translatable) {
        setNewQuestion(currentQuestion.index);
    } else {
        setNewQuestion(getRandomIndex());
    }
    document.querySelector('#current-mode').innerText = getActiveModeData().name;
});

onModeChange(() => {
    setNewQuestion(getRandomIndex());
    document.querySelector('#current-mode').innerText = getActiveModeData().name;
});

document.addEventListener('keydown', e => {
    if (e.repeat)
        return;

    switch (e.key) {
        case 'Enter':
            if (currentQuestion.answers.includes(getInputState())) {
                resetInputState(true);
                setNewQuestion(getRandomIndex());
            } else {
                resetInputState(false);
            }
            break;
        case 'Escape':
            toggleSettings();
            break;
    }
});

particlesJS('particles-js', particlesJsConfig);
