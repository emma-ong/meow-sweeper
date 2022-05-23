document.addEventListener('DOMContentLoaded', startGame)
// Define your `board` object here!
let board = {
  cells: []
}
// let cellsArr = board.cells;
createBoard(getRandomIntInclusive(3, 6))

function startGame() {
  // Don't remove this function call: it makes the game work!
    
  
  for (let i = 0; i < board.cells.length; i++) {
    
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  resetButton()
  
}



//square board means height & length should be the same e.g. 4x4, 5x5 NOT 4x5, 5x6
//Randomly generated integer value for lengthOfRowAndCol to alter size of board new round 

//let lengthOfRowAndCol = getRandomIntInclusive(3, 6);



//Function creates squares on the board, is dynamic
function createBoard(size) {
  if (size <= 4) {
    for (let rw = 0; rw < size; rw++) {
      for (let cl = 0; cl < size; cl++) {
        let trueOrFalse = Math.random() >= 0.80 //20% chance is truthy
        board.cells.push({
          row: rw,
          col: cl,
          isMine: trueOrFalse,
          hidden: true
        })
      }
    }
  } else if (size > 4) {
    for (let rw = 0; rw < size; rw++) {
      for (let cl = 0; cl < size; cl++) {
        let trueOrFalse = Math.random() >= 0.75
        board.cells.push({
          row: rw,
          col: cl,
          isMine: trueOrFalse,
          hidden: true
        })
      }
    }

  }
  
  return board.cells
}





//Random number generator between min 0 and max lengthOfRowAndCol
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
//select class list

function checkForWin() {
  //this is the variable that will change if user does not win 
  
  let win = true;
  for (let i = 0; i < board.cells.length; i++) {
    //if bomb is revealed, play sound
    if(board.cells[i].isMine && !board.cells[i].hidden){
      meowExplosion()
    }

    //if there is a cell with mine AND is NOT marked
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      //win turns to false
      win = false;
      
      //if it is NOT a mine AND it is STILL HIDDEN 
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      //win turns to false
      win = false;
    }
  }
  //given it is a win
  if (win === true) {
    purring()
    let children = document.getElementsByClassName("board")[0].children;
    for(let i = 0; i < children.length; i++){
      children[i].classList.add('blink-bg')
  }
    lib.displayMessage('Purrr...YOU WIN!')
  }
}

// You can use this function call to declare a winner (once you've
// detected that they've won, that is!)
//   lib.displayMessage('You win!')


document.addEventListener("click", checkForWin)
document.addEventListener("contextmenu", checkForWin)


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//

//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {

  let count = 0;
  let surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++

    }
  }
  return count;
}

function resetButton() {
  let button = document.getElementById("reset")
  button.innerText = "Reset Game"
  button.style.visibility = "visible"
  button.setAttribute("onclick", "resetGame()")
}

function resetGame() {
  //https://www.w3schools.com/Jsref/met_loc_reload.asp
  
  document.location.reload()
  
}

function meowExplosion() {
  let meow = new Audio("sounds/Angry-cat-sound-effect.wav")
  meow.play()
}

function purring() {
  let purr = new Audio("sounds/purrs.wav")
  purr.play()
}

