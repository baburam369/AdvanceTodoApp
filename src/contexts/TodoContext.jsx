import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoAdd = async (todoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
    } catch (error) {
      console.error(error);
    }
  };

  //toggle todo complete(check/uncheck)
  const toggleTodo = async (e, todo) => {
    const taskState = e.target.checked;
    const id = todo.id;
    const children = todo.children;

    //single task, no children
    if (!children.length && !todo.parentId) {
      updateTodoState(id, taskState);
    }
    //subtask
    if (!children.length && todo.parentId) {
      updateTodoState(id, taskState);
      updateTodoState(todo.parentId, false);

      /* on all child task complete, mark parent also complete otherwise mark incomplete */
      const getAllSubTasks = todos.filter(
        (task) => task.parentId === todo.parentId
      );

      let allSubtaskCompleted = 0;
      getAllSubTasks.forEach((task) => {
        if (task.isCompleted) {
          allSubtaskCompleted += 1;
        }
      });

      if (allSubtaskCompleted === getAllSubTasks.length) {
        updateTodoState(todo.parentId, taskState);
      } else {
        updateTodoState(todo.parentId, false);
      }
    }

    /*on parent task complete mark all child task complete */
    const subTasksIds = children.map((task) => task.id);
    const tasksToToggle = [...subTasksIds, id];
    tasksToToggle.forEach((taskId) => updateTodoState(taskId, taskState));

    /* direct modify todoList */
    function updateTodoState(id, taskState) {
      const todoObj = [...todos];
      const todoToToggle = todoObj.find((todo) => todo.id === id);
      todoToToggle.isCompleted = taskState;

      setTodos(todoObj);
    }

    //api call
    // async function updateTodoState(id, taskState) {
    //   const todoObj = [...todos];
    //   const todoToToggle = todoObj.find((todo) => todo.id === id);

    //   const payload = {
    //     ...todoToToggle,
    //     isCompleted: taskState,
    //   };
    //   try {
    //     const response = await axios.put(
    //       `${API_BASE_URL}/todos/${id}`,
    //       payload
    //     );
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  const handleTodoDelete = async (id) => {
    /*Handling deletion of subtasks if parents get deleted*/

    /*get all subtasks pertaining to the id(if any) */
    const subTasks = todos.filter((todo) => todo.parentId === id);

    /*no subtasks? directly delete the task : get all the ids of subtasks & parent and delete them*/
    if (!subTasks.length) {
      deleteTask(id);
    } else {
      const getSubTasksId = subTasks.map((task) => task.id);
      const tasksToDelete = [...getSubTasksId, id];

      tasksToDelete.forEach((id) => deleteTask(id));
    }

    async function deleteTask(id) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleTodoAdd,
        handleTodoDelete,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  return context;
};
