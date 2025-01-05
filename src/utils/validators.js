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
