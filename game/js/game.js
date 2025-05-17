import { questions } from './questions/questions.js';
import { toggleSettings, onLanguageChange, onModeChange, getActiveMode, getActiveLanguage } from './settings.js';
import { getInputState, resetInputState } from './input.js';
import { getCurrentCombo, incrementCombo, resetCombo, setCurrentCombo } from './combo.js';
import { getSavedCurrentCombo, saveCurrentCombo, saveEndedCombo, saveResponseTime } from '../../shared-js/save-manager.js';

import particlesJsConfig from './particles-js-config.json' with { type: 'json' };

const getActiveModeData = () => questions[getActiveLanguage()][getActiveMode()];
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

let g_responseTimer = null;
document.addEventListener('keydown', e => {
    if (e.repeat)
        return;

    switch (e.key) {
        case 'Enter':
            if (!getInputState().length)
                break;

            const timeNow = Date.now();
            if (g_responseTimer === null) {
                g_responseTimer = timeNow;
            } else {
                saveResponseTime(getActiveMode(), timeNow - g_responseTimer);
                g_responseTimer = timeNow;
            }

            if (g_currentQuestion.answers.includes(getInputState())) {
                resetInputState(true);
                incrementCombo();
                saveCurrentCombo(getActiveMode(), getCurrentCombo());
                setNewQuestion();
            } else {
                resetInputState(false);
                saveEndedCombo(getActiveMode(), getCurrentCombo());
                saveCurrentCombo(getActiveMode(), 0);
                resetCombo();
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
    g_responseTimer = null;
    setCurrentCombo(getSavedCurrentCombo(getActiveMode()));
    setNewQuestion();
    updateModeGuiName();
});

updateModeGuiName();
setCurrentCombo(getSavedCurrentCombo(getActiveMode()));
setNewQuestion();

particlesJS('particles-js', particlesJsConfig);
