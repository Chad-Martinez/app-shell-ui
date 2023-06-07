export const validateEmailHelper = (email: string | undefined | null) => {
  let isValidEmail = false;
  if (!email) return isValidEmail;
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    isValidEmail = true;
  }
  return isValidEmail;
};
