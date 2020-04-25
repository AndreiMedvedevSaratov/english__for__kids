// ----- Imports ----- //
import cards from './cards.js';

// ----- Burger menu ----- //
const HEADER__BURGER = document.getElementById('HEADER__BURGER');
const HEADER__MENU = document.getElementById('HEADER__MENU');

document.getElementById('HEADER__BURGER').onclick = function () {
    HEADER__BURGER.classList.toggle('active');
    HEADER__MENU.classList.toggle('active');
}

// ----- Work with Switcher ----- //
const CHECKBOX = document.getElementById('GAME_MODE');
const HEADER__MENU_MODE = document.getElementById('HEADER__MENU');

let Category_list = [];

for (let i = 0; i < 8; i++) {
    Category_list.push(document.getElementById(`CATEGORY_LIST_${i}`));
}

CHECKBOX.addEventListener('change', function () {
    if (this.checked) {
        for (let i = 0; i < 8; i++) {
            Category_list[i].classList.remove('play');
            Category_list[i].classList.add('train');
        }
        HEADER__MENU_MODE.classList.remove('play');
        HEADER__MENU_MODE.classList.add('train');
    } else {
        for (let i = 0; i < 8; i++) {
            Category_list[i].classList.remove('train');
            Category_list[i].classList.add('play');
        }
        HEADER__MENU_MODE.classList.remove('train');
        HEADER__MENU_MODE.classList.add('play');
    }
});

// ----- Work with Local Storage ----- //
// eslint-disable-next-line no-unused-vars
let First_Load = 1;

if (localStorage.First_Load !== null && localStorage.First_Load !== undefined) First_Load = localStorage.getItem(First_Load);
else {
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            cards[i][j].statistics = [0, 0, 0, 0];
            localStorage.setItem(cards[i][j].word, cards[i][j].statistics);
        }
    localStorage.setItem('First_Load', 0);
}
