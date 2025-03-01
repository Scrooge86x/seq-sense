import monthsToNumbers from './months-to-numbers.js';
import previousLetter from './previous-letter.js';

export default {
    monthsToNumbers: {
        name: 'Miesiąc na liczbę',
        translatable: true,
        questions: monthsToNumbers,
    },
    previousLetter: {
        name: 'Poprzednia litera',
        translatable: false,
        questions: previousLetter,
    },
};
