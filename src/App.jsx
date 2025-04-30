import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
import { useTodoContext } from "./contexts/todoContext";

function App() {
  return (
    <>
      <div className="container flex flex-col gap-6 m-7">
        <NavBar />
        <TodoList />
      </div>
    </>
  );
}

export default App;
