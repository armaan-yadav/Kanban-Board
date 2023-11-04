import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import AddCard from "../../utils/AddButton";
import CardLabel from "../../components/card/CardLabel";
function CardInfo(props) {
  const { labels, heading, id, desc, date, tasks, completed } = props;
  const [values, setValues] = useState({ ...props.card });
  const [done, setDone] = useState(false);
  const [activeColor, setActiveColor] = useState("");
  const calculatePercentage = () => {
    if (tasks.length == 0) return "0%";
    const completed = tasks.filter((e) => e.completed).length;
    // console.log((completed / tasks.length) * 100);
    return `${(completed / tasks.length) * 100}%`;
  };
  const randomColorArray = [
    "bg-[#FF5733]",
    "bg-[#3498DB]",
    "bg-[#E74C3C]",
    "bg-[#2ECC71]",
    "bg-[#9B59B6]",
    "bg-[#F1C40F]",
    "bg-[#27AE60]",
    "bg-[#D35400]",
    "bg-[#34495E]",
    "bg-[#E67E22]",
  ];
  const updateLabel = (e, color) => {
    const temp = { ...values };
    temp.labels.push({ text: e, color: color });
    setValues(temp);
  };
  const updateTasks = (e) => {
    const temp = { ...values };
    temp.tasks.push(e);
    setValues(temp);
  };
  const removeTasks = (task) => {
    const temp = values.tasks.filter((e) => e != task);
    setValues({ ...values, tasks: temp });
  };
  const removeLabel = (label) => {
    const temp = values.labels.filter((e) => e.text != label.text);
    setValues({ ...values, labels: temp });
  };
  const addCompleted = (e) => {
    const temp = values.completed;
    temp.push(e);
    setValues({ ...values, completed: temp });
    setDone(true);
  };
  const removeCompleted = (e) => {
    const temp = values.completed.filter((x) => e != x);
    setValues({ ...values, completed: temp });
    setDone(false);
  };
  // console.log(completed);
  useEffect(() => {
    // console.log(values);
    props.updateCard(id, props.boardId, values);
  }, [values]);
  return (
    <>
      <Modal
        onClose={() => {
          props.onClose();
        }}
      >
        <div className="h-[95vh] w-full bg-white text-black py-[2rem] flex gap-5 flex-col overflow-y-auto">
          <div className="title">
            <h1>
              <i className="fa-solid fa-t"></i> Title
            </h1>
            <AddCard
              text={heading}
              placeholder={"Add a Title"}
              style={"w-fit"}
              onSubmit={(e) => {
                setValues({ ...values, heading: e });
              }}
            />
          </div>
          <div className="description">
            <h1>
              <i className="fa-solid fa-list"></i> Description
            </h1>
            <AddCard
              text={desc}
              style={"w-fit "}
              placeholder={"Add a description"}
              onSubmit={(e) => {
                setValues({ ...values, desc: e });
              }}
            />
          </div>
          <div className="date">
            <h1>
              <i className="fa-solid fa-calendar-days"></i> Date
            </h1>
            <input
              type="date"
              className="cursor-pointer"
              defaultValue={
                date ? new Date().toISOString().substring(0, 10) : ""
              }
            />
          </div>
          <div className="labels">
            <h1>
              <i className="fa-solid fa-tag"></i> Labels
            </h1>
            <div className="flex gap-5">
              {labels.map((label, index) => {
                return (
                  <CardLabel
                    label={label}
                    key={index}
                    close={true}
                    style={"w-fit"}
                    // removeLabel={removeLabel}
                  >
                    <i
                      className="fa-solid fa-x fa-xs cursor-pointer"
                      onClick={(e) => {
                        removeLabel(label);
                      }}
                    ></i>
                  </CardLabel>
                );
              })}
            </div>
            <div className="flex gap-3 my-3">
              {randomColorArray.map((e, index) => {
                return (
                  <div
                    onClick={() => {
                      return setActiveColor(e);
                    }}
                    key={index}
                    className={`h-[15px] w-[15px] rounded-[50%] cursor-pointer ${e}`}
                    style={e === activeColor ? { scale: "1.5" } : null}
                  ></div>
                );
              })}
            </div>
            <AddCard
              text={"Add Label"}
              placeholder={"Label"}
              style={"w-fit"}
              onSubmit={(e) => {
                updateLabel(e, activeColor);
              }}
            />
          </div>
          <div className="tasks">
            <h1>
              <i className="fa-solid fa-list-check"></i>
              Tasks
            </h1>
            <div className="progress_bar_outer w-full border-red-200 border-2">
              <div
                className="progress_bar_inner h-[5px] rounded-lg bg-black "
                style={{ width: calculatePercentage() }}
              ></div>
            </div>
            <div className="task-list">
              {tasks.map((e, index) => {
                return (
                  <div
                    className="flex w-full items-center justify-between"
                    key={index}
                  >
                    <div className="flex">
                      <input
                        type="checkbox"
                        onChange={(a) => {
                          a.target.checked ? addCompleted(e) : "";
                          !a.target.checked ? removeCompleted(e) : "";
                        }}
                      />
                      <p className={done && `line-through`}>{e}</p>
                    </div>
                    <i
                      className="fa-solid fa-trash cursor-pointer"
                      onClick={() => {
                        removeTasks(e);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <AddCard
              text={"Add Task"}
              placeholder={"Enter Tas"}
              style={"w-fit"}
              onSubmit={(e) => {
                updateTasks(e);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardInfo;
