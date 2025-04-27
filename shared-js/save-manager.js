export const saveCurrentCombo = (modeName, combo) => {
    const currentCombos = JSON.parse(localStorage.getItem('currentCombos')) ?? {};
    currentCombos[modeName] = combo;
    localStorage.setItem('currentCombos', JSON.stringify(currentCombos));
};

export const getSavedCurrentCombo = (modeName) => {
    const currentCombos = JSON.parse(localStorage.getItem('currentCombos')) ?? {};
    return currentCombos[modeName] ?? 0;
};


export const saveEndedCombo = (modeName, combo) => {
    const endedCombos = JSON.parse(localStorage.getItem('endedCombos')) ?? {};
    if (!(modeName in endedCombos)) {
        endedCombos[modeName] = [];
    }

    endedCombos[modeName].push([Date.now(), combo]);
    localStorage.setItem('endedCombos', JSON.stringify(endedCombos));
};

export const getSavedEndedCombos = (modeName) => {
    const endedCombos = JSON.parse(localStorage.getItem('endedCombos')) ?? {};
    return endedCombos[modeName] ?? [];
};


export const saveResponseTime = (modeName, time) => {
    const responseTimes = JSON.parse(localStorage.getItem('responseTimes')) ?? {};
    if (!(modeName in responseTimes)) {
        responseTimes[modeName] = [];
    }

    responseTimes[modeName].push(time);
    localStorage.setItem('responseTimes', JSON.stringify(responseTimes));
};

export const getSavedResponseTimes = (modeName) => {
    const responseTimes = JSON.parse(localStorage.getItem('responseTimes')) ?? {};
    return responseTimes[modeName] ?? [];
};
