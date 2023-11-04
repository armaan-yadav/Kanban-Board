import React from "react";

function Label(props) {
  // console.log(label);
  const { text, color } = props.label;

  return (
    <div>
      <h1
        // style={{ backgroundColor: color }}
        className={`text-lg bg-gray-400 px-4 ${color} `}
      >
        {text} {props.children}
      </h1>
    </div>
  );
}

export default Label;
