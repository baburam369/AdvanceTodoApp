import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useTodoContext } from "../contexts/todoContext";
import { useState } from "react";
import TodoInput from "./TodoInput";
import AddSubTaskModal from "./AddSubTaskModal";

const TodoItem = ({ todo }) => {
  const [isHover, setIshover] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { handleTodoDelete, toggleTodo } = useTodoContext();

  const handleModalView = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="pl-3 p-3 m-2 border rounded-md relative">
      <div
        className="flex flex-col"
        onMouseEnter={() => setIshover(!isHover)}
        onMouseLeave={() => setIshover(!isHover)}
      >
        {/* insert plus icon for add subtask */}
        {/* {!todo.parentId ? <span>&#x2b;</span> : null} */}
        <div className="flex justify-between ">
          <span>
            <label className="has-checked:line-through">
              <input
                type="checkbox"
                className="check-box "
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.todoText}</span>
            </label>
          </span>

          <div className="flex gap-2 ml-1">
            {isHover ? (
              <span
                className="text-[1.2rem] "
                onClick={() => handleTodoDelete(todo.id)}
                data-title="Delete Task"
              >
                <AiOutlineClose />
              </span>
            ) : null}
            {!todo.parentId ? (
              <span className="text-[1.2rem]" data-title="Add Subtask">
                <AiOutlinePlus onClick={handleModalView} />
              </span>
            ) : null}
          </div>
          {isOpenModal ? (
            <div className="fixed top-0 left-0 z-50  h-full w-full ">
              <AddSubTaskModal
                parentId={todo.id}
                taskGroup={todo.todoGroup}
                handleModalView={handleModalView}
              />
            </div>
          ) : null}
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
