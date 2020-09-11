import { IFormField } from "../../Utils/Types";


export function validateFirstnameField(firstname: IFormField){
  firstname.isValid = (/^[a-z0-9-._]+@[a-z0-9-._]+\.[a-z]{2,}$/gi).test(firstname.value);
  if(!firstname.isValid) { firstname.error = "Le format de l'adresse mail est invalide"; }
}