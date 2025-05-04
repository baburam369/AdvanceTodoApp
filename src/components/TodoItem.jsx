import { AiOutlineDelete } from "react-icons/ai";
import { useTodoContext } from "../contexts/todoContext";

const TodoItem = ({ todo }) => {
  const { handleTodoDelete } = useTodoContext();
  return (
    <div className="pl-3 p-3 m-2 border rounded-md  ">
      <div className="flex flex-col">
        {/* insert plus icon for add subtask */}
        {/* {!todo.parentId ? <span>&#x2b;</span> : null} */}
        <div className="flex justify-between">
          <span>
            <label>
              <input type="checkbox" />
              <span> {todo.todoText}</span>
            </label>
          </span>

          <span
            className="text-[1.2rem] text-red-800"
            onClick={() => handleTodoDelete(todo.id)}
          >
            <AiOutlineDelete />
          </span>
        </div>
        <div className="flex justify-between ml-[1.1rem] gap-8">
          <span>Due: {todo.dueDate}</span>
          <span>Priority: {todo.priority}</span>
        </div>
      </div>
      {todo.children?.length > 0 &&
        todo.children.map((child) => <TodoItem key={child.id} todo={child} />)}
    </div>
  );
};

export default TodoItem;
