const validatePhoneNumber = phoneNumber => {
  const regexString =
    "^(\\+\\d{1,2}[\\s]?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$";
  const regex = RegExp(regexString);
  return regex.test(phoneNumber);
};

export { validatePhoneNumber };
