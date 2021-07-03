const gameBox = document.querySelector('#game');
const btnPlay = document.querySelector('#btnAction');
const playerTurnMessage = document.querySelector('#playerturn');

let PLAYER1_WINS = 0;
let PLAYER1_LOSES = 0;
let PLAYER2_WINS = 0;
let PLAYER2_LOSES = 0;

let slots = [];
let isPlaying = false;
let isPlayer1Turn;

const createSlots = () => {
    for (let i = 1; i < 10; i++) {
        let slot = document.createElement('div');
        slot.classList.add('slot');
        slot.id = `slot${i}`;
        slots.push(slot);
        gameBox.appendChild(slot);
    }
};

const removeSlots = () => {
    gameBox.innerHTML = "";
    slots = [];
};

const initialEvents = () => {
    createSlots();
    console.log('OK');
};

const createFigure = (figure) => {
    let element = document.createElement('div');
    element.classList.add(figure);
    return element;
}

const createFisrtTurn = () => {
    let number = Math.round(Math.random() * (2 - 1) + 1);
    isPlayer1Turn = number == 1 ? true : false;
};

const showPlayerTurnMessage = () => {
    playerTurnMessage.innerHTML = isPlayer1Turn
        ? 'Turno del Jugador 1'
        : 'Turno del Jugador 2';
};

const showWinnerMessage = () => {
    playerTurnMessage.innerHTML = isPlayer1Turn
        ? '¡Jugador 1 es el ganador!'
        : '¡Jugador 2 es el ganador!';
}

const showTieMessage = () => {
    playerTurnMessage.innerHTML = '¡Empate!';
}

const isWinLine = (type, array) => {
    let isInLine = false;
    const [firstSlot, secondSlot, thirdSlot] = array;
    if (slots[firstSlot].hasChildNodes() && slots[secondSlot].hasChildNodes() && slots[thirdSlot].hasChildNodes()) {
        if (slots[firstSlot].childNodes[0].classList.contains(type)
            && slots[secondSlot].childNodes[0].classList.contains(type)
            && slots[thirdSlot].childNodes[0].classList.contains(type)) 
        {
            isInLine = true;
        }
    }
    return isInLine;
}

const hasTheMatchWinner = () => {
    let hasWinner = false;
    let elementType = isPlayer1Turn ? 'circle' : 'cross';
    if (isWinLine(elementType, [0,1,2])
        || isWinLine(elementType, [3,4,5])
        || isWinLine(elementType, [6,7,8])
        || isWinLine(elementType, [0,3,6])
        || isWinLine(elementType, [1,4,7])
        || isWinLine(elementType, [2,5,8]) 
        || isWinLine(elementType, [0,4,8])
        || isWinLine(elementType, [2,4,6])) 
    {
        hasWinner = true;
    }
    return hasWinner;
}

const hasTheMathcTie = () => {
    let hasTie = false;
    let count = 0;
    slots.forEach(element => {
        if (element.hasChildNodes()) count++;
    });
    if (count == 9) hasTie = true;
    return hasTie;
}

const updateStats = () => {
    if (isPlayer1Turn) {
        PLAYER1_WINS += 1;
        PLAYER2_LOSES += 1;
    } else {
        PLAYER1_LOSES += 1;
        PLAYER2_WINS += 1;
    }
    document.getElementById('player1winloses').innerHTML = `W/L: ${PLAYER1_WINS} - ${PLAYER1_LOSES}`;
    document.getElementById('player2winloses').innerHTML = `W/L: ${PLAYER2_WINS} - ${PLAYER2_LOSES}`;;
}

const restartStats = () => {
    PLAYER1_WINS = 0;
    PLAYER1_LOSES = 0;
    PLAYER2_WINS = 0;
    PLAYER2_LOSES = 0;
    document.getElementById('player1winloses').innerHTML = `W/L: ${PLAYER1_WINS} - ${PLAYER1_LOSES}`;
    document.getElementById('player2winloses').innerHTML = `W/L: ${PLAYER2_WINS} - ${PLAYER2_LOSES}`;;
}

const startGame = () => {
    createFisrtTurn();
    isPlaying = true;
    btnPlay.toggleAttribute('disabled');
    showPlayerTurnMessage();
}

const restartGame = () => {
    removeSlots();
    createSlots();
    isPlaying = false;
    btnPlay.toggleAttribute('disabled');
    playerTurnMessage.innerHTML = '¿Quien empieza?';
}

window.addEventListener('load', initialEvents);

btnPlay.addEventListener('click', () => {
    startGame();
});

gameBox.addEventListener('click', (event) => {
    if (!event.target.hasChildNodes() && event.target.classList.contains('slot')  && isPlaying) {
        // add player element
        event.target.appendChild(isPlayer1Turn 
            ? createFigure('circle')
            : createFigure('cross'));
        // check game state
        if (hasTheMatchWinner()) {
            updateStats();
            showWinnerMessage();
            setTimeout(restartGame, 5000);
            return;
        }
        if (hasTheMathcTie()) {
            showTieMessage();
            setTimeout(restartGame, 5000);
            return;
        }
        // change player turn
        isPlayer1Turn = !isPlayer1Turn;
        // show player turn
        showPlayerTurnMessage();
    }
});
