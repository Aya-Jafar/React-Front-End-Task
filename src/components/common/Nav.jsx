import { Typography } from "@material-tailwind/react";

export const Nav = () => {
  return (
    <div
      className="h-[7vh] flex items-center gap-2 px-10 py-10 bg-[#F3F6F8]"
      dir="rtl"
    >
      <img src="assets/images/logo.png" alt="logo" className="h-10" />
      <Typography variant="h5" className="font-heading font-meduim">
        العنوان
      </Typography>
    </div>
  );
};
