import { questions } from './questions/questions.js';

let g_activeLanguage = 'Polish';
export const getActiveLanguage = () => g_activeLanguage;

let g_activeMode = 'monthsToNumbers';
export const getActiveMode = () => g_activeMode;

let languageChangeCallback = () => { };
export const onLanguageChange = callback => {
    languageChangeCallback = callback;
};

let modeChangeCallback = () => { };
export const onModeChange = callback => {
    modeChangeCallback = callback;
};

// Mode buttons must be global so setActiveLanguage can translate them.
const g_modeButtons = {};
const initModeButtons = () => {
    const setActiveMode = mode => {
        if (!(mode in g_modeButtons))
            return;

        const oldButton = g_modeButtons[g_activeMode];
        oldButton.removeAttribute('style');

        const newButton = g_modeButtons[mode];
        newButton.style.borderColor = '#7fff00';

        g_activeMode = mode;
        modeChangeCallback();
    };

    const modeSettingsEl = document.querySelector('#settings-modes');
    for (const mode in questions[g_activeLanguage]) {
        const button = document.createElement('button');
        button.innerText = questions[g_activeLanguage][mode].name;
        button.addEventListener('click', () => setActiveMode(mode));
        modeSettingsEl.appendChild(button);
        g_modeButtons[mode] = button;
    }
    setActiveMode(g_activeMode);
};

const initLanguageButtons = () => {
    const languageButtons = {};
    const setActiveLanguage = language => {
        if (!(language in languageButtons))
            return;

        const oldButton = languageButtons[g_activeLanguage];
        oldButton.removeAttribute('style');

        g_activeLanguage = language;
        const newButton = languageButtons[g_activeLanguage];
        newButton.style.borderColor = '#7fff00';

        for (const button in g_modeButtons) {
            g_modeButtons[button].innerText = questions[g_activeLanguage][button].name;
        }
        languageChangeCallback();
    };

    const languageSettingsEl = document.querySelector('#settings-languages');
    for (const language in questions) {
        const button = document.createElement('button');
        button.innerText = language;
        button.addEventListener('click', () => setActiveLanguage(language));
        languageSettingsEl.appendChild(button);
        languageButtons[language] = button;
    }
    setActiveLanguage(g_activeLanguage);
};

initModeButtons();
initLanguageButtons();

const settingsEl = document.querySelector('#settings');
const getCurrentHeightPx = () => `${settingsEl.getBoundingClientRect().height}px`;
const initialHeight = getCurrentHeightPx();

let visible = true;
export const toggleSettings = () => {
    const startHeight = getCurrentHeightPx();
    const endHeight = visible ? '0px' : initialHeight;

    settingsEl.animate([
        { maxHeight: startHeight },
        { maxHeight: endHeight },
    ], {
        duration: 200,
    });

    settingsEl.style.maxHeight = endHeight;
    visible = !visible;
};
