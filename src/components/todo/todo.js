import styles from "./todo.module.css";

export const Todo = ({ id, title, completed }) => {
  return (
    <li className={styles.todos} key={id}>
      {completed}
      {title}. Id:
      {id}
    </li>
  );
};
