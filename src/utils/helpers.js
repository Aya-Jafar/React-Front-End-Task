/**
 * Copies the value of a field to the clipboard and shows a toast message.
 *
 * @param {string} fieldName - The name attribute of the field whose value needs to be copied.
 * @param {function} setToastOpen - Function to control the visibility of the toast notification.
 * @param {function} setToastMessage - Function to set the message for the toast notification.
 */
export const handleFieldCopy = (fieldName, setToastOpen, setToastMessage) => {
  const fieldValue = document.querySelector(`[name="${fieldName}"]`).value;
  if (fieldValue) {
    navigator.clipboard.writeText(fieldValue);
    setToastMessage(
      `${fieldName} copied to clipboard with value ${fieldValue}`
    );
    console.log(fieldValue);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000); // Auto-hide toast after 3 seconds
  }
};
