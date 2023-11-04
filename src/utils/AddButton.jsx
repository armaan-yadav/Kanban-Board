import React, { useState, useRef, useEffect } from "react";

function AddCard({
  text,
  placeholder,
  onSubmit,
  addCard,
  id,
  addBoard,
  style,
  defaultValue,
}) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [title, setTitle] = useState(text);
  const editRef = useRef(null);
  const handleClick = (event) => {
    if (!editRef.current.contains(event.target)) {
      setShowEditMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div
        className={`px-[1rem] flex  flex-col min-w-[25%] bg-contrast h-fit ${style}`}
        ref={editRef}
      >
        {showEditMenu ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (onSubmit) onSubmit(title);
              addCard && addCard(title, id);
              addBoard && addBoard(title);
              setShowEditMenu(false);
            }}
          >
            <input
              autoFocus
              type="text"
              defaultValue={text}
              placeholder={placeholder || "Enter Task"}
              className="w-full text-black"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="flex gap-3 justify-center">
              {" "}
              <button type="submit"> {defaultValue || text}</button>
              <button onClick={() => setShowEditMenu(false)}>
                <i className="fa-solid fa-x cursor-pointer"></i>
              </button>
            </div>
          </form>
        ) : (
          <button
            className="cursor-pointer"
            onClick={(e) => {
              setShowEditMenu(true);
              e.stopPropagation();
            }}
          >
            {text || "Add "}
          </button>
        )}
      </div>
    </>
  );
}

export default AddCard;
