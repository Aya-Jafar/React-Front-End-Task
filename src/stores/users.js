import React, { useState } from "react";
import { validateFile } from "../utils/validators";

/**
 * Store for managing user data and documents
 */
export const useUsersStore = () => {
  /**
   * Constants
   **/
  const TABLE_HEADERS = [
    "الاسم",
    "البريد الالكتروني",
    "العمر",
    "رقم الهاتف",
    "",
  ];

  // Helper function to generate document structure
  const generateInitialDocuments = () =>
    [
      "الهوية الموحدة (الوجه الاول)",
      "الهوية الموحدة (الوجه الثاني)",
      "بطاقة السكن (الوجه الاول)",
      "بطاقة السكن (الوجه الثاني)",
      "وثيقة التخرج",
      "كتاب استمرارية العمل",
      "هوية الموظف (الوجه الاول)",
      "هوية الموظف (الوجه الثاني)",
      "هوية النقابة (الوجه الاول)",
      "هوية النقابة (الوجه الثاني)",
    ].map((title) => ({
      title,
      fileName: "Upload file",
      isUploaded: false,
    }));

  // Mock data representing user records
  const mockData = Array.from({ length: 7 }, (_, id) => ({
    id: id,
    userName: "محمد حمادي احمد الاحمدي",
    email: `ahaa${id}@tamata.com`,
    phoneNumber: "07801670218",
    code: `#8720864272${id}`,
    workEmail: `ahaa${id}@tamata.com`,
    age: 20,
    salary: "900000",
    cardNumber: "122222222222",
    guild: "نقابة المهندسين",
    socialStatus: "اعزب",
    marraigeYears: "سنة واحدة",
    city: "بغداد",
    area: "المنصور",
    mapLink: "https://www.google.com/maps/place/Eiffel+Tower/",
    neighborhood: "420",
    alley: "13",
    house: "77",
    active: true,
    documents: generateInitialDocuments(),
    additionalDocuments: [],
  }));

  /**
   * User state getters & setters
   *
   * */
  // State to store users data
  const [users, setUsers] = React.useState(mockData);
  const [currentUser, setCurrentUser] = useState(null);

  const getAll = () => users;

  const getByID = (id) => users.find((record) => record.id === id) || null;

  const update = (id, updatedData) => {
    setUsers((prevUsers) =>
      prevUsers.map(
        (user) => (user.id === id ? updatedData : user) // Replace the entire user object if the id matches
      )
    );
  };

  /**
   * Creates a new additional document for a specific user.
   *
   * @param {number} userId - The ID of the user to whom the new document will be added.
   * @param {string} fileURL - The URL of the newly uploaded file (used for downloading later).
   * @param {File} selectedFile - The file object that the user uploaded.
   */
  const createAdditionalDocument = (userId, fileURL, selectedFile) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          // Add a new document to the additionalDocuments array
          return {
            ...user,
            additionalDocuments: [
              ...user.additionalDocuments,
              {
                fileName: selectedFile ? selectedFile.name : "Upload file",
                isUploaded: !!selectedFile,
                fileURL: fileURL, // Store the file URL for downloading
              },
            ],
          };
        }
        return user;
      })
    );
  };

  /**
   * Updates the documents (either default or additional) for a specific user.
   *
   * @param {number} userId - The ID of the user whose document is being updated.
   * @param {string} documentType - The type of document to update. Can be "default" or "additional".
   * @param {string} fileURL - The URL of the uploaded file (used for downloading later).
   * @param {File} selectedFile - The file object that the user uploaded.
   * @param {number} [documentIndex=null] - The index of the document in the additionalDocuments array (only required for additional documents).
   * @param {string} [title=null] - The title of the default document being updated (only required for default documents).
   */
  const updateDocuments = (
    userId,
    documentType,
    fileURL,
    selectedFile,
    documentIndex = null,
    title = null
  ) => {
    const updateDocument = (doc, index = null) => {
      // Check if this document is the one being updated
      if (
        (documentType === "default" && doc.title === title) ||
        (documentType === "additional" && index === documentIndex)
      ) {
        return {
          ...doc,
          fileName: selectedFile ? selectedFile.name : "Upload file",
          isUploaded: !!selectedFile,
          fileURL: fileURL, // Store the file URL for downloading
        };
      }
      return doc;
    };

    // Update the user’s document list
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            [documentType === "default" ? "documents" : "additionalDocuments"]:
              user[
                documentType === "default" ? "documents" : "additionalDocuments"
              ].map((doc, index) => updateDocument(doc, index)),
          };
        }
        return user;
      })
    );
  };

  /**
   * Handles file changes when a user uploads a document
   *
   * @param {object} event - The change event from the file input
   * @param {number} userId - The ID of the user whose document is being updated
   * @param {string} title - The title of the document being updated
   * @param {number} documentIndex - The index of the document if updating additional documents
   */
  const handleDocumentsChange = (
    event,
    userId,
    title = null,
    documentIndex = null
  ) => {
    const selectedFile = event.target.files[0];

    // Validate file
    const isValidFile = validateFile(selectedFile);
    if (!isValidFile) return;

    // Create a URL for the selected file to enable downloading later
    const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;

    // Normal documents update
    if (title !== null) {
      updateDocuments(userId, "default", fileURL, selectedFile, null, title);
    }
    // Additional documents update
    else if (title === null && documentIndex !== null) {
      updateDocuments(
        userId,
        "additional",
        fileURL,
        selectedFile,
        documentIndex
      );
    }
    // Additional document create
    else if (title === null && documentIndex === null) {
      createAdditionalDocument(userId, fileURL, selectedFile);
    }
  };

  const getGuildList = () => [
    "نقابة المهندسين",
    "نقابة الأطباء",
    "نقابة المحامين",
    "نقابة المعلمين",
    "نقابة الصحفيين",
    "نقابة الصيادلة",
    "نقابة المهن التمثيلية",
    "نقابة العاملين بالتكنولوجيا",
  ];

  const getMarraigeYearsOptions = () => [
    "اقل من سنة",
    "سنة واحدة",
    "اكثر من سنة",
    "اكثر من ٥ سنوات",
  ];

  const getCities = () => [
    "بغداد",
    "البصرة",
    "نينوى",
    "النجف",
    "أربيل",
    "كربلاء",
    "السليمانية",
    "الموصل",
  ];

  const getBaghdadAreas = () => [
    "الكرادة",
    "المنصور",
    "الشعب",
    "الزعفرانية",
    "باب المعظم",
    "الدورة",
    "الجادرية",
    "السيدية",
    "الكاظمية",
    "الشيوخ",
  ];

  return {
    getAll,
    getByID,
    getGuildList,
    getMarraigeYearsOptions,
    getCities,
    getBaghdadAreas,
    mockData,
    handleDocumentsChange,
    users,
    setCurrentUser,
    currentUser,
    TABLE_HEADERS,
    update,
    setUsers,
  };
};
