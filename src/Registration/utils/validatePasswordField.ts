import { IFormPasswordField, IFormField } from "../../Utils/Types";

export function validatePasswordField(
  password: IFormPasswordField,
  confirmation: IFormField,
  isOptional?: boolean
) {
  confirmation.isValid = password.value === confirmation.value;
  if (!confirmation.isValid) {
    confirmation.error =
      `Password and confirmation aren't identical.`;
  } else {
    delete confirmation.error;
  }

  password.hasLower = /[a-z]+/.test(password.value);
  password.hasUpper = /[A-Z]+/.test(password.value);
  password.hasNumber = /[0-9]+/.test(password.value);
  password.hasSymbol = /[^a-zA-Z0-9]+/.test(password.value);
  password.hasValidLength = /^.{8,30}$/.test(password.value);

  const { hasLower, hasUpper, hasSymbol, hasNumber, hasValidLength } = password;

  password.isValid =
    (isOptional && !password.value) ||
    [hasLower, hasUpper, hasSymbol, hasNumber, hasValidLength].every(Boolean);
  if (!password.isValid) {
    password.error =
      "Password is incorrect, please refer to requirements.";
  } else {
    delete password.error;
  }
}