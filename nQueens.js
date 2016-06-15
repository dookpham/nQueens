var board = [];      //tracks current positions of Queens and open vs 'captured' spaces
var positions = [];  //tracks remaining positions still playable on the board
var queenPos = [];   //tracks positions/ordered pairs of current Queens played 
var solutions = [];  //valid solutions for nQueens
var timeCapsule = []; //tracks state for prior to placing each Queen
var queenCount = 0;
var nGlobal = 0;
var numBoardPositions = 0;

var initialize = function() {
  var origIndex = 0;
  numBoardPositions = nGlobal * nGlobal;
  for (var i = 0; i < nGlobal; i++) {
    board[i] = [];
    timeCapsule[i] = [];
    for (var j = 0; j < nGlobal; j++) {
      board[i][j] = ' ';
      positions.push([i,j,origIndex]);
      origIndex++;
    }
  }  
}

var logBoard = function() {
  for (var i = nGlobal-1; i >= 0; i--) {
    console.log('Col ' + i + ':', board[i]);
  }  
}

var saveState = function() {
  timeCapsule[queenCount] = {
    board: board,
    positions: positions,
    queenPos: queenPos

  }
}

var backTrack = function() {
  var failedQCount = queenCount;
  var queenToRemove = queenCount;
  var saveState = timeCapsule[queenToRemove];

  board = saveState.board;
  positions = saveState.positions;
  queenPos = saveState.queenPos;
  var lastQIndex = saveState.origIndex;
  var posIndex = saveState.posIndex;
  
  //ex. removedQueen is last one placed (i.e failedCount - queenToRemove === 0), 
    //so if posIndex === positions.length, then we've exhausted options 
  // if () {  

  // }

}

var placeQueen = function() {

  // var nextIndex = Math.floor(Math.random() * positions.length);
  var lastIndexPlaced;  
  var nextIndex = 0; //we need a way to choose the next index  without using positions at indices prior to the last queen placed
  var pos = positions[nextIndex];

  board[pos[0]][pos[1]] = 'Q';
  queenPos.push([pos[0], pos[1]]);
  timeCapsule[queenCount].origIndex = pos[2];  //make sure queenCount++ comes AFTER this line
  timeCapsule[queenCount].posIndex = nextIndex;
  queenCount++;
  positions.splice(nextIndex, 1);

  for (var i = positions.length-1; i >= 0; i--) {
    var p = positions[i];
    var match = false;
    if (p[0] === pos[0] && p[1] !== pos[1]){
      //column match
      match = true;
    } else if (p[1] === pos[1] && p[0] !== pos[0]) {
      //row match
      match = true;
    } else if (p[1] - pos[1] === p[0] - pos[0]) {
      //negative slope diagonal
      match = true;
    } else if (p[1] + p[0] === pos[0] + pos[1]) {
      //positive slope diagonal
      match = true;
    }

    if (match) {
      board[p[0]][p[1]] = '*';
      positions.splice(i, 1);
    }
  }
}


var nQueens = function(n){
  nGlobal = n;
  initialize();
  while(positions.length > 0) {
    placeQueen();
  }

  if (queenCount === n) {
    console.log('nQueens SOLUTION:');
    solutions.push({
      'board': board,
      'positions': positions,
    });
  } else {
    console.log('Failed queenCount low', queenCount);
    logBoard();
    //have we checked all options? 
      //yes => return;
      //no => reload state
        //reload last state
          //are there other options to check?
            //yes => check others
            //no => reload state for previous Queen
  }
}

nQueens(4);
