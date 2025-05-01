import { useEffect, useMemo, useRef, useState } from "react";
import { useTodoContext } from "../contexts/todoContext";
import TodoItem from "./TodoItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TodoList = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const { todos } = useTodoContext();
  const inputRef = useRef(null);

  //input box focus on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function todosGroupedAndNested(todos) {
    const groupedTodos = Object.groupBy(todos, ({ todoGroup }) => todoGroup);

    const updatedTask = {};
    const newGroup = [];

    for (const group in groupedTodos) {
      const roots = [];

      // Create shallow copies with children array
      groupedTodos[group].forEach((todo) => {
        updatedTask[todo.id] = { ...todo, children: [] };
      });

      //link children to parents (subtask)
      groupedTodos[group].forEach((todo) => {
        if (todo.parentId) {
          //fetch parent
          const parent = updatedTask[todo.parentId];
          if (parent) {
            //push into the children array the todo referencing parentID
            parent.children.push(updatedTask[todo.id]);
          }
        } else {
          roots.push(updatedTask[todo.id]);
        }
      });

      newGroup[group] = roots;
    }
    return newGroup;
  }

  //   console.log(todosGroupedAndNested(todos));

  //   useEffect(() => {
  //     setNestedTask(buildTree(todos));
  //   }, [todos]);

  const groupedNestedTask = useMemo(
    () => todosGroupedAndNested(todos),
    [todos]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <form action="">
        <div className="flex gap-3 p-3 pl-5 pr-5 rounded-xl">
          <span>
            <input
              ref={inputRef}
              className="border border-gray-400 p-2 w-3xs rounded-md"
              type="text"
              placeholder="What needs to be done ?"
            />
          </span>

          <span>
            <DatePicker
              className="border  border-gray-400 p-2 w-27  rounded-md"
              selected={dueDate}
            />
          </span>

          <span>
            <select
              defaultValue=""
              className="border  border-gray-400 p-2 w-26  rounded-md"
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
      </form>
      <div className="pl-10 mt-2">
        {Object.entries(groupedNestedTask).map(([groupName, todos], index) => (
          <div key={index}>
            <h3>{groupName}</h3>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
