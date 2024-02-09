import styles from "./control-panel.module.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context";

export const ControlPanel = ({
  isNewTodo,
  setIsNewTodo,
  isSort,
  setIsSort,
}) => {
  const { todos } = useContext(AppContext);

  const [newTodo, setNewTodo] = useState("Новая задача");
  const [findTodo, setFindTodo] = useState("Введите фрагмент задачи");
  const [idFoundTodo, setIdFoundTodo] = useState("");
  const [idUpdateTodo, setIdUpdateTodo] = useState("Введите id задачи");
  const [idDeleteTodo, setIdDeleteTodo] = useState("Введите id задачи");
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeliting] = useState(false);
  const [isFind, setIsFind] = useState(false);

  const onSubmitAddTodo = (event) => {
    event.preventDefault();
    setIsCreating(true);
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: newTodo,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Добавлена задача:", response);
      })
      .finally(() => {
        console.log("Добавлена задача:");
        setNewTodo("Новая задача");
        setIsNewTodo(!isNewTodo);
        setIsCreating(false);
      });
  };
  const onSubmitUpdateTodo = (event) => {
    event.preventDefault();
    setIsUpdating(true);
    fetch(`http://localhost:3005/todos/${idUpdateTodo}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        completed: "Выполнено: ",
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена:", response);
      })
      .finally(() => {
        setIsNewTodo(!isNewTodo);
        setIdUpdateTodo("Введите id задачи");
        setIsUpdating(false);
      });
  };

  const onSubmitDeleteTodo = (event) => {
    event.preventDefault();
    setIsDeliting(true);
    fetch(`http://localhost:3005/todos/${idDeleteTodo}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена:", response);
      })
      .finally(() => {
        setIsNewTodo(!isNewTodo);
        setIdDeleteTodo("Введите id задачи");
        setIsDeliting(false);
      });
  };

  const onClickSortTodos = () => {
    setIsSort(!isSort);
    console.log(isSort);
  };

  const onSubmitFindTodo = (event) => {
    event.preventDefault();
    setIsFind(true);
    fetch("http://localhost:3005/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        todos.forEach((element) => {
          if (element.title.toLowerCase().includes(findTodo)) {
            setIdFoundTodo(element.id);
            return element.id;
          }
        });
      })
      .finally(() => {
        setIsFind(false);
        setFindTodo("Введите фрагмент задачи");
      });
  };

  //обработчики
  const onChangeNewTodo = ({ target }) => {
    setNewTodo(target.value);
  };

  const onChangeIdUpdateTodo = ({ target }) => {
    setIdUpdateTodo(target.value);
  };

  const onChangeIdDeleteTodo = ({ target }) => {
    setIdDeleteTodo(target.value);
  };

  const onChangeFindTodo = ({ target }) => {
    setFindTodo(target.value);
  };
  return (
    <div className={styles.tools}>
      <form onSubmit={onSubmitAddTodo}>
        <input
          className={styles.input}
          type="text"
          name="newTodo"
          value={newTodo}
          onChange={onChangeNewTodo}
        ></input>
        <button className={styles.button} disabled={isCreating} type="submit">
          Добавить задачу
        </button>
      </form>
      <form onSubmit={onSubmitUpdateTodo}>
        <input
          className={styles.input}
          type="text"
          name="idUpdateTodo"
          value={idUpdateTodo}
          onChange={onChangeIdUpdateTodo}
        ></input>
        <button className={styles.button} disabled={isUpdating} type="submit">
          Задача выполнена
        </button>
      </form>
      <form onSubmit={onSubmitDeleteTodo}>
        <input
          className={styles.input}
          type="text"
          name="idDeleteTodo"
          value={idDeleteTodo}
          onChange={onChangeIdDeleteTodo}
        ></input>
        <button className={styles.button} disabled={isDeleting} type="submit">
          Удалить задачу
        </button>
      </form>
      <form onSubmit={onSubmitFindTodo}>
        <input
          className={styles.input}
          type="text"
          name="findTodo"
          value={findTodo}
          onChange={onChangeFindTodo}
        ></input>
        <input
          className={styles.input}
          type="text"
          name="foundTodo"
          value={"Id задачи:" + idFoundTodo}
        ></input>
        <button className={styles.button} disabled={isFind} type="submit">
          Найти задачу
        </button>
      </form>
      <button className={styles.button} onClick={onClickSortTodos}>
        Сортировать
      </button>
    </div>
  );
};
