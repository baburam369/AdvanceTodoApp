import { useMemo } from "react";
import { useTodoContext } from "../contexts/todoContext";
import TodoItem from "./TodoItem";

import TodoInput from "./TodoInput";

const TodoList = () => {
  const { todos } = useTodoContext();

  function todosGroupedAndNested(todos) {
    const groupedTodos = Object.groupBy(todos, ({ todoGroup }) => todoGroup);

    const updatedTask = {};
    const newGroup = [];

    console.log(todos);

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

  const groupedNestedTask = useMemo(
    () => todosGroupedAndNested(todos),
    [todos]
  );

  return (
    <div className="flex flex-col justify-center items-center text-sm">
      <TodoInput parentId={null} />
      <div className=" mt-3 overflow-hidden relative  border border-gray-100 shadow-md  ">
        <div className="sticky w-[34rem] h-[31.5rem] overflow-auto  ">
          <div className="m-4 ">
            {Object.entries(groupedNestedTask).map(
              ([groupName, todos], index) => (
                <div key={index} className="">
                  <h3 className="text-sm font-sans">{groupName}</h3>
                  {todos.map((todo) => (
                    <div key={todo.id} className=" m-2 font-sans ">
                      <TodoItem todo={todo} />
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
