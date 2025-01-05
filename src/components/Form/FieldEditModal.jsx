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
import { useForm } from "react-hook-form";
import { requiredText } from "../../utils/validators";

export const FieldEditModal = ({
  userId,
  fieldName,
  fieldLabel,
  fieldValidator,
  currentValue,
  open,
  setOpen,
  onFieldChange,
}) => {
  const [nextModalOpen, setNextModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue(fieldName, currentValue); // Set initial field value
  }, [currentValue, setValue, fieldName]);

  const onSubmit = (data) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      oldValue: currentValue,
      newValue: data[fieldName], // Updated field value
    }));
    setOpen(false); // Close the edit modal
    setNextModalOpen(true); // Open confirmation modal
  };

  return (
    <>
      {/* Edit Modal */}
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
            تعديل {fieldLabel}
          </Typography>
        </div>

        <DialogBody className="font-heading">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Typography color="blue-gray" className="font-heading">
                {fieldLabel}
              </Typography>
              <Input
                name={fieldName}
                {...register(fieldName, fieldValidator)}
                type="text"
                label={fieldLabel}
                error={!!errors[fieldName]}
              />
              {errors[fieldName] && (
                <Typography
                  variant="small"
                  color="red"
                  className="font-heading mt-1"
                >
                  {errors[fieldName]?.message}
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

      {/* Confirmation Modal */}
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
            هل انت متأكد من تعديل {fieldLabel}؟
          </Typography>
        </div>
        {submittedData && (
          <DialogBody className="font-heading">
            <div>
              <Typography className="font-heading">
                {fieldLabel} الحالي: {submittedData.oldValue}
              </Typography>

              <Typography className="font-heading">
                {fieldLabel} بعد التعديل: {submittedData.newValue}
              </Typography>
            </div>
          </DialogBody>
        )}
        <DialogFooter>
          <Button
            className="w-full bg-black font-heading"
            onClick={() => {
              onFieldChange(submittedData.newValue);
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
