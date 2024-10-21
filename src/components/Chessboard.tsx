"use client"
import { useState } from 'react';
import {Board} from '../utils/board'
import Image from 'next/image'
import { ChessPiece } from '../utils/board';

export default function Chessboard() {
    const [board, setBoard] = useState(new Board());
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);

    const isMoveValid = (piece: ChessPiece, startRow: number, startCol: number, endRow: number, endCol: number) => {
        const rowDiff = Math.abs(startRow - endRow);
        const colDiff = Math.abs(startCol - endCol);

        switch (piece.kind) {
            case 'pawn':
                if(piece.color === 'white'){
                    if(startRow === 6 && endRow === 4 && startCol === endCol){
                        return true;
                    }
                    if(rowDiff === 1 && startRow > endRow && startCol === endCol){
                        return true;
                    }
                    if(endRow === startRow - 1 && colDiff === 1 && board.fields[endRow][endCol] !== 0){
                        return true;
                    }
                }
                if(piece.color === 'black'){
                    if(startRow === 1 && endRow === 3 && startCol === endCol){
                        return true;
                    }
                    if(rowDiff === 1 && startRow < endRow && startCol === endCol){
                        return true;
                    }
                    if(endRow === startRow + 1 && colDiff === 1 && board.fields[endRow][endCol] !== 0){
                        return true;
                    }
                }
                break
            case 'rook':
                if(startRow === endRow || startCol === endCol){
                    return true;
                }
                break
            case 'knight':
                if((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)){
                    return true;
                }
                break
            case 'bishop':
                if(rowDiff === colDiff){
                    return true;
                }
                break
            case 'queen':
                if(rowDiff === colDiff || startRow === endRow || startCol === endCol){
                    return true;
                }
                break
        }
    }

    const handleSquareClick = (row: number, col: number) => {
        const piece = board.fields[row][col];

        if(selectedPiece){
            // move piece
            const selectedChessPiece = board.fields[selectedPiece.row][selectedPiece.col];
            if(selectedChessPiece!=0 && isMoveValid(selectedChessPiece, selectedPiece.row, selectedPiece.col, row, col)){
                const newBoard = { ...board };
                newBoard.fields[row][col] = board.fields[selectedPiece.row][selectedPiece.col];

                newBoard.fields[selectedPiece.row][selectedPiece.col] = 0;
            }
            setSelectedPiece(null);
        } else if (piece!=0){
            setSelectedPiece({ row, col });
        }
        else{
            setSelectedPiece(null);
        }

    };

    const renderBoard = () => {
        const squares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const color = (row + col) % 2 === 0
                const piece = board.fields[row][col]
                const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
                squares.push(
                    <div key={`${row}-${col}`} 
                    onClick={() => handleSquareClick(row, col)}
                    className={`w-[75px] h-[75px] ${color ? 'bg-gray-400' : 'bg-gray-700'} ${isSelected ? "border-4 border-yellow-500" : ""}`}>

                        {piece !== 0 && (
                            <Image src={`/pieces/${piece.color}_${piece.kind}.png`} width={75} height={75} alt="chess piece" />)}                         
                </div>
                );
            }
            
        }
        return squares;
    }

  return (
    <div className="flex justify-center items-center h-screen">
    <div className = "w-[600px] h-[600px] grid grid-rows-8 grid-cols-8 shadow-2xl">
      {renderBoard()}
    </div>
    </div>
  )
}