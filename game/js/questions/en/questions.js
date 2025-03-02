import monthsToNumbers from './months-to-numbers.js';
import previousLetter from './previous-letter.js';
import monthLengths from './month-lengths.js';

export default {
    monthsToNumbers: {
        name: 'Month to number',
        translatable: true,
        questions: monthsToNumbers,
    },
    previousLetter: {
        name: 'Previous letter',
        translatable: false,
        questions: previousLetter,
    },
    monthLengths: {
        name: 'Month lengths',
        translatable: true,
        questions: monthLengths,
    },
};
