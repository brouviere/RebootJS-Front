export function validatePasswordConfirmation(password: string, confirmation: string) : boolean{
  
  return password === confirmation;
}