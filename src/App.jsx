import { useState, useEffect } from "react";
import { useUsersStore } from "./stores/useUsersStore";
import "./App.css";
import { FormDrawer } from "./components/FormDrawer";

export default function App() {
  const [users, setUsers] = useState([]);

  const { getAll } = useUsersStore();

  useEffect(() => {
    setUsers(getAll());
  }, []);

  return <>{users.length > 0 && <FormDrawer userId={1} />}</>;
}
