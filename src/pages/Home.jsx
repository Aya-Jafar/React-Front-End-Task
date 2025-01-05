import { useState, useEffect } from "react";
import { useUsersStore } from "../stores/users";
import { LayoutBuilder } from "../components/LayoutBuilder/LayoutBuilder";
import { FormDrawer } from "../components/Form/FormDrawer"; // Import the FormDrawer

export default function Home() {
  const [users, setUsers] = useState([]);

  const { getAll } = useUsersStore();

  useEffect(() => {
    setUsers(getAll());
  }, []);

  return (
    <LayoutBuilder>
      {users.length > 0 && <FormDrawer userId={1} />}
    </LayoutBuilder>
  );
}
