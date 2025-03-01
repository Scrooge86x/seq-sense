import { questions } from './questions.js';
import { toggleSettings, onLanguageChange, activeLanguage } from './settings.js';
import { getInputState, resetInputState } from './input.js';
import particlesJsConfig from "./particles-js-config.json" with { type: "json" };

let TODO_activeMode = 'monthsToNumbers';
document.querySelector('#current-mode').innerText = questions[activeLanguage][TODO_activeMode].name;

let lastRandomIndex = -1;
const getRandomIndex = () => {
    const maxIndex = questions[activeLanguage][TODO_activeMode].questions.length;
    let randomIndex = Math.floor(Math.random() * maxIndex);
    if (lastRandomIndex == randomIndex) {
        randomIndex = (randomIndex + 1) % maxIndex;
    }
    lastRandomIndex = randomIndex;
    return randomIndex;
};

let currentQuestion = null;
const setNewQuestion = index => {
    const questionList = questions[activeLanguage][TODO_activeMode].questions;
    currentQuestion = { index, ...questionList[index] };

    const questionEl = document.querySelector('#question');
    questionEl.innerText = currentQuestion.question;
};
setNewQuestion(getRandomIndex());

onLanguageChange(() => {
    setNewQuestion(currentQuestion.index);
    document.querySelector('#current-mode').innerText = questions[activeLanguage][TODO_activeMode].name;
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
