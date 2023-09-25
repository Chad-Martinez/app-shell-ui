export const validateEmailHelper = (
  email: string | undefined | null
): boolean =>
  email?.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

export const validatePhoneHelper = (phone: string): boolean =>
  phone.match(/^[0-9]{3}-\d{3}-\d{4}/) ||
  phone.replaceAll('-', '').replaceAll('_', '').length === 0
    ? true
    : false;
