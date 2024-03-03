let currentPlayer = "X" ;
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnCounter = 0;

const createBoardArray = () => {
    let board = [] ;
    
    for (let row = 0 ; row < NUMBER_OF_ROWS ; row++) {
        board.push(Array.from({length:NUMBER_OF_ROWS} , () =>"_"));
    }
    return board;
}

let board = createBoardArray();

const resetButton = document.querySelector("#reset");

const getCellPlacement = (index, numberOfRows) => {
const row = Math.floor( index / numberOfRows);
const col = index % numberOfRows ;

return [row,col];
}

const checkRows = (currentPlayer) => {
    let column = 0 ;

    for (let row=0 ; row<NUMBER_OF_ROWS ; row++) {
        while(column < NUMBER_OF_ROWS ){
        if (board[row][column] !== currentPlayer ) {
            column = 0 ;
            break;
        }
        column++;
    }
    if (column === NUMBER_OF_ROWS){
        return true ;    
    }
}
};

const checkColumns = (currentPlayer) =>{
    let row = 0 ;

    for (let column=0 ; column <NUMBER_OF_ROWS ; column++) {
        while(row < NUMBER_OF_ROWS ){
        if (board[row][column] !== currentPlayer ) {
            row = 0 ;
            break;
        }
        row++;
    }
    if (row === NUMBER_OF_ROWS){
        return true ;    
    }}
};

const checkDiagonals = (currentPlayer) =>{
    let count = 0 ;

        while(count < NUMBER_OF_ROWS ){
        if (board[count][count] !== currentPlayer ) {
            count = 0 ;
            break;
        }
        count++;
    }
    if (count === NUMBER_OF_ROWS){
        return true ;    
    }
};

const checkReverseDiagonals = (currentPlayer) =>{
    let count = 0 ;

        while(count < NUMBER_OF_ROWS ){
        if (board[count][NUMBER_OF_ROWS - 1 -count ] !== currentPlayer ) {
            count = 0 ;
            break;
        }
        count++;
    }
    if (count === NUMBER_OF_ROWS){
        return true ;    
    }
};

const checkWin = (currentPlayer) => 
    checkRows(currentPlayer) ||
    checkColumns(currentPlayer) ||
    checkDiagonals(currentPlayer) ||
    checkReverseDiagonals(currentPlayer);

const resetBoard = () => {
    document.querySelector(".board").remove();
    createBoard()
    board = createBoardArray();
    currentPlayer = "X";
    turnCounter = 0;
};

const runWinEvent = (winner) => {
    const winnerMessage = `Congratulations, ${winner} ! You're the champion of this round! `;

    const winDisplay = document.createElement('div');
    winDisplay.id = 'win-display';
    winDisplay.classList.add('win-display');
    winDisplay.textContent = winnerMessage;

    document.body.appendChild(winDisplay);

    winDisplay.classList.add('active');

    setTimeout(() => {
        winDisplay.remove();
        resetBoard()
    }, 2000); 
};

const runDrawEvent = () => {
    const drawMessage = "It's a draw! ";

    const drawDisplay = document.createElement('div');
    drawDisplay.id = 'draw-display';
    drawDisplay.classList.add('draw-display');
    drawDisplay.textContent = drawMessage;

    document.body.appendChild(drawDisplay);

    drawDisplay.classList.add('active');

    setTimeout(() => {
        drawDisplay.remove();
        resetBoard()
    }, 2000); 
};

const drawMarkCell = (cell ,currentPlayer) => {
        cell.querySelector(".value").textContent = currentPlayer;
        cell.classList.add(`cell--${currentPlayer}`)
}

const cellClickHandler = (event , index) => {
    const cell = event.target;
    const [row,col] = getCellPlacement(index,NUMBER_OF_ROWS);

    if  (board [row][col] === "_"){
        turnCounter++;
        board[row][col]=currentPlayer;

        drawMarkCell(cell,currentPlayer);

        checkWin(currentPlayer) ? runWinEvent(currentPlayer) : (turnCounter === turns && runDrawEvent());

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        };
    };

const createCell = (index) => {
    const cellElementString = `<div class="cell" role="button" tabindex="${index + 1}"><span class="value"></span></div>`;
    const cellElement = document.createRange().createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) => cellClickHandler(event, index);
    cellElement.querySelector(".cell").onkeydown = (event) =>
    event.key === "Enter" ? cellClickHandler(event, index) : true;

    return cellElement;
};

const createBoard = () => {
    const container = document.querySelector(".container");
    const board = document.createElement("div");

    board.classList.add("board");

    for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElement = createCell(i);
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
    }

    container.insertAdjacentElement("afterbegin", board);
};

resetButton.addEventListener("click", resetBoard);
createBoard();