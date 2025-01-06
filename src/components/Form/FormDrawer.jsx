import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import { useUsersStore } from "../../stores/users";
import { useForm } from "react-hook-form";
import { ConfirmationModal } from "./ConfirmationModal";
import { ErrorMessage } from "./ErrorMessage";
import {
  phoneValidator,
  requiredText,
  emailValidator,
  numericValidator,
  cardNumberValidator,
  googleMapsUrlValidator,
} from "../../utils/validators";
import { handleFieldCopy } from "../../utils/helpers";
import { DocumentUploader } from "./DocumentsUploader";
import { AdditionalDocuments } from "./AdditionalDocuments";
import { FieldEditModal } from "./FieldEditModal";
import { CloseIcon } from "../common/CloseIcon";
import { BoldHeader } from "../common/BoldHeading";

export const FormDrawer = ({ userId, open, setOpen }) => {
  // Store initialization
  const store = useUsersStore();
  const {
    getByID,
    getGuildList,
    getMarraigeYearsOptions,
    getCities,
    getBaghdadAreas,
  } = store;

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Local States
  const [currentUser, setCurrentUser] = useState(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [tempData, setTempData] = useState(null); // Temporary storage for form data
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const user = getByID(userId); // Get the updated user based on userId
    setCurrentUser(user);
    if (user) {
      // If in edit mode, refill the fields values based on the user fields
      Object.entries(user).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key, value);
        }
      });
    }
  }, [userId]); // Re-run the effect whenever userId changes


  const onSubmit = async (data) => {
    if (isPhoneModalOpen || isEmailModalOpen || isNameModalOpen) return; // To ensure that corfirm and edit modals are not opened togather

    // Store the form data temporarily
    setTempData(data);

    // Delay showing confirmation to ensure proper state update
    setTimeout(() => {
      setConfirmModal(true);
    }, 0);
  };

  /**
   * Callback function to update user
   */
  const handleConfirmUpdate = () => {
    if (tempData) {
      // Update the user with the temporarily stored data
      store.update(currentUser.id, tempData);

      // Clear temporary data after the update
      setTempData(null);
    }
  };

  /**
   * Callback function to update any field from modal
   */
  const handleFieldChange = (fieldName, newValue) => {
    setCurrentUser((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
    setValue(fieldName, newValue); // Update form field in form
  };


  return (
    currentUser && (
      <div className="flex items-center justify-center">
        <Drawer
          open={open}
          onClose={closeDrawer}
          className={`transform transition-all px-4 sm:max-w-full ${
            open ? "translate-x-0" : "!-translate-x-[85vw]"
          } w-[85vw] !max-w-[85vw] h-full overflow-y-scroll`}
          dir="rtl"
        >
          <div className="px-4 pb-2">
            {/* Close Icon */}
            <CloseIcon onClose={closeDrawer} />

            {/* Username & Edit icon */}
            <div className="flex items-center">
              <Typography variant="h5" className="font-heading font-bold">
                {currentUser.userName}
              </Typography>
              <IconButton
                variant="text"
                onClick={() => setIsNameModalOpen(true)}
              >
                <i class="fa-regular fa-pen-to-square fa-xl"></i>
              </IconButton>
            </div>

            <div className="flex items-center gap-3 justify-between flex-wrap">
              <div className="flex">
                {/* Phone Number & it's edit icon */}
                <div className="flex items-center">
                  <Typography className="font-heading font-[400] text-primary">
                    {currentUser.phoneNumber}
                  </Typography>
                  <IconButton
                    variant="text"
                    onClick={() => setIsPhoneModalOpen(true)}
                  >
                    <i class="fa-regular fa-pen-to-square fa-xl"></i>
                  </IconButton>
                </div>
                {/* Email & it's edit icon */}
                <div className="flex items-center justify-between">
                  <Typography className="font-heading font-[400]">
                    {currentUser.email}
                  </Typography>
                  <IconButton
                    variant="text"
                    onClick={() => setIsEmailModalOpen(true)}
                  >
                    <i class="fa-regular fa-pen-to-square fa-xl"></i>
                  </IconButton>
                </div>
              </div>

              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ml-2">
                  مفعل
                </span>
                <div class="relative w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-200"></div>
              </label>
            </div>
          </div>

          <div className="my-3 px-4">
            <BoldHeader text={"المعلومات الرئيسية"} />
          </div>

          <form
            className="flex flex-col gap-5 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Row */}
            <div className="responsive-two-cols-per-row">
              {/* Column 1: الرمز */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  الرمز
                </Typography>
                <Input
                  name="code"
                  {...register("code", requiredText)}
                  type="text"
                  label="الرمز"
                  error={!!errors.code}
                />
                <ErrorMessage field={errors.code} />
              </div>

              {/* Column 2: رقم الهاتف */}
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
                <ErrorMessage field={errors.phoneNumber} />
              </div>
            </div>

            {/* Second Row */}
            <div className="responsive-four-cols-per-row">
              {/* Column 1: البريد */}
              <div className="relative w-full">
                <Typography color="blue-gray" className="font-heading">
                  البريد الالكتروني الخاص بالعمل
                </Typography>
                <div className="relative">
                  <span
                    className="absolute inset-y-0 !left-3 flex items-center text-blue-gray cursor-pointer z-10"
                    onClick={() =>
                      handleFieldCopy("email", setToastOpen, setToastMessage)
                    }
                  >
                    <i class="fa-regular fa-copy cursor-pointer"></i>
                  </span>
                  <Input
                    name="email"
                    {...register("email", emailValidator)}
                    type="text"
                    label="البريد الالكتروني الخاص بالعمل"
                    error={!!errors?.email}
                  />
                  <ErrorMessage field={errors.email} />
                </div>
              </div>

              {/* Column 2: العمر */}
              <div className="relative w-full">
                {/* Copy icon */}
                <Typography color="blue-gray" className="font-heading">
                  العمر
                </Typography>
                <div className="relative">
                  <span
                    className="absolute inset-y-0 !left-3 flex items-center text-blue-gray cursor-pointer z-10"
                    onClick={() =>
                      handleFieldCopy("age", setToastOpen, setToastMessage)
                    }
                  >
                    <i class="fa-regular fa-copy cursor-pointer"></i>
                  </span>
                  <Input
                    name="age"
                    {...register("age", numericValidator)}
                    type="text"
                    label="العمر"
                    className="pl-10"
                    error={!!errors?.age}
                  />
                </div>
                <ErrorMessage field={errors.age} />
              </div>

              {/* Column 3: الراتب */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  الراتب
                </Typography>
                <Input
                  name="salary"
                  {...register("salary", numericValidator)}
                  type="text"
                  label="مثلا : 900,000 د.ع"
                  error={!!errors?.salary}
                />
                <ErrorMessage field={errors.salary} />
              </div>

              {/* Column 4: رقم البطاقة */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  رقم بطاقة الهوية الموحدة
                </Typography>
                <Input
                  {...register("cardNumber", cardNumberValidator)}
                  type="text"
                  label="رقم بطاقة الهوية الموحدة"
                  error={!!errors?.cardNumber}
                />
                <ErrorMessage field={errors.cardNumber} />
              </div>
            </div>

            {/* Third Row */}
            <div>
              <Typography color="blue-gray" className="font-heading">
                النقابة التي تنتمي لها
              </Typography>

              <div>
                <Select
                  name="guild"
                  {...register("guild", requiredText)}
                  value={currentUser?.guild}
                  className="font-heading"
                  error={!!errors.guild}
                  label="النقابة التي تنتمي لها"
                >
                  {getGuildList().map((guild, index) => (
                    <Option key={index} value={guild}>
                      {guild}
                    </Option>
                  ))}
                </Select>
                <ErrorMessage field={errors.guild} />
              </div>
            </div>

            <BoldHeader text={"الحالة الاجتماعية"} className="mt-2" />

            {/* Fourth Row */}
            <div className="responsive-two-cols-per-row">
              <div>
                <Typography color="blue-gray" className="font-heading">
                  الحالة الاجتماعية
                </Typography>
                <Select
                  name="socialStatus"
                  {...register("socialStatus", requiredText)}
                  value={currentUser?.socialStatus}
                  error={!!errors.socialStatus}
                  label="الحالة الاجتماعية"
                  className="font-heading"
                >
                  <Option value="متزوج">متزوج</Option>
                  <Option value="اعزب">اعزب</Option>
                </Select>
                <ErrorMessage field={errors.socialStatus} />
              </div>
              <div>
                <Typography color="blue-gray" className="font-heading">
                  عدد سنوات الزواج
                </Typography>

                <Select
                  name="marraigeYears"
                  {...register("marraigeYears", requiredText)}
                  value={currentUser?.marraigeYears}
                  className="font-heading"
                  error={!!errors.marraigeYears}
                  label="عدد سنوات الزواج"
                >
                  {getMarraigeYearsOptions().map((year, index) => (
                    <Option key={index} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
                <ErrorMessage field={errors.marraigeYears} />
              </div>
            </div>

            <div className="mt-2">
              <BoldHeader text={"الاقامة و السكن"} />
            </div>

            {/* Fifth row */}
            <div className="responsive-three-cols-per-row">
              <div>
                <Typography className="font-heading font-meduim">
                  المدينة
                </Typography>

                <Select
                  name="city"
                  {...register("city", requiredText)}
                  value={currentUser?.city}
                  error={!!errors.city}
                  label="المدينة"
                  className="font-heading"
                >
                  {getCities().map((city, index) => (
                    <Option key={index} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>

                <ErrorMessage field={errors.city} />
              </div>
              <div>
                <Typography className="font-heading font-meduim">
                  المنطقة
                </Typography>
                <Select
                  name="area"
                  {...register("area", requiredText)}
                  value={currentUser.area}
                  className="font-heading"
                  error={!!errors.area}
                  label="المنطقة"
                >
                  {getBaghdadAreas().map((area, index) => (
                    <Option key={index} value={area}>
                      {area}
                    </Option>
                  ))}
                </Select>
                <ErrorMessage field={errors.area} />
              </div>
              <div>
                <Typography color="blue-gray" className="font-heading">
                  رابط الخارطة{" "}
                </Typography>
                <Input
                  name="mapLink"
                  {...register("mapLink", googleMapsUrlValidator)}
                  type="text"
                  label=" رابط الخارطة  "
                  error={!!errors?.mapLink}
                />
                <ErrorMessage field={errors.mapLink} />
              </div>
            </div>

            {/* Sixth row */}
            <div className="responsive-three-cols-per-row">
              <div>
                <Typography color="blue-gray" className="font-heading">
                  المحلة
                </Typography>
                <Input
                  name="neighborhood"
                  {...register("neighborhood", requiredText)}
                  type="text"
                  label="المحلة"
                  error={!!errors?.neighborhood}
                />
                <ErrorMessage field={errors.neighborhood} />
              </div>

              <div>
                <Typography color="blue-gray" className="font-heading">
                  الزقاق
                </Typography>
                <Input
                  name="alley"
                  {...register("alley", requiredText)}
                  type="text"
                  label="الزقاق"
                  error={!!errors?.alley}
                />
                <ErrorMessage field={errors.alley} />
              </div>

              <div>
                <Typography color="blue-gray" className="font-heading">
                  الدار
                </Typography>
                <Input
                  placeholder="house"
                  {...register("house", requiredText)}
                  type="text"
                  label="الدار"
                  error={!!errors?.alley}
                />
                <ErrorMessage field={errors.house} />
              </div>
            </div>

            {/* Documents section */}
            <div>
              <DocumentUploader userId={userId} />
              <AdditionalDocuments userId={userId} />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="md:w-[14%] sm:w-[30%] font-heading bg-primary text-md"
              >
                حفظ التعديلات
              </Button>
            </div>

            {/* Field edit modals */}
            <FieldEditModal
              userId={userId}
              fieldName="phoneNumber"
              fieldLabel="رقم الهاتف"
              fieldValidator={phoneValidator}
              currentValue={currentUser.phoneNumber}
              open={isPhoneModalOpen}
              setOpen={setIsPhoneModalOpen}
              onFieldChange={(newPhoneNumber) => {
                handleFieldChange("phoneNumber", newPhoneNumber);
              }}
            />

            <FieldEditModal
              userId={userId}
              fieldName="email"
              fieldLabel="البريد الالكتروني"
              fieldValidator={emailValidator}
              currentValue={currentUser.email}
              open={isEmailModalOpen}
              setOpen={setIsEmailModalOpen}
              onFieldChange={(newEmail) => {
                handleFieldChange("email", newEmail);
              }}
            />

            <FieldEditModal
              userId={userId}
              fieldName="userName"
              fieldLabel="اسم المستخدم"
              fieldValidator={requiredText}
              currentValue={currentUser.userName}
              open={isNameModalOpen}
              setOpen={setIsNameModalOpen}
              onFieldChange={(newName) => {
                handleFieldChange("userName", newName);
              }}
            />

            {/* Confirm modal after submit */}
            {showConfirmModal && (
              <ConfirmationModal
                open={showConfirmModal}
                setOpen={setConfirmModal}
                onConfirm={handleConfirmUpdate}
              />
            )}

            {/* Toast for copy feedback */}
            {toastOpen && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex w-auto flex-col gap-2 z-50 capitalize">
                <Alert color="blue">{toastMessage}</Alert>
              </div>
            )}
          </form>
        </Drawer>
      </div>
    )
  );
};
