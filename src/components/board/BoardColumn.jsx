import React from "react";
import Card from "../card/Card";
import AddCard from "../../utils/AddButton";
import DropDown from "../../utils/DropDown";

function BoardColumn({
  board,
  addCard,
  removeCard,
  removeBoard,
  handleDragEnter,
  handleDragEnd,
  updateCard,
}) {
  const { id, title, cards } = board;
  // console.log(removeCard);

  return (
    <div className="w-[25%] bg-slate-500 h-[100%] overflow-y-auto ">
      <div className="flex w-full justify-between bg-primaryLight px-[1rem] items-center mb-[2rem]">
        <h1>
          {title} <span>{cards.length}</span>
        </h1>
        <div className="relative">
          <DropDown
            items={["Delete Board"]}
            removeBoard={removeBoard}
            boardId={id}
          />
        </div>{" "}
      </div>
      {cards.map((card) => {
        return (
          <Card
            card={card}
            key={card.id}
            boardId={id}
            removeCard={removeCard}
            handleDragEnd={handleDragEnd}
            handleDragEnter={handleDragEnter}
            updateCard={updateCard}
          />
        );
      })}
      <AddCard
        text={"Add Card"}
        placeholder={"Enter Card Name"}
        addCard={addCard}
        id={id}
        defaultValue={"Add Card"}
      />
    </div>
  );
}

export default BoardColumn;
