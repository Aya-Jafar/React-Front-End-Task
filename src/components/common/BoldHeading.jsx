import { Typography } from "@material-tailwind/react";


export const BoldHeader = ({ text }) => {
  return (
    <Typography variant="h5" className="font-heading font-meduim">
      {text}
    </Typography>
  );
};
