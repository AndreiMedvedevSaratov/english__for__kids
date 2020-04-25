// ----- Imports ----- //
import cards from './cards.js';

let difficult_words = [];
let temp_array = [];

// ----- Burger menu ----- //
const HEADER__BURGER = document.getElementById('HEADER__BURGER');
const HEADER__MENU = document.getElementById('HEADER__MENU');

document.getElementById('HEADER__BURGER').onclick = function () {
    HEADER__BURGER.classList.toggle('active');
    HEADER__MENU.classList.toggle('active');
}

// ----- Work with Statistics ----- //
Draw_Statistic();

function Draw_Statistic() {
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            cards[i][j].statistics = localStorage.getItem(cards[i][j].word, cards[i][j].statistics).split(',');
            cards[i][j].statistics[3] = (Number(cards[i][j].statistics[2]) / (Number(cards[i][j].statistics[1]) + Number(cards[i][j].statistics[2]))) * 100;
            if (isNaN(cards[i][j].statistics[3])) cards[i][j].statistics[3] = 0;

            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[0].innerHTML = cards[i][j].category_name;
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[1].innerHTML = cards[i][j].word;
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[2].innerHTML = cards[i][j].translation;
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[3].innerHTML = cards[i][j].statistics[0];
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[4].innerHTML = cards[i][j].statistics[1];
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[5].innerHTML = cards[i][j].statistics[2];
            document.getElementById('table_sort').rows[8 * i + (j + 1)].cells[6].innerHTML = cards[i][j].statistics[3].toFixed(0);
        }
}

// ----- Reset Statistics ----- //
const RESET_STATISTICS = document.getElementById('RESET_STATISTICS');

RESET_STATISTICS.addEventListener('click', () => {
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            cards[i][j].statistics = [0, 0, 0, 0];
            localStorage.setItem(cards[i][j].word, cards[i][j].statistics);
        }
    Draw_Statistic();
});

// ----- Sorting Statistics ----- //
// It is not my script, but it is working ))))))))))
document.addEventListener('DOMContentLoaded', () => {
    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));
        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
});

// ----- Transfer to page for Repeat difficult words ----- //
const REPEAT_DIFFICULT_WORDS = document.getElementById('REPEAT_DIFFICULT_WORDS');

REPEAT_DIFFICULT_WORDS.addEventListener('click', () => {
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            temp_array.push({ stat: Number(cards[i][j].statistics[3]), id: (cards[i][j].id) });
        }

    temp_array.sort((a, b) => b.stat - a.stat);

    difficult_words = [];
    for (let i = 0; i < 8; i++) {
        if (temp_array[i].stat > 0) difficult_words.push(temp_array[i]);
    }

    window.localStorage.setItem('difficult_words', JSON.stringify(difficult_words));

    window.location.href = 'repeat_difficult_words.html';
});

