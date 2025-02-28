import { questions } from './questions.js';
import { toggleSettings, onLanguageChange, activeLanguage } from './settings.js';
import { getInputState, resetInputState } from './input.js';

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

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 100,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});
