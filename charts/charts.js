await import('https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js');

import { getSavedEndedCombos, getSavedResponseTimes } from '../shared-js/save-manager.js';
import modes from '../game/js/questions/en/questions.js';

const initializeModeSelect = () => {
    const modeSelect = document.getElementById('mode-select');

    let isFirstElement = true;
    for (const [modeId, modeData] of Object.entries(modes)) {
        const option = document.createElement('option');
        option.value = modeId;
        option.textContent = modeData.name;

        if (isFirstElement) {
            option.selected = true;
            isFirstElement = false;
        }

        modeSelect.appendChild(option);
    }
};

const generateChart = (dataX, dataY, id, dataComment = null) => {
    const ctx = document.getElementById(id).getContext('2d');

    const config = {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: dataComment ? 'Ended Combos' : 'Response Times [ms]',
                data: dataY,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                    },
                    border: {
                        width: 2,
                        color: "#fff",
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                    },
                    border: {
                        width: 2,
                        color: "#fff",
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        afterLabel: dataComment ? function (context) {
                            return dataComment[context.dataIndex];
                        } : undefined
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
}

const prepareDataCombo = (mode) => {
    const data1 = getSavedEndedCombos(mode);
    const data1Y = data1.map(item => item[1]);
    const data1X = Array.from({ length: data1Y.length }, (_, i) => i + 1);
    const data1Comment = data1.map(item => {
        const date = new Date(item[0]);
        return new Intl.DateTimeFormat('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    });

    const oldChart = Chart.getChart("chart");
    if (oldChart)
        oldChart.destroy();

    generateChart(data1X, data1Y, "chart", data1Comment);
};

const prepareDataTimes = (mode) => {
    const data2Y = getSavedResponseTimes(mode);
    const data2X = Array.from({ length: data2Y.length }, (_, i) => i + 1);

    const oldChart = Chart.getChart("chart");
    if (oldChart)
        oldChart.destroy();

    generateChart(data2X, data2Y, "chart");
}

const updateChart = () => {
    const mode = document.getElementById('mode-select').value;
    const dataType = document.getElementById('data-type-select').value;

    if (dataType === 'combo') {
        prepareDataCombo(mode);
    } else if (dataType === 'time') {
        prepareDataTimes(mode);
    }
};

document.getElementById('data-type-select').addEventListener('change', updateChart);
document.getElementById('mode-select').addEventListener('change', updateChart);

initializeModeSelect();
prepareDataCombo(document.getElementById('mode-select').value);
