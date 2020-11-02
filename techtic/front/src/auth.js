import Cookies from 'js-cookie';

export const TokenKey = 'UToken';

export const login = (token) => {
  Cookies.set(TokenKey, token);
};

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const logout = () => {
  Cookies.remove(TokenKey);
};

export function getErrors(errors) {
  const formattedErrors = {
    message: errors.message,
    fields: {},
  };

  for (const prop in errors.errors) {
    formattedErrors.fields[prop] = errors.errors[prop][0];
  }

  return formattedErrors;
}