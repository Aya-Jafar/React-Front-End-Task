import {
  Button,
  Dialog,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export const ConfirmationModal = ({ open, setOpen, onConfirm }) => {
  return (
    <Dialog
      open={open}
      handler={() => setNextModalOpen(false)}
      dir="rtl"
      className="font-heading"
      size="xs"
    >
      <IconButton
        variant="text"
        color="blue-gray"
        onClick={() => setOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
      <div className="px-5 mt-3 text-black">
        <Typography className="font-heading" variant="h5">
          هل انت متأكد من تعديل المعلومات ؟
        </Typography>
      </div>
      <DialogFooter>
        <Button
          className="w-full bg-black mt-10 font-heading"
          onClick={() => {
            onConfirm();
            setOpen(false)
          }}
        >
          <span>متأكد</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
