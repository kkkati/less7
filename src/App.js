import { useState, useEffect } from "react";
import { Todo } from "./components";
import { ControlPanel } from "./components";
import styles from "./app.module.css";
import { AppContext } from "./context";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewTodo, setIsNewTodo] = useState(false);

  const [isSort, setIsSort] = useState(false);
  const todosSort = isSort
    ? todos.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      })
    : todos;

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3005/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      })
      .finally(() => setIsLoading(false));
  }, [isNewTodo]);

  return (
    <AppContext.Provider value={todos}>
      <div className={styles.app}>
        <ControlPanel
          setIsNewTodo={setIsNewTodo}
          isSort={isSort}
          setIsSort={setIsSort}
        />
        <div className={styles.todosContainer}>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            todosSort.map(({ id, title, completed }) => (
              <Todo key={id} title={title} completed={completed} id={id}></Todo>
            ))
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
