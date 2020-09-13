import { IFormField } from "../../Utils/Types";


export function validateEmailField(email: IFormField){
  email.isValid = (/^[a-z0-9-._]+@[a-z0-9-._]+\.[a-z]{2,}$/gi).test(email.value);
  if(!email.isValid) { email.error = "Email address is invalid"; }
}