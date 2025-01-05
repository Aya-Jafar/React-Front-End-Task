import React, { useState } from "react";

/**
 * Custom hook for managing user data and documents
 */
export const useUsersStore = () => {
  const MAX_FILE_SIZE = 10485760; // 10 MB

  // Mock data representing user records
  const mockData = Array.from({ length: 5 }, (_, id) => ({
    id: id,
    userName: "محمد حمادي احمد الاحمدي",
    email: `ahaa${id}@tamata.com`,
    phoneNumber: "07801670218",
    code: `#8720864272${id}`,
    workEmail: `ahaa${id}@tamata.com`,
    age: 20,
    salary: "900,000",
    cardNumber: "2333311",
    guild: "حقوق العمال",
    socialStatus: "Married",
    marraigeYears: 4,
    city: "Baghdad",
    area: "Mansour",
    mapLink: "https://maps.app.goo.gl/2Bu6Jx61bGFoU26e9",
    neighborhood: "",
    alley: "",
    house: "",
    documents: [
      {
        title: "الهوية الموحدة (الوجه الاول)",
        fileName: "Upload file", // Default placeholder file name
        isUploaded: false, // Indicates whether the file has been uploaded
      },
      {
        title: "الهوية الموحدة (الوجه الثاني)",
        fileName: "Upload file",
        isUploaded: false,
      },
      {
        title: "بطاقة السكن (الوجه الاول)",
        fileName: "Upload file",
        isUploaded: false,
      },
      {
        title: "بطاقة السكن (الوجه الثاني)",
        fileName: "Upload file",
        isUploaded: false,
      },

      {
        title: "وثيقة التخرج ",
        fileName: "Upload file",
        isUploaded: false,
      },

      {
        title: "كتاب استمرارية العمل",
        fileName: "Upload file",
        isUploaded: false,
      },
      {
        title: "هوية الموظف (الوجه الاول)",
        fileName: "Upload file",
        isUploaded: false,
      },
      {
        title: "هوية الموظف (الوجه الثاني)",
        fileName: "Upload file",
        isUploaded: false,
      },
      {
        title: "هوية النقابة (الوجه الاول)",
        fileName: "Upload file",
        isUploaded: false,
      },

      {
        title: "هوية النقابة (الوجه الثاني)",
        fileName: "Upload file",
        isUploaded: false,
      },
    ],
    additionalDocuments: [
      // {
      //   title: "الهوية الموحدة (الوجه الاول)",
      //   fileName: "Upload file", // Default placeholder file name
      //   isUploaded: false, // Indicates whether the file has been uploaded
      // },
    ],
  }));
  /**
   * Returns all the user data
   *
   * @returns {array} - Array of all user records
   */
  const getAll = () => {
    return mockData;
  };

  // State to store users data
  const [users, setUsers] = React.useState(mockData);
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * Handles file changes when a user uploads a document
   *
   * @param {object} event - The change event from the file input
   * @param {number} userId - The ID of the user whose document is being updated
   * @param {string} title - The title of the document being updated
   */
  const handleDocumentsChange = (event, userId, title) => {
    const selectedFile = event.target.files[0];

    // Validate the size of the file
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit!");
      return;
    }
    // Create a URL for the selected file to enable downloading later
    const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;

    const updateDocument = (doc) => {
      if (doc.title === title) {
        return {
          ...doc,
          fileName: selectedFile ? selectedFile.name : "Upload file",
          isUploaded: !!selectedFile,
          fileURL: fileURL, // Store the file URL for downloading
        };
      }
      return doc;
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            documents: user.documents.map(updateDocument),
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
   */
  const handleAdditionalDocumentsChange = (event, userId, documentIndex) => {
    const selectedFile = event.target.files[0];
    // Validate the size of the file
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit!");
      return;
    }
    // Create a URL for the selected file to enable downloading later
    const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;

    // Update the document at the specific index
    const updateDocument = (doc, index) => {
      if (index === documentIndex) {
        return {
          ...doc,
          fileName: selectedFile ? selectedFile.name : "Upload file",
          isUploaded: !!selectedFile,
          fileURL: fileURL, // Store the file URL for downloading
        };
      }
      return doc;
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            additionalDocuments: user.additionalDocuments.map(updateDocument),
          };
        }
        return user;
      })
    );
  };

  /**
   * Adds a new document to the additionalDocuments array for a user
   *
   * @param {number} userId - The ID of the user to add the document to
   * @param {string} title - The title of the new document
   */
  const addAdditionalDocument = (e, userId) => {
    const selectedFile = e.target.files[0];
    // Validate the size of the file
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit!");
      return;
    }

    // Create a URL for the selected file to enable downloading later
    const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;

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
   * Returns a user record by their ID
   *
   * @param {number} id - The ID of the user to fetch
   * @returns {object|null} - The user record with the matching ID or null if not found
   */
  const getByID = (id) => {
    return users.find((record) => record.id === id) || null;
  };

  /**
   * Returns a list of guild names
   *
   * @returns {array} - List of guilds
   */
  const getGuildList = () => {
    return [
      "نقابة المهندسين",
      "نقابة الأطباء",
      "نقابة المحامين",
      "نقابة المعلمين",
      "نقابة الصحفيين",
      "نقابة الصيادلة",
      "نقابة المهن التمثيلية",
      "نقابة العاملين بالتكنولوجيا",
    ];
  };

  /**
   * Returns options for marriage years
   *
   * @returns {array} - List of marriage year options
   */
  const getMarraigeYearsOptions = () => {
    return ["اقل من سنة", "سنة واحدة", "اكثر من سنة", "اكثر من ٥ سنوات"];
  };

  /**
   * Returns a list of cities
   *
   * @returns {array} - List of cities
   */
  const getCities = () => {
    return [
      "بغداد",
      "البصرة",
      "نينوى",
      "النجف",
      "أربيل",
      "كربلاء",
      "السليمانية",
      "الموصل",
    ];
  };

  /**
   * Returns a list of areas in Baghdad
   *
   * @returns {array} - List of Baghdad areas
   */
  const getBaghdadAreas = () => {
    return [
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
  };

  return {
    getAll,
    getByID,
    getGuildList,
    getMarraigeYearsOptions,
    getCities,
    getBaghdadAreas,
    mockData,
    handleDocumentsChange,
    handleAdditionalDocumentsChange,
    users,
    addAdditionalDocument,
    setCurrentUser,
    currentUser,
  };
};
