import React, { useState, useEffect } from "react";
import { useUsersStore } from "../stores/users";
import { Typography } from "@material-tailwind/react";

export const DocumentUploader = ({ userId }) => {
  const store = useUsersStore();
  const [user, setUser] = useState(null);

  // Fetch the user when the component mounts or when users change
  useEffect(() => {
    const currentUser = store.getByID(userId);
    setUser(currentUser);
  }, [store.users, userId]); // Re-run whenever store.users updates

  return (
    <>
      <Typography variant="h5" className="font-heading font-meduim bg-white">
        المستمسكات
      </Typography>

      <Typography className="font-heading font-light text-[#8F9397] bg-white">
        يمكن مراجعة وتعديل المستمسكات الخاصة بالمستخدمين
      </Typography>

      <div className="responsive-four-cols-per-row rounded gap-0 bg-[#F3F6F8]">
        {user?.documents?.map((doc, index) => (
          <div className="my-2 rounded" key={index}>
            <Typography className="font-heading font-light m-2">
              {doc.title}
            </Typography>
            <div className="flex items-center bg-white m-2 rounded">
              <label
                htmlFor={`file-upload-${index}`}
                className="w-[100%] cursor-pointer flex items-center justify-center border rounded py-2 px-4"
              >
                <span className="ml-2">{doc.fileName}</span>
                {doc.fileName === "Upload file" ? (
                  <i className="fa-solid fa-file-arrow-up ml-2"></i>
                ) : (
                  <a href={doc.fileURL} download={doc.fileName}>
                    <i class="fa-solid fa-download"></i>
                  </a>
                )}
              </label>
              <input
                id={`file-upload-${index}`}
                type="file"
                className="w-full h-full opacity-0 cursor-pointer hidden"
                onChange={(e) => {
                  e.preventDefault();
                  store.handleDocumentsChange(e, user.id, doc.title);
                }}
              />
            </div>
            <hr className="text-[#D0D7DC] !w-full" />
          </div>
        ))}
      </div>
    </>
  );
};
