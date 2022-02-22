import { logout } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import { useNavigate } from "react-router";
import React from "react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

export const AddToDo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
  const [todos, setTodos] = React.useState<any>([]);

  const handleLogout = async () => {
    try {
      await logout();
      await localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const q = query(collection(db, "todo"));

    let todosArray: any = [];

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArray);
    });
  }, []);
  console.log(todos);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (title !== "") {
      await addDoc(collection(db, "todo"), {
        title,
        completed: false,
      });

      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add ToDo!!</h1>
      <input
        type="text"
        placeholder="Enter ToDo..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <button type="submit">Submit</button>
      <button onClick={handleLogout}> Sign Out </button>
    </form>
  );
};
