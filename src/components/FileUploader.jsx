import React, { useState } from "react";

const FileUploader = ({ documents, updateDocuments }) => {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles?.map((file) => ({
      name: file.name,
      blobURL: URL.createObjectURL(file),
    }));

    // Update the documents array using the provided function
    updateDocuments([...documents, ...newFiles]);
  };

  const handleRemoveFile = (fileName) => {
    // Filter out the removed file and update the array
    const updatedDocuments = documents.filter((file) => file.name !== fileName);
    updateDocuments(updatedDocuments);
  };

  return (
    <div className="responsive-four-cols-per-row bg-[#F3F6F8] mt-3 rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {documents.map((file, index) => (
        <div
          key={index}
          className="flex items-center bg-white m-2 border rounded p-3 relative"
        >
          <span className="ml-2 flex-1">{file.name}</span>
          <a href={file.blobURL} download={file.name} className="ml-2">
            <i className="fa-solid fa-download fa-xl"></i>
          </a>
          <button
            onClick={() => handleRemoveFile(file.name)}
            className="ml-2 text-red-500"
          >
            <i className="fa-solid fa-trash fa-xl"></i>
          </button>
        </div>
      ))}

      <div className="flex items-center relative bg-white m-2 border rounded p-3">
        <label
          htmlFor="file-upload"
          className="w-full cursor-pointer flex items-center justify-center border rounded py-3 px-4"
        >
          <span className="ml-2">Upload Files</span>
          <i className="fa-solid fa-file-arrow-up ml-2"></i>
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
