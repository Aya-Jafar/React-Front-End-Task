import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useUsersStore } from "../stores/useUsersStore";
import { useForm } from "react-hook-form";
import {
  phoneValidator,
  requiredText,
  emailValidator,
  numericValidator,
  cardNumberValidator,
  googleMapsUrlValidator,
} from "../utils/validators";
import FileUploader from "./FileUploader";

export function FormDrawer({ userId }) {
  const store = useUsersStore();
  const {
    getByID,
    getGuildList,
    getMarraigeYearsOptions,
    getCities,
    getBaghdadAreas,
    mockData,
  } = store;
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [currentUser, setCurrentUser] = useState(null);

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const user = getByID(userId);
    setCurrentUser(user);
  }, []);
  useEffect(() => {
    console.log(store.mockData.find((user) => user.id === userId).documents);
  }, []);
  const onSubmit = async (data) => {
    console.log(data);
    // TODO: Reset form
  };
  const [fileName, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile ? selectedFile.name : "Choose File");
  };

  return (
    currentUser && (
      <div className="flex items-center justify-center">
        {/* Trigger button */}
        <Button onClick={openDrawer} className="mt-10">
          <div>open form</div>
        </Button>

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
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
            {/* Username & Edit icon */}
            <div className="flex items-center">
              <Typography variant="h5" className="font-heading font-bold">
                {currentUser.userName}
              </Typography>
              <IconButton variant="text">
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
                  <IconButton variant="text">
                    <i class="fa-regular fa-pen-to-square fa-xl"></i>
                  </IconButton>
                </div>
                {/* Email & it's edit icon */}
                <div className="flex items-center justify-between">
                  <Typography className="font-heading font-[400]">
                    {currentUser.email}
                  </Typography>
                  <IconButton variant="text">
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
            <Typography variant="h5" className="font-heading font-meduim">
              المعلومات الرئيسية
            </Typography>
          </div>
          <form
            className="flex flex-col gap-6 p-4"
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
                {errors.code && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.code?.message}
                  </Typography>
                )}
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
            </div>

            {/* Second Row */}
            <div className="responsive-four-cols-per-row">
              {/* Column 1: الرمز */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  البريد الالكتروني الخاص بالعمل
                </Typography>
                <Input
                  name="email"
                  {...register("email", emailValidator)}
                  type="text"
                  label="البريد الالكتروني الخاص بالعمل"
                  error={!!errors?.email}
                />
                {errors.email && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.email?.message}
                  </Typography>
                )}
              </div>
              {/* Column 2: العمر */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  العمر
                </Typography>
                <Input
                  name="age"
                  {...register("age", numericValidator)}
                  type="text"
                  label="العمر"
                  error={!!errors?.age}
                />
                {errors.age && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.age?.message}
                  </Typography>
                )}
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
                {errors.salary && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.salary?.message}
                  </Typography>
                )}
              </div>

              {/* Column 4: رقم البطاقة */}
              <div>
                <Typography color="blue-gray" className="font-heading">
                  رقم بطاقة الهوية الموحدة
                </Typography>
                <Input
                  name="cardNumber"
                  {...register("cardNumber", cardNumberValidator)}
                  type="text"
                  label="رقم بطاقة الهوية الموحدة"
                  error={!!errors?.cardNumber}
                />
                {errors.cardNumber && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.cardNumber?.message}
                  </Typography>
                )}
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
                  error={!!errors.guild}
                  label="النقابة التي تنتمي لها"
                  className="font-heading"
                >
                  {getGuildList().map((guild, index) => (
                    <Option key={index}>{guild}</Option>
                  ))}
                </Select>
                {errors.guild && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading"
                  >
                    {errors.guild?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div className="mt-2">
              <Typography variant="h5" className="font-heading font-meduim">
                الحالة الاجتماعية
              </Typography>
            </div>

            {/* Fourth Row */}
            <div className="responsive-two-cols-per-row">
              <div>
                <Typography color="blue-gray" className="font-heading">
                  الحالة الاجتماعية
                </Typography>
                <Select
                  name="socialStatus"
                  {...register("socialStatus", requiredText)}
                  error={!!errors.socialStatus}
                  label="الحالة الاجتماعية"
                  className="font-heading"
                >
                  <Option> متزوج</Option>
                  <Option>اعزب </Option>
                </Select>
                {errors.socialStatus && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading"
                  >
                    {errors.socialStatus?.message}
                  </Typography>
                )}
              </div>
              <div>
                <Typography color="blue-gray" className="font-heading">
                  عدد سنوات الزواج
                </Typography>
                <Select
                  className="font-heading"
                  name="marraigeYears"
                  {...register("marraigeYears", requiredText)}
                  error={!!errors.marraigeYears}
                  label="عدد سنوات الزواج"
                >
                  {getMarraigeYearsOptions().map((year, index) => (
                    <Option key={index}>{year}</Option>
                  ))}
                </Select>
                {errors.marraigeYears && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading"
                  >
                    {errors.marraigeYears?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div className="mt-2">
              <Typography variant="h5" className="font-heading font-meduim">
                الاقامة و السكن{" "}
              </Typography>
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
                  error={!!errors.city}
                  label="المدينة"
                  className="font-heading"
                >
                  {getCities().map((city, index) => (
                    <Option key={index}>{city}</Option>
                  ))}
                </Select>
                {errors.city && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading"
                  >
                    {errors.city?.message}
                  </Typography>
                )}
              </div>
              <div>
                <Typography className="font-heading font-meduim">
                  المنطقة
                </Typography>
                <Select
                  className="font-heading"
                  name="area"
                  {...register("area", requiredText)}
                  error={!!errors.area}
                  label="المنطقة"
                >
                  {getBaghdadAreas().map((area, index) => (
                    <Option key={index}>{area}</Option>
                  ))}
                </Select>
                {errors.city && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading"
                  >
                    {errors.city?.message}
                  </Typography>
                )}
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
                {errors.mapLink && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.mapLink?.message}
                  </Typography>
                )}
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
                {errors.neighborhood && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.neighborhood?.message}
                  </Typography>
                )}
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
                {errors.alley && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.alley?.message}
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="blue-gray" className="font-heading">
                  الدار
                </Typography>
                <Input
                  name="house"
                  {...register("house", requiredText)}
                  type="text"
                  label="الدار"
                  error={!!errors?.alley}
                />
                {errors.house && (
                  <Typography
                    variant="small"
                    color="red"
                    className="font-heading mt-1"
                  >
                    {errors.house?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Typography variant="h5" className="font-heading font-meduim">
                المستمسكات{" "}
              </Typography>

              <Typography className="font-heading font-light text-[#8F9397]">
                يمكن مراجعة وتعديل المستمسكات الخاصة بالمستخدمين
              </Typography>

              {/* First row */}
              <div className="responsive-four-cols-per-row bg-[#F3F6F8] mt-3 rounded">
                {store.users
                  .find((user) => user.id === userId)
                  .documents?.map((doc, index) => (
                    <div className="my-2" key={index}>
                      <Typography className="font-heading font-light m-2">
                        {doc.title}
                      </Typography>
                      <div className="flex items-center bg-white m-2">
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="w-full cursor-pointer flex items-center justify-center border rounded py-3 px-4"
                        >
                          <span className="ml-2">{doc.fileName}</span>
                          {doc.fileName === "Upload file" ? (
                            <i className="fa-solid fa-square-plus fa-xl"></i>
                          ) : (
                            <a href="#" download>
                              <i className="fa-solid fa-file-arrow-up ml-2"></i>
                            </a>
                          )}
                        </label>
                        <input
                          id={`file-upload-${index}`}
                          type="file"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20" // Ensure higher z-index here
                          onChange={(e) => {
                            store.handleFileChange(e, userId, doc.title);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {/* <Typography className="font-heading font-light m-2">
                  {" "}
                  الهوية الموحدة (الوجه الاول)
                </Typography>

                <div className="flex items-center bg-white m-2">
                  <label
                    for="file-upload"
                    class="w-full cursor-pointer flex items-center justify-center border rounded py-3 px-4 "
                  >
                    <span className="ml-2">{fileName}</span>
                    {fileName === "Upload file" ? (
                      // Show download icon if file was uploaded
                      <i class="fa-solid fa-square-plus fa-xl"></i>
                    ) : (
                      // Show upload file icon if file was not uploaded yet
                      <a href="#" download>
                        <i className="fa-solid fa-file-arrow-up ml-2"></i>
                      </a>
                    )}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                </div> */}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="md:w-[14%] sm:w-[20%] font-heading bg-primary"
              >
                حفظ التعديلات
              </Button>
            </div>
          </form>
        </Drawer>
      </div>
    )
  );
}
