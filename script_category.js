// ----- Imports ----- //
import cards from './cards.js';

// ----- Variables ----- //
let Mode = 'train';
let cur_page;
let Start_game = false;
let Random_Array = [0, 1, 2, 3, 4, 5, 6, 7];
let Results = [];
let sound = '';

const current_Page = {
    'index': -1,
    'action_set_a': 0,
    'action_set_b': 1,
    'animal_set_a': 2,
    'animal_set_b': 3,
    'clothes': 4,
    'emotions': 5,
    'colors': 6,
    'furniture': 7,
    'statistics': 1000
}

function getPage(pageName) {
    return current_Page[pageName];
}

// ----- Burger menu ----- //
const HEADER__BURGER = document.getElementById('HEADER__BURGER');
const HEADER__MENU = document.getElementById('HEADER__MENU');

document.getElementById('HEADER__BURGER').onclick = function () {
    HEADER__BURGER.classList.toggle('active');
    HEADER__MENU.classList.toggle('active');
}

// ----- Work with Switcher ----- //
const CHECKBOX = document.getElementById('GAME_MODE');

var HEADER__MENU_MODE = document.getElementById('HEADER__MENU');

CHECKBOX.addEventListener('change', function () {
    if (this.checked) {
        HEADER__MENU_MODE.classList.remove('play');
        HEADER__MENU_MODE.classList.add('train');
        localStorage.setItem('Mode', 'train');
        Mode = 'train';
    } else {
        HEADER__MENU_MODE.classList.remove('train');
        HEADER__MENU_MODE.classList.add('play');
        localStorage.setItem('Mode', 'play');
        Mode = 'play';
    }
});

// ----- Creating cards in container for each page ----- //
cur_page = document.getElementById('PAGE_ID').className;
var temp_page = -1;
temp_page = getPage(cur_page);

var Container_2 = document.getElementById('CONTAINER_2');

if (temp_page != -1 && temp_page != 1000) {
    for (let i = 0; i < 8; i++) {
        const CARD_CONTAINER = document.createElement('div');
        CARD_CONTAINER.classList.add('card_container');
        Container_2.append(CARD_CONTAINER);

        const CARD = document.createElement('div');
        CARD.classList.add('card');
        CARD_CONTAINER.append(CARD);

        const FRONT = document.createElement('div');
        FRONT.classList.add('front');
        FRONT.style.cssText = `background-image: url(${cards[temp_page][i].image});`;
        FRONT.id = cards[temp_page][i].audioSrc;
        CARD.append(FRONT);

        const CARD_HEADER = document.createElement('div');
        CARD_HEADER.classList.add('card_header');
        CARD_HEADER.innerHTML = cards[temp_page][i].word;
        FRONT.append(CARD_HEADER);

        const BACK = document.createElement('div');
        BACK.classList.add('back');
        BACK.style.cssText = `background-image: url(${cards[temp_page][i].image});`;
        CARD.append(BACK);

        const CARD_HEADER_1 = document.createElement('div');
        CARD_HEADER_1.classList.add('card_header');
        CARD_HEADER_1.innerHTML = cards[temp_page][i].translation;
        BACK.append(CARD_HEADER_1);

        const ROTATE = document.createElement('div');
        ROTATE.classList.add('rotate');
        CARD.append(ROTATE);
    }
}

// ----- Work with Audio ----- //
const CARD_AUDIO = document.getElementById('CONTAINER_2');

CARD_AUDIO.addEventListener('mousedown', event => {
    if (event.target.classList.contains('front') && Mode == 'train') {
        playSound(event.target.id, event.target.id, event.target.id);
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 8; j++) {
                if (cards[i][j].audioSrc == event.target.id) {
                    cards[i][j].statistics = localStorage.getItem(cards[i][j].word, cards[i][j].statistics).split(',');
                    cards[i][j].statistics[0] = Number(cards[i][j].statistics[0]) + 1;
                    localStorage.setItem(cards[i][j].word, cards[i][j].statistics);
                }
            }
    }
});

// ----- Making cards to rotate ----- //
const ROTATE = document.getElementById('CONTAINER_2');

ROTATE.addEventListener('click', event => {
    if (event.target.classList.contains('rotate'))
        event.target.parentNode.classList.add('translate');
});

ROTATE.addEventListener('mouseout', event => {
    if (event.target.classList.contains('back'))
        event.target.parentNode.classList.remove('translate');
});

// ----- Working with cards in Train / Play modes ----- //
const CONTAINER = document.getElementById('CONTAINER_2');
const CONTENT_WRAPPER = document.getElementById('CONTENT');

CHECKBOX.addEventListener('change', function () {
    if (temp_page != -1 && temp_page != 1000) {
        if (this.checked) {
            for (let i = 1; i < 9; i++) {
                CONTAINER.children[i].children[0].classList.remove('card_cover');
                CONTAINER.children[i].children[0].children[0].children[0].classList.remove('none');
                CONTAINER.children[i].children[0].children[1].children[0].classList.remove('none');
                CONTAINER.children[i].children[0].children[2].classList.remove('none');
                CONTENT_WRAPPER.children[0].children[0].classList.add('none');
                CONTENT_WRAPPER.children[1].children[0].classList.add('none');
                Clear_After_Game();
            }
        } else {
            for (let i = 1; i < 9; i++) {
                CONTAINER.children[i].children[0].classList.add('card_cover');
                CONTAINER.children[i].children[0].children[0].children[0].classList.add('none');
                CONTAINER.children[i].children[0].children[1].children[0].classList.add('none');
                CONTAINER.children[i].children[0].children[2].classList.add('none');
                CONTENT_WRAPPER.children[0].children[0].classList.remove('none');
                CONTENT_WRAPPER.children[1].children[0].classList.remove('none');

                BUTTON_START_GAME.value = 'start_game';
                BUTTON_START_GAME.textContent = 'Start Game';
                Start_game = false;
            }
        }
    }
});

// ----- Game mode ----- //

const BUTTON_START_GAME = document.getElementById('START_GAME');

BUTTON_START_GAME.addEventListener('click', () => {
    if (BUTTON_START_GAME.value == 'start_game') {
        BUTTON_START_GAME.value = 'repeat';
        BUTTON_START_GAME.textContent = 'Repeat';
        BUTTON_START_GAME.classList.add('repeat');
        Start_game = true;
        Game_Init();
        Game_Play_Current_Sound();
    }
    if (BUTTON_START_GAME.value == 'repeat') {
        playSound(sound, sound, sound);
    }
});

const CARD_GAME_CLICK = document.getElementById('CONTAINER_2');

CARD_GAME_CLICK.addEventListener('mousedown', event => {
    if (event.target.classList.contains('front') && Mode == 'play' &&
        (event.target.parentNode.classList.contains('guessed') == false) && (Start_game == true))
        if (sound == event.target.id) {
            playSound('audio/correct.mp3', 'audio/correct.mp3', 'audio/correct.mp3');
            event.target.parentNode.classList.add('guessed');

            for (let i = 0; i < 8; i++)
                for (let j = 0; j < 8; j++) {
                    if (cards[i][j].audioSrc == event.target.id) {
                        cards[i][j].statistics = localStorage.getItem(cards[i][j].word, cards[i][j].statistics).split(',');
                        cards[i][j].statistics[1] = Number(cards[i][j].statistics[1]) + 1;
                        localStorage.setItem(cards[i][j].word, cards[i][j].statistics);
                    }
                }

            Results.push(1);
            Game_Progress_Add_Star(1);
            Random_Array.pop();
            if (Random_Array.length > 0) Game_Play_Current_Sound();
            else End_Game();
        }
        else {
            playSound('audio/error.mp3', 'audio/error.mp3', 'audio/error.mp3');
            Results.push(0);

            for (let i = 0; i < 8; i++)
                for (let j = 0; j < 8; j++) {
                    if (cards[i][j].audioSrc == sound) {
                        cards[i][j].statistics = localStorage.getItem(cards[i][j].word, cards[i][j].statistics).split(',');
                        cards[i][j].statistics[2] = Number(cards[i][j].statistics[2]) + 1;
                        localStorage.setItem(cards[i][j].word, cards[i][j].statistics);
                    }
                }

            Game_Progress_Add_Star(0);
        }
});

// ----- Function to initialize the game ----- //
function Game_Init() {
    if (Start_game == true) {
        Random_Array = [0, 1, 2, 3, 4, 5, 6, 7];
        Shuffle(Random_Array);
    }
}

// ----- Function to play sound of the current card in game ----- //
function Game_Play_Current_Sound() {
    temp_page = getPage(cur_page);

    sound = cards[temp_page][Random_Array[Random_Array.length - 1]].audioSrc;

    playSound(sound, sound, sound);
}

// ----- Function to put correct or wrong star in progress bar ----- //
function Game_Progress_Add_Star(variant) {
    const PROGRESS_BAR = document.getElementById('GAME_PROGRESS');
    if (variant == 1) {
        const SUCCESS_STAR = document.createElement('span');
        SUCCESS_STAR.classList.add('star_correct');
        PROGRESS_BAR.append(SUCCESS_STAR);
    }
    if (variant == 0) {
        const MISTAKE_STAR = document.createElement('span');
        MISTAKE_STAR.classList.add('star_mistake');
        PROGRESS_BAR.append(MISTAKE_STAR);
    }
}

// ----- Function to shuffle array for the game ----- //
function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ----- Function to End the game ----- //
function End_Game() {
    var Body = document.getElementById('BODY');
    var Content_wrapper = document.getElementById('CONTENT');
    Content_wrapper.classList.add('none');
    let Mistakes = 0;

    for (let i = 0; i < Results.length; i++)
        if (Results[i] == 0) Mistakes++;

    if (Mistakes > 0) {
        Body.classList.add('looser');
        playSound('audio/failure.mp3', 'audio/failure.mp3', 'audio/failure.mp3');
        setTimeout(function temp() {
            Body.classList.remove('looser');
            Content_wrapper.classList.remove('none');
        }, 3000);
    }
    else {
        Body.classList.add('victory');
        playSound('audio/success.mp3', 'audio/success.mp3', 'audio/success.mp3');
        setTimeout(function temp() {
            Body.classList.remove('victory');
            Content_wrapper.classList.remove('none');
        }, 3000);
    }
    Clear_After_Game();

    setTimeout(function temp1() {
        document.location.href = "index.html";
    }, 3000);
}

// ----- Function to clear changes after game ----- //
function Clear_After_Game() {
    // const Cards =  document.getElementById('CONTENT');

    for (let i = 1; i < 9; i++) {
        CONTAINER.children[i].children[0].classList.remove('guessed');
        document.getElementById('GAME_PROGRESS').innerHTML = '';
        Results = [];
        Random_Array = [0, 1, 2, 3, 4, 5, 6, 7];
        Start_game = false;
        BUTTON_START_GAME.value = 'start_game';
        BUTTON_START_GAME.textContent = 'Start Game';
        BUTTON_START_GAME.classList.remove('repeat');
    }
}

// ----- Function play sounds for the cards with English names ----- //
function playSound(soundfile_ogg, soundfile_mp, soundfile_ma) {
    if ("Audio" in window) {
        var a = new Audio();
        if (a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')
            .replace(/no/, ''))
            a.src = soundfile_ogg;
        else if (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
            ''))
            a.src = soundfile_mp;
        else if (a.canPlayType && a.canPlayType(
            'audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''))
            a.src = soundfile_ma;
        else
            a.src = soundfile_mp;

        a.autoplay = true;
        return;
    } else {
        alert("Time almost up");
    }
}