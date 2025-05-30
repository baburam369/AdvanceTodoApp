import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
import { useTodoContext } from "./contexts/todoContext";

function App() {
  return (
    <>
      <div className=" flex flex-col gap-6 h-screen ">
        <NavBar />
        <TodoList />
      </div>
    </>
  );
}

export default App;
