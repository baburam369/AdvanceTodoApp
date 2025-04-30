import { useEffect, useMemo, useState } from "react";
import { useTodoContext } from "../contexts/todoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  //   const [nestedTask, setNestedTask] = useState([]);
  const { todos } = useTodoContext();

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
  );
};

export default TodoList;
