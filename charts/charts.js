import('https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js');

import { getSavedEndedCombos, getSavedResponseTimes } from '../shared-js/save-manager.js';

const generateChart = (dataX, dataY, id, dataComment = null) => {
    const ctx = document.getElementById(id).getContext('2d');

    const config = {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: id.includes('ended-combos') ? 'Ended Combos' : 'Response Times [ms]',
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
                y: {
                    beginAtZero: true
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

const prepareData = (mode) => {
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

    const data2Y = getSavedResponseTimes(mode);
    const data2X = Array.from({ length: data2Y.length }, (_, i) => i + 1);

    const oldChart1 = Chart.getChart("ended-combos-chart");
    if (oldChart1) oldChart1.destroy();
    const oldChart2 = Chart.getChart("response-times-chart");
    if (oldChart2) oldChart2.destroy();

    generateChart(data1X, data1Y, "ended-combos-chart", data1Comment);
    generateChart(data2X, data2Y, "response-times-chart");
};

document.querySelectorAll(".btn-mode").forEach(button => {
    button.addEventListener("click", () => {
        const mode = button.getAttribute("data-mode");
        prepareData(mode);
    })
});