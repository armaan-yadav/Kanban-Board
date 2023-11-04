import React, { useState } from "react";
import CardLabel from "./CardLabel";
import DropDown from "../../utils/DropDown";
import CardInfo from "../CardInfo/CardInfo";

function Card({
  card,
  boardId,
  removeCard,
  handleDragEnd,
  handleDragEnter,
  updateCard,
}) {
  const { labels, heading, id, desc, date, tasks, completed } = card;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          heading={heading}
          desc={desc}
          labels={labels}
          date={date}
          tasks={tasks}
          id={id}
          completed={completed}
          updateCard={updateCard}
          boardId={boardId}
          card={card}
        />
      )}

      <div
        className="px-[1rem] my-3 bg-primaryLight"
        draggable //to add the functionality of drag and drop
        onDragEnter={() => handleDragEnter(id, boardId)}
        onDragEnd={() => handleDragEnd(id, boardId)}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <div className="card-header flex justify-between bg-red-500  group ">
          <div className="flex gap-2 max-w-[90%] flex-wrap ">
            {labels.map((label, index) => {
              return <CardLabel key={index} label={label} close={false} />;
            })}
          </div>
          <div className="relative">
            <DropDown
              items={["Delete Card"]}
              style={"opacity-0 group-hover:opacity-[1] duration-200"}
              boardId={boardId}
              removeCard={removeCard}
              cardId={id}
            />
          </div>
        </div>
        <div className="card-body">
          <h1 className="text-xl">{heading}</h1>
          <h5 className="text-sm">{desc}</h5>
        </div>
        <div className="card-footer flex justify-between">
          <span>
            {date && (
              <>
                {" "}
                <i className="fa-regular fa-clock fa-xs"></i> {date}
              </>
            )}
          </span>
          <span>
            <i className="fa-solid fa-check-to-slot"></i> {completed.length}/
            {tasks.length}
          </span>
        </div>
      </div>
    </>
  );
}

export default Card;
