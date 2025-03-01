// TODO: Just refactor this entangled shit

import { questions } from './questions/questions.js';

const settingsEl = document.querySelector('#settings');
const getCurrentHeight = () => `${settingsEl.getBoundingClientRect().height}px`;

let languageChangeCallback = () => { };
export const onLanguageChange = callback => {
    languageChangeCallback = callback;
};

const languageButtons = {};
const modeButtons = {};

export let activeLanguage = 'English';
export let activeMode = 'monthsToNumbers';

const languageSettingsEl = document.querySelector('#settings-languages');
for (const language in questions) {
    const button = document.createElement('button');
    button.innerText = language;
    button.addEventListener('click', () => setActiveLanguage(language));
    languageSettingsEl.appendChild(button);
    languageButtons[language] = button;
}

const setActiveLanguage = language => {
    if (!(language in languageButtons))
        return;

    const oldButton = languageButtons[activeLanguage];
    oldButton.removeAttribute('style');

    const newButton = languageButtons[language];
    newButton.style.borderColor = '#7fff00';

    activeLanguage = language;
    for (const button in modeButtons) {
        modeButtons[button].innerText = questions[activeLanguage][activeMode].name;
    }
    languageChangeCallback();
};
setActiveLanguage('English');

let modeChangeCallback = () => { };
export const onModeChange = callback => {
    modeChangeCallback = callback;
};

const modeSettingsEl = document.querySelector('#settings-modes');
for (const mode in questions[activeLanguage]) {
    const button = document.createElement('button');
    button.innerText = questions[activeLanguage][mode].name;
    button.addEventListener('click', () => setActiveMode(mode));
    modeSettingsEl.appendChild(button);
    modeButtons[mode] = button;
}

const setActiveMode = mode => {
    if (!(mode in modeButtons))
        return;

    const oldButton = modeButtons[activeMode];
    oldButton.removeAttribute('style');

    const newButton = modeButtons[mode];
    newButton.style.borderColor = '#7fff00';

    activeMode = mode;
    modeChangeCallback();
};
setActiveMode('monthsToNumbers');

let visible = true;
const fullHeight = getCurrentHeight();
export const toggleSettings = async () => {
    const startHeight = getCurrentHeight();
    const endHeight = visible ? '0px' : fullHeight;

    settingsEl.animate(
        [
            { maxHeight: startHeight },
            { maxHeight: endHeight },
        ],
        {
            duration: 200,
        },
    );

    settingsEl.style.maxHeight = endHeight;
    visible = !visible;
};
