export const handleFieldCopy = (fieldName, setToastOpen, setToastMessage) => {
  console.log(fieldName);

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
