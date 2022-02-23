import { logout } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import { useNavigate } from "react-router";
import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

export const AddToDo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
  const [todos, setTodos] = React.useState<any>();

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

    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray: any = [];
      querySnapshot.forEach((doc: any) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo: any, e: React.SyntheticEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, "todo", todo.id), { title: title });
    setTitle("");
  };

  const handleDelete = async (id: any) => {
    setTitle("");
    await deleteDoc(doc(db, "todo", id));
  };

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
      <br />
      <div>
        <button type="submit">Submit</button>
        <button onClick={handleLogout}> Sign Out </button>
      </div>
      <br />
      <div>
        {todos?.map((todo: any) => {
          return (
            <div key={todo.id}>
              <span>{todo.title}</span>&nbsp;&nbsp;
              <button onClick={(e) => handleEdit(todo, e)}>Edit</button>
              &nbsp;&nbsp;
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </form>
  );
};
