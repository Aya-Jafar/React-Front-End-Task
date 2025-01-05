import { useState, useEffect } from "react";
import { useUsersStore } from "../stores/users";
import { FormDrawer } from "../components/Form/FormDrawer"; // Import the FormDrawer

export default function Home() {
  const [users, setUsers] = useState([]);
  const { getAll } = useUsersStore();

  useEffect(() => {
    setUsers(getAll());
  }, []);

  return users.length > 0 && <FormDrawer userId={1} />;
}
