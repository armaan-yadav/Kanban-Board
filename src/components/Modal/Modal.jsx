import React from "react";

function Modal(props) {
  return (
    <div
      className="top-0 left-0 fixed h-[100vh] w-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-[35%]">
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
