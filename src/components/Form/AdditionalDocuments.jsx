import { useRef, useState, useEffect } from "react";
import { useUsersStore } from "../../stores/users";
import { Typography } from "@material-tailwind/react";

export const AdditionalDocuments = ({ userId }) => {
  const store = useUsersStore();
  const additionalDocumentsInputRef = useRef(null);
  const [user, setUser] = useState(null);

  // Fetch the user when the component mounts or when users change
  useEffect(() => {
    const currentUser = store.getByID(userId);
    setUser(currentUser);
  }, [store.users, userId]); // Re-run whenever store.users updates

  return (
    <div className="bg-[#F3F6F8] rounded">
      <Typography className="font-heading font-light  px-3">
        ملفات اضافية
      </Typography>

      <div className="responsive-four-cols-per-row rounded gap-0 bg-[#F3F6F8]">
        {user?.additionalDocuments.length > 0 &&
          user?.additionalDocuments?.map((doc, index) => (
            <>
              <div className="my-2" key={index}>
                <div className="flex items-center bg-white m-2">
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="w-[100%] cursor-pointer flex items-center justify-center border rounded py-2 px-4"
                  >
                    <span className="ml-2">{doc.fileName}</span>
                    {!doc.isUploaded ? (
                      <i className="fa-solid fa-square-plus fa-xl"></i>
                    ) : (
                      <a href={doc.fileURL} download={doc.fileName}>
                        <i class="fa-solid fa-download"></i>
                      </a>
                    )}
                  </label>
                  <input
                    id={`file-upload-${index}`}
                    type="file"
                    className="w-full h-full opacity-0 cursor-pointer hidden" // Ensure higher z-index here
                    onChange={(e) => {
                      store.handleAdditionalDocumentsChange(e, user.id, index);
                    }}
                  />
                </div>
              </div>
            </>
          ))}
        <i
          className="fa-solid fa-square-plus fa-xl cursor-pointer px-3 my-3 pb-3"
          onClick={() => additionalDocumentsInputRef.current?.click()}
        ></i>

        <input
          ref={additionalDocumentsInputRef}
          type="file"
          className="w-full h-full opacity-0 cursor-pointer hidden"
          onChange={(e) => store.addAdditionalDocument(e, user.id)}
        />
      </div>
    </div>
  );
};
