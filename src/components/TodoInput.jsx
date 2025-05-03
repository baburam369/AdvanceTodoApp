import { useRef, useEffect, useState } from "react";
import { todoGroupsList } from "../config/todo-config";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const TodoInput = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState("Daily");
  const [priority, setPriority] = useState("Low");
  const [task, setTask] = useState("");

  const inputRef = useRef(null);

  //input box focus on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //format date like -> May 6, 2020
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleAddTask = (parentId) => {
    const todoTask = {
      id: generateId(),
      todoGroup: selectedGroup,
      todoText: task,
      isCompleted: false,
      isEditing: false,
      dueDate,
      priority,
      parentId,
    };

    console.log(todoTask);
  };

  return (
    <div className="flex flex-col border rounded-xl border-gray-600">
      <div className="flex gap-3 p-3 pl-5 pr-5 rounded-xl">
        <span>
          <input
            ref={inputRef}
            className="border border-gray-400 p-2 w-3xs rounded-md"
            type="text"
            placeholder="What needs to be done ?"
            onChange={(e) => setTask(e.target.value)}
          />
        </span>

        <span>
          <DatePicker
            className="border  border-gray-400 p-2 w-27  rounded-md"
            selected={dueDate}
            onChange={(date) =>
              setDueDate(date.toLocaleDateString(undefined, options))
            }
            dateFormat="dd/MM/yy"
          />
        </span>

        <span>
          <select
            defaultValue=""
            className="border  border-gray-400 p-2 w-26  rounded-md"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>
              Priority
            </option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
          </select>
        </span>
      </div>

      <div className="flex gap-20">
        <div className=" ml-3 p-2 flex gap-3  ">
          {todoGroupsList &&
            todoGroupsList.map((group, index) => (
              <label
                key={index}
                className=" radio-inp cursor-pointer border border-gray-400 p-1 pl-3 pr-3 rounded-xl"
              >
                <input
                  type="radio"
                  value={group}
                  className="appearance-none"
                  checked={selectedGroup === group}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                />
                {group}
              </label>
            ))}
        </div>

        <span className="p-2">
          <button
            className="ml-6 border rounded-md disabled:bg-gray-100 disabled:text-gray-400   bg-blue-200 p-1 pl-2 pr-3 "
            onClick={() => handleAddTask(null)}
            disabled={!task}
          >
            Add Task
          </button>
        </span>
      </div>
    </div>
  );
};

export default TodoInput;

//generate random id
function generateId() {
  let id = Math.floor(Date.now() * Math.random() * 2341)
    .toString()
    .substring(0, 7);
  return id;
}
