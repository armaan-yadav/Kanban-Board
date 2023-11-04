import React, { useState } from "react";
import BoardColumn from "./BoardColumn";
import AddCard from "../../utils/AddButton";

function Board() {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random(),
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          heading: "Card 1",
          tasks: ["hustle karo bhasad nayi"],
          labels: [
            {
              text: "FrontEnd",
              color: "pink",
            },
            {
              text: "React Js",
              color: "blue",
            },
          ],
          completed: [],
          desc: "react is a beast",
          date: "",
        },
        {
          id: Date.now() + Math.random(),
          heading: "Card 2",
          tasks: [],
          labels: [
            {
              text: "Web3",
              color: "red",
            },
            {
              text: "Solidity",
              color: "orange",
            },
          ],
          completed: [],
          desc: "Solidity is interesting",
          date: "",
        },
      ],
    },
  ]);
  const [target, setTarget] = useState({
    boardId: "",
    cardId: "",
  });
  const addCard = (title, boardId) => {
    const card = {
      id: Date.now() + Math.random(),
      heading: title,
      tasks: [],
      labels: [],
      completed: [],
      desc: "",
      date: "",
    };
    const index = boards.findIndex((e) => {
      return e.id === boardId;
    });

    //direvtly update nayi kar skte state toh temp bana kar kia hai
    const tempBoard = [...boards]; //creating a shallow copy
    tempBoard[index].cards.push(card);
    setBoards(tempBoard);
  };
  const removeCard = (cardId, boardId) => {
    const boardIndex = boards.findIndex((e) => e.id == boardId);
    const cardIndex = boards[boardIndex].cards.findIndex((e) => e.id == cardId);

    const tempBoard = [...boards];
    const tempCards = tempBoard[boardIndex];
    tempCards.cards.splice(cardIndex, 1);

    setBoards(tempBoard);
  };
  const addBoard = (title) => {
    const board = {
      id: Date.now() + Math.random(),
      title: title,
      cards: [],
    };

    const tempBoard = [...boards];
    tempBoard.push(board);
    setBoards(tempBoard);
  };
  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((e) => e.id == boardId);
    console.log(boardIndex);
    const tempBoard = [...boards];
    tempBoard.splice(boardIndex, 1);
    setBoards(tempBoard);
  };
  const handleDragEnd = (cardId, boardId) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
    s_bIndex = boards.findIndex((e) => e.id == boardId);
    if (s_bIndex < 0) return;
    s_cIndex = boards[s_bIndex].cards.findIndex((e) => e.id == cardId);
    if (s_cIndex < 0) return;
    t_bIndex = boards.findIndex((e) => e.id == target.boardId);
    if (t_bIndex < 0) return;
    t_cIndex = boards[t_bIndex].cards.findIndex((e) => e.id == target.cardId);
    if (t_cIndex < 0) return;

    // storing the board card details which we are going to move --> source card
    const tempBoard = [...boards];
    // console.log(tempBoard[t_bIndex].id);
    const tempCard = tempBoard[s_bIndex].cards[s_cIndex];
    //removing the card from source board //
    tempBoard[s_bIndex].cards.splice(s_cIndex, 1);
    //adding the card into the target board
    tempBoard[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoard); //bc isko bhul gaya tha likhna due toh which error aara ghante se :)
  };
  const handleDragEnter = (cardId, boardId) => {
    setTarget({
      boardId,
      cardId,
    });
  };
  const updateCard = (cId, bId, card) => {
    const boardIndex = boards.findIndex((e) => e.id == bId);
    if (boardIndex < 0) return;
    const cardIndex = boards[boardIndex].cards.findIndex((e) => e.id == cId);
    if (cardIndex < 0) return;
    const temp = [...boards];
    temp[boardIndex].cards[cardIndex] = card;
    setBoards(temp);
  };
  // console.log(target);
  return (
    <div className="h-[100vh] w-full bg-primaryDark pt-[80px] text-white px-[2rem] flex gap-5">
      {boards.map((board, index) => {
        return (
          <BoardColumn
            key={board.id}
            board={board}
            addCard={addCard}
            removeCard={removeCard}
            removeBoard={removeBoard}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            updateCard={updateCard}
          />
        );
      })}
      <AddCard
        text={"Add Board"}
        placeholder={"Enter Board Name"}
        addBoard={addBoard}
        btnText={"Add Board"}
        subBtnText={"Add Board1"}
        defaultValue={"Board Name"}
      />
    </div>
  );
}

export default Board;
