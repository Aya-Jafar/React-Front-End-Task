import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { phoneValidator, requiredText } from "../../utils/validators";
import { useForm } from "react-hook-form";
import { useUsersStore } from "../../stores/users";

export const PhoneNumberModal = ({
  userId,
  open,
  setOpen,
  onPhoneNumberChange,
}) => {
  const store = useUsersStore();
  const [nextModalOpen, setNextModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      newPhoneNumber: data.phoneNumber, // Add new phone number
    }));
    setOpen(false); // Close the current modal
    setNextModalOpen(true); // Open the confirmation modal
  };

  useEffect(() => {
    const user = store.getByID(userId);
    if (user) {
      setSubmittedData((prevData) => ({
        ...prevData,
        oldPhoneNumber: user.phoneNumber, // Set oldPhoneNumber without overriding newPhoneNumber
      }));
    }
  }, [userId]);

  return (
    <>
      {/* First Modal */}
      <Dialog
        open={open}
        handler={() => setOpen(false)}
        dir="rtl"
        className="font-heading"
      >
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpen(false)}
          className="mt-5"
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
        <div className="text-primary px-5">
          <Typography className="font-heading" variant="h5">
            تعديل رقم الهاتف
          </Typography>
        </div>

        <DialogBody className="font-heading">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Typography color="blue-gray" className="font-heading">
                رقم الهاتف
              </Typography>
              <Input
                name="phoneNumber"
                {...register("phoneNumber", phoneValidator)}
                type="text"
                label="رقم الهاتف"
                error={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <Typography
                  variant="small"
                  color="red"
                  className="font-heading mt-1"
                >
                  {errors.phoneNumber?.message}
                </Typography>
              )}
            </div>
            <div className="mt-4">
              <Typography color="blue-gray" className="font-heading">
                السبب
              </Typography>
              <Input
                name="reason"
                {...register("reason", requiredText)}
                type="text"
                label="السبب"
                error={!!errors.reason}
              />
              {errors.reason && (
                <Typography
                  variant="small"
                  color="red"
                  className="font-heading mt-1"
                >
                  {errors.reason?.message}
                </Typography>
              )}
            </div>
            <div className="mt-4">
              <Button type="submit" className="bg-primary font-heading w-full">
                <span>تعديل</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      {/* Second Modal */}
      <Dialog
        open={nextModalOpen}
        handler={() => setNextModalOpen(false)}
        dir="rtl"
        className="font-heading"
      >
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setNextModalOpen(false)}
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
            هل انت متأكد من تعديل رقم الهاتف ؟
          </Typography>
        </div>
        {submittedData && (
          <DialogBody className="font-heading">
            <div>
              <Typography className="font-heading">
                رقم الهاتف الحالي: {submittedData.oldPhoneNumber}
              </Typography>

              <Typography className="font-heading">
                رقم الهاتف بعد التعديل: {submittedData.newPhoneNumber}
              </Typography>
            </div>
          </DialogBody>
        )}
        <DialogFooter>
          <Button
            className="w-full bg-black font-heading"
            onClick={() => {
              onPhoneNumberChange(submittedData.newPhoneNumber);
              setNextModalOpen(false);
            }}
          >
            <span>متأكد</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
