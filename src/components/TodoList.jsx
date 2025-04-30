import { useEffect, useMemo, useState } from "react";
import RenderTodos from "./RenderTodos";

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
      {groupedNestedTask.map((task, index) => (
        <RenderTodos key={index} task={task} />
      ))}
    </div>
  );
};

export default TodoList;
