const currentComboEl = document.querySelector('#current-combo');

let g_currentCombo = 0;
export const getCurrentCombo = () => g_currentCombo;

export const setCurrentCombo = (combo) => {
    g_currentCombo = combo;
    const isComboVisible = g_currentCombo > 1;

    currentComboEl.style.color = '#ddd';
    currentComboEl.innerText = `${g_currentCombo}x`;
    currentComboEl.animate([
        { transform: 'translateX(-50%)', opacity: isComboVisible ? 0 : 1 },
        { transform: 'translateX(-50%)', opacity: isComboVisible ? 1 : 0 },
    ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
};

export const incrementCombo = () => {
    if (++g_currentCombo < 2)
        return;

    currentComboEl.style.color = '#ddd';
    currentComboEl.innerText = `${g_currentCombo}x`;

    currentComboEl.animate([
        { transform: 'translateX(-50%) scale(1)' },
        { transform: 'translateX(-50%) scale(1.5)', color: '#7fff00' },
        { transform: 'translateX(-50%) scale(1)', opacity: 1 },
    ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
};

export const resetCombo = () => {
    if (g_currentCombo < 2) {
        g_currentCombo = 0;
        return;
    }
    g_currentCombo = 0;

    currentComboEl.animate([
        { opacity: 1, transform: 'translate(-50%, 0)', color: '#d00' },
        { transform: 'translate(calc(-50% - 15px), 0)' },
        { transform: 'translate(calc(-50% + 15px), 0)' },
        { transform: 'translate(-50%, 0)', color: '#d00' },
        { opacity: 0, transform: 'translate(-50%, 50px)' },
    ], { duration: 800, easing: 'ease-in-out', fill: 'forwards' });
};
