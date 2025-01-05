import { useState, useEffect } from "react";
import React from "react";
import { useUsersStore } from "../stores/users";
import { Card, Typography } from "@material-tailwind/react";
import { FormDrawer } from "../components/Form/FormDrawer";

const Home = () => {
  const store = useUsersStore();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user ID
  const [open, setOpen] = useState(false);
  const { getAll } = store;

  useEffect(() => {
    setUsers(getAll());
  }, []);

  // Open drawer for a specific user
  const openDrawer = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      {selectedUserId !== null && (
        <FormDrawer
          userId={selectedUserId}
          open={open}
          setOpen={setOpen}
          closeDrawer={closeDrawer}
        />
      )}

      {/* Data table for users */}
      {store.users && (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-right" dir="rtl">
            <thead>
              <tr>
                {store.TABLE_HEADERS.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {store.users.map(({ id, userName, age, phoneNumber }, index) => {
                const isLast = index === store.users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {userName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {age}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-heading text-primary cursor-pointer"
                        onClick={() => openDrawer(id)} // Open the drawer for the specific row
                      >
                        تعديل المعلومات
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
};
export default Home;
