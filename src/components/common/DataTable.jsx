import { Card, Typography } from "@material-tailwind/react";
import { FormDrawer } from "../Form/FormDrawer";
import React from "react";

export const DataTable = ({ tableRows, tableHeaders }) => {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-right" dir="rtl">
        <thead>
          <tr>
            {tableHeaders.map((head) => (
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
          {tableRows.map(({ id, userName, age, phoneNumber }, index) => {
            const [open, setOpen] = React.useState(false); // Individual state per row
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const openDrawer = () => setOpen(true);
            const closeDrawer = () => setOpen(false);

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
                    className="font-heading"
                    onClick={openDrawer} // Open the drawer for this row
                  >
                    تعديل المعلومات
                  </Typography>
                </td>

                <FormDrawer
                  userId={id}
                  open={open}
                  setOpen={setOpen} // Close the drawer when needed
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
