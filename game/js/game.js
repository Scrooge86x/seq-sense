import { questions } from './questions/questions.js';
import { toggleSettings, onLanguageChange, onModeChange, activeMode, activeLanguage } from './settings.js';
import { getInputState, resetInputState } from './input.js';
import particlesJsConfig from './particles-js-config.json' with { type: 'json' };

const getActiveModeData = () => questions[activeLanguage][activeMode];
const updateModeGuiName = () => document.querySelector('#current-mode').innerText = getActiveModeData().name;

let g_lastRandomIndex = -1;
const getRandomIndex = () => {
    const maxIndex = getActiveModeData().questions.length;
    let randomIndex = Math.floor(Math.random() * maxIndex);
    if (g_lastRandomIndex == randomIndex) {
        randomIndex = (randomIndex + 1) % maxIndex;
    }
    g_lastRandomIndex = randomIndex;
    return randomIndex;
};

let g_currentQuestion = null;
const setNewQuestion = (index = getRandomIndex()) => {
    const questionList = getActiveModeData().questions;
    g_currentQuestion = { index, ...questionList[index] };
    document.querySelector('#question').innerText = g_currentQuestion.question;
};

document.addEventListener('keydown', e => {
    if (e.repeat)
        return;

    switch (e.key) {
        case 'Enter':
            if (g_currentQuestion.answers.includes(getInputState())) {
                resetInputState(true);
                setNewQuestion();
            } else if (getInputState().length) {
                resetInputState(false);
            }
            break;
        case 'Escape':
            toggleSettings();
            break;
    }
});

onLanguageChange(() => {
    if (getActiveModeData().translatable) {
        setNewQuestion(g_currentQuestion.index);
    } else {
        setNewQuestion();
    }
    updateModeGuiName();
});

onModeChange(() => {
    setNewQuestion();
    updateModeGuiName()
});

updateModeGuiName();
setNewQuestion();

particlesJS('particles-js', particlesJsConfig);
