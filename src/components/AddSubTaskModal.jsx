import { AiOutlineClose } from "react-icons/ai";
import TodoInput from "./TodoInput";

const AddSubTaskModal = ({ parentId, taskGroup, handleModalView }) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="top-40 h-[20rem] w-[40rem] p-10 border-2 border-amber-800 rounded-md bg-white relative">
        <span className="absolute top-3 right-5">
          <AiOutlineClose className="text-xl" onClick={handleModalView} />
        </span>
        <h3 className="mb-10 font-bold text-md text-center">Add Subtask</h3>
        <div className="w-[34rem]">
          <TodoInput parentId={parentId} taskGroup={taskGroup} />
        </div>
      </div>
    </div>
  );
};

export default AddSubTaskModal;
