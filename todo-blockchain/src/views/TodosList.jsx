import { EthContext } from "../providers";
import { useContext } from "react";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const { todos } = useContext(EthContext);

  return (
    <div className="mt-4">
      <ul className="list-group">
        {todos.map((todo, index) => (
          <TodoItem key={index} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
