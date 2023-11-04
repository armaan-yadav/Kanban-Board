import { useEffect, useRef, useState } from "react";

const DropDown = ({
  items = ["Delete "],
  style,
  boardId,
  removeCard,
  removeBoard,
  cardId,
}) => {
  const [makeVisible, setMakeVisible] = useState(false);
  const dropdownRef = useRef(null);
  const handleClick = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setMakeVisible(false);
    }
  };
  // console.log(removeCard);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div ref={dropdownRef}>
      <i
        className={`fa-solid fa-ellipsis cursor-pointer ${style}`}
        onClick={(e) => {
          e.stopPropagation();
          setMakeVisible(!makeVisible);
        }}
      ></i>
      {makeVisible && (
        <div
          className="absolute bottom -left-[600%] w-[7rem] z-10 bg-red-400 text-center cursor-pointer "
          onClick={() => {
            removeCard && removeCard(cardId, boardId);
            removeBoard && removeBoard(boardId);
            // removeBoard && console.log(boardId);
          }}
        >
          {items.map((e, index) => {
            return (
              <li key={index} className="list-none">
                {e}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
