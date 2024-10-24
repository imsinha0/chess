"use client"
import { useState } from 'react';
import {Board} from '../utils/board'
import Image from 'next/image'
import { ChessPiece } from '../utils/board';
import PromotionModal from './PromotionModal';


interface PromotionInfo{
    piece: ChessPiece;
    row: number;
    col: number;
}


export default function Chessboard() {
    const [board, setBoard] = useState(new Board());
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [promotionInfo, setPromotionInfo] = useState<PromotionInfo | null>(null);
    const [turn, setTurn] = useState<'white' | 'black'>('white');


    const handleSquareClick = (row: number, col: number) => {
        const piece = board.fields[row][col];

        if(selectedPiece){
            // move piece
            const selectedChessPiece = board.fields[selectedPiece.row][selectedPiece.col];

            if(selectedChessPiece!=0 && board.isMoveValid(selectedChessPiece, selectedPiece.row, selectedPiece.col, row, col) && !board.movesPutKingInCheck(selectedChessPiece, selectedPiece.row, selectedPiece.col, row, col)){
                board.movePiece(selectedPiece.row, selectedPiece.col, row, col);
                checkPromotion(selectedChessPiece, row, col);
                setTurn(turn === 'white' ? 'black' : 'white');

                const oppositeColor = turn === 'white' ? 'black' : 'white';

                if(board.isCheckmate(oppositeColor)){
                    alert(oppositeColor + " is checkmated -- " + turn + " wins!");
                    setBoard(new Board());
                } else if(board.isStalemate(oppositeColor)){
                    alert(oppositeColor + " is stalemated -- it's a draw");
                    setBoard(new Board());
                }

                //something is wrong with the checks and checkmates

            }
            setSelectedPiece(null);
        } else if (piece!=0 && piece.color === turn){
            setSelectedPiece({ row, col });
        }
        else{
            setSelectedPiece(null);
        }

    };

    const checkPromotion = (piece: ChessPiece, row: number, col: number) => {
        if(piece.kind === 'pawn' && (row === 0 || row === 7)){
            setPromotionInfo({ piece, row, col });
            setIsPromotionModalOpen(true);
            board.fields[row][col] = new ChessPiece('queen', piece.color);

        }
    }

    const promotePawn = (newPiece: 'queen' | 'rook' | 'bishop' | 'knight') => {

        if(promotionInfo){
            board.fields[promotionInfo.row][promotionInfo.col] = new ChessPiece(newPiece, promotionInfo.piece.color);
        }
        setIsPromotionModalOpen(false);
        setPromotionInfo(null);
    }


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
      <PromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        promotePawn={promotePawn}
      />
    </div>
    </div>
  )
}