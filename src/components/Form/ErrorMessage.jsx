import { Typography } from "@material-tailwind/react";

export const ErrorMessage = ({ field }) => {
  return (
    field && (
      <Typography variant="small" color="red" className="font-heading mt-1">
        {field?.message}
      </Typography>
    )
  );
};
