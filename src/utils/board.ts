
type ChessPieceKind = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
type ChessPieceColor = 'white' | 'black'

export class ChessPiece{
    constructor(public kind: ChessPieceKind, public color: ChessPieceColor){
    }
}

function dp(kind: ChessPieceKind='pawn'){
    return new ChessPiece(kind, 'black')
}

function lp(kind: ChessPieceKind='pawn'){
    return new ChessPiece(kind, 'white')
}

export class Board{
    fields:Array<Array<ChessPiece | 0>> = [
        [dp('rook'), dp('knight'), dp('bishop'), dp('queen'), dp('king'), dp('bishop'), dp('knight'), dp('rook')],
        [dp(), dp(), dp(), dp(), dp(), dp(), dp(), dp()],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [lp(), lp(), lp(), lp(), lp(), lp(), lp(), lp()],
        [lp('rook'), lp('knight'), lp('bishop'), lp('queen'), lp('king'), lp('bishop'), lp('knight'), lp('rook')]
    ]
    whiteKingPosition = {row: 7, col: 4}
    blackKingPosition = {row: 0, col: 4}

    movePiece(startRow: number, startCol: number, endRow: number, endCol: number) {
        
        const piece = this.fields[startRow][startCol];
        this.fields[endRow][endCol] = piece;
        this.fields[startRow][startCol] = 0;

        // Update king's position if it was moved
        if (piece instanceof ChessPiece && piece.kind === 'king') {
            if (piece.color === 'white') {
                this.whiteKingPosition = { row: endRow, col: endCol };
            } else {
                this.blackKingPosition = { row: endRow, col: endCol };
            }
        }
    }

    isPathClear = (startRow: number, startCol: number, endRow: number, endCol: number) => {

        let rowDirection = endRow > startRow ? 1 : -1;
        let colDirection = endCol > startCol ? 1 : -1
        if(startRow === endRow){
            rowDirection = 0;
        }
        if(startCol === endCol){
            colDirection = 0;
        }
        

        let row = startRow + rowDirection;
        let col = startCol + colDirection;

        while (row !== endRow || col !== endCol) {
            if (this.fields[row][col] !== 0) {
                return false;
            }
            row += rowDirection;
            col += colDirection;
        }
        return true;
    }


    movesPutKingInCheck = (piece: ChessPiece, startRow: number, startCol: number, endRow: number, endCol: number) => {
        const simulatedBoard = new Board();
        simulatedBoard.fields = this.fields.map(row => row.slice());
        simulatedBoard.movePiece(startRow, startCol, endRow, endCol);
        if (simulatedBoard.isKingInCheck(piece.color)) {
            return true;
        }
        return false;
    }

    isCheckmate = (color: ChessPieceColor) => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.fields[row][col];
                if (piece instanceof ChessPiece && piece.color === color) {
                    for (let endRow = 0; endRow < 8; endRow++) {
                        for (let endCol = 0; endCol < 8; endCol++) {
                            if (this.isMoveValid(piece, row, col, endRow, endCol) && !this.movesPutKingInCheck(piece, row, col, endRow, endCol)) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }


    isMoveValid = (piece: ChessPiece, startRow: number, startCol: number, endRow: number, endCol: number) => {
        const rowDiff = Math.abs(startRow - endRow);
        const colDiff = Math.abs(startCol - endCol);

        if(piece.color === 'white' && this.fields[endRow][endCol] !== 0 && this.fields[endRow][endCol].color === 'white'){
            return false;
        }
        if(piece.color === 'black' && this.fields[endRow][endCol] !== 0 && this.fields[endRow][endCol].color === 'black'){
            return false;
        }

        switch (piece.kind) {
            case 'pawn':
                if(piece.color === 'white'){
                    if(startRow === 6 && endRow === 4 && startCol === endCol){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(rowDiff === 1 && startRow > endRow && startCol === endCol && this.fields[endRow][endCol] === 0){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(endRow === startRow - 1 && colDiff === 1 && this.fields[endRow][endCol] !== 0){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                }
                if(piece.color === 'black'){
                    if(startRow === 1 && endRow === 3 && startCol === endCol){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(rowDiff === 1 && startRow < endRow && startCol === endCol && this.fields[endRow][endCol] === 0){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(endRow === startRow + 1 && colDiff === 1 && this.fields[endRow][endCol] !== 0){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                }
                break
            case 'rook':
                if(startRow === endRow || startCol === endCol){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'knight':
                if((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)){
                    return true;
                }
                break
            case 'bishop':
                if(rowDiff === colDiff){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'queen':
                if(rowDiff === colDiff || startRow === endRow || startCol === endCol){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'king':
                if(piece.color === 'white'){

                    if(startRow === 7 && endRow === 7 && startCol === 4 && endCol === 6 && this.fields[7][7]!==0 && this.fields[7][7].kind === 'rook' && this.fields[7][7].color === 'white' && this.fields[7][5] === 0 && this.fields[7][6] === 0){
                        this.fields[7][7] = 0;
                        this.fields[7][5] = new ChessPiece('rook', 'white');
                        return true;
                    }
                    if(startRow === 7 && endRow === 7 && startCol === 4 && endCol === 2 && this.fields[7][0] !==0 && this.fields[7][0].kind === 'rook' && this.fields[7][0].color === 'white' && this.fields[7][1] === 0 && this.fields[7][2] === 0 && this.fields[7][3] === 0){
                        this.fields[7][0] = 0;
                        this.fields[7][3] = new ChessPiece('rook', 'white');
                        return true;
                    }
                }
                if(piece.color === 'black'){

                    if(startRow === 0 && endRow === 0 && startCol === 4 && endCol === 6 && this.fields[0][7] !==0 && this.fields[0][7].kind === 'rook' && this.fields[0][7].color === 'black' && this.fields[0][5] === 0 && this.fields[0][6] === 0){
                        this.fields[0][7] = 0;
                        this.fields[0][5] = new ChessPiece('rook', 'black');
                        return true;
                    }
                    if(startRow === 0 && endRow === 0 && startCol === 4 && endCol === 2 && this.fields[0][0] !==0 && this.fields[0][0].kind === 'rook' && this.fields[0][0].color === 'black' && this.fields[0][1] === 0 && this.fields[0][2] === 0 && this.fields[0][3] === 0){
                        this.fields[0][0] = 0;
                        this.fields[0][3] = new ChessPiece('rook', 'black');
                        return true;
                    }
                }

                if(rowDiff <= 1 && colDiff <= 1){
                    return true;
                }
                break
        }
    }

    isKingInCheck(color: ChessPieceColor): boolean {
        const kingPosition = color === 'white' ? this.whiteKingPosition : this.blackKingPosition;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.fields[row][col];
                if (piece instanceof ChessPiece && piece.color !== color) {
                    if (this.isMoveValid(piece, row, col, kingPosition.row, kingPosition.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
}