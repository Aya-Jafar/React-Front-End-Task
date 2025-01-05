/**
 * Validator for phone numbers.
 *
 * @type {Object}
 */
export const phoneValidator = {
  required: "رقم الهاتف مطلوب",
  pattern: {
    value: /^[0-9]+$/,
    message: "رقم الهاتف يجب أن يحتوي على أرقام فقط",
  },
  minLength: {
    value: 10,
    message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل",
  },
  maxLength: {
    value: 15,
    message: "رقم الهاتف يجب أن لا يتجاوز 15 رقمًا",
  },
};

/**
 * Validator for Google Maps URLs.
 *
 * @type {Object}
 */
export const googleMapsUrlValidator = {
  required: "رابط خريطة مطلوب",
  pattern: {
    value:
      /^(https?:\/\/)?(www\.)?google\.(com|co\.[a-z]{2})\/maps\/place\/.+$/,
    message: "رابط خريطة  غير صالح",
  },
};

/**
 * Validator for email addresses.
 *
 * @type {Object}
 */
export const emailValidator = {
  required: "البريد الالكتروني مطلوب",
  pattern: {
    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    message: "البريد الالكتروني غير صالح",
  },
};

/**
 * Validator for numeric fields.
 *
 * @type {Object}
 */
export const numericValidator = {
  required: "هذا الحقل مطلوب",

  pattern: {
    value: /^[0-9]+$/,
    message: "هذة القيمة غير صالحة",
  },
};

/**
 * Validator for required text fields.
 *
 * @type {Object}
 */
export const requiredText = {
  required: "هذا الحقل مطلوب",
};

/**
 * Validator for card number fields (12 digits).
 *
 * @type {Object}
 */
export const cardNumberValidator = {
  required: "رقم بطاقة الهوية الموحدة مطلوب",
  pattern: {
    value: /^\d{12}$/,
    message: "رقم بطاقة الهوية الموحدة يجب أن يحتوي على 12 رقمًا فقط",
  },
  minLength: {
    value: 12,
    message: "رقم بطاقة الهوية الموحدة يجب أن يكون 12 رقمًا",
  },
  maxLength: {
    value: 12,
    message: "رقم بطاقة الهوية الموحدة يجب أن يكون 12 رقمًا",
  },
};

/**
 * Validates the selected file based on size and type
 *
 * @param {File} selectedFile - The file selected by the user
 * @param {Array} docs - The list of existing documents to check for duplicates
 * @returns {boolean} - Returns true if the file is valid, otherwise false
 */

export const validateFile = (selectedFile) => {
  const MAX_FILE_SIZE = 10485760; // For file size validation

  // File size validation
  if (selectedFile.size > MAX_FILE_SIZE) {
    alert("File size exceeds the limit!");
    return false;
  }

  // File type validation (only image or PDF allowed)
  if (
    !selectedFile.type.startsWith("image/") &&
    selectedFile.type !== "application/pdf"
  ) {
    alert("Only upload image files or PDF documents");
    return false;
  }

  return true;
};
