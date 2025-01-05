import { useState, useEffect } from "react";
import { useUsersStore } from "../stores/users";
import { FormDrawer } from "../components/Form/FormDrawer"; // Import the FormDrawer
import { DataTable } from "../components/common/DataTable";

export default function Home() {
  const store = useUsersStore();
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState();
  const { getAll } = store;

  useEffect(() => {
    setUsers(getAll());
  }, []);

  return (
    <>
      {/* {store.mockData && (
        <DataTable
          tableHeaders={store.TABLE_HEADERS}
          tableRows={store.mockData}
        />
      )} */}

      <div onClick={()=>setOpen(true)}>click</div>
      <FormDrawer userId={1} setOpen={setOpen} open={open} />
    </>
  );
}
