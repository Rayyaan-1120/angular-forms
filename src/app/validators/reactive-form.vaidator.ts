import { AbstractControl } from "@angular/forms";

export function forbiddenusernames(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /admin123/.test(control.value)
  console.log(forbidden)
  return forbidden ? { 'forbiddenusername': {value: control.value} } : null;
}

export function passwordvalidator(control:AbstractControl):{[key:string]:any} | null{
  const password = control.get('password');
  const confirmpassword = control.get('confirmpassword');

  if(password?.pristine || confirmpassword?.pristine){
    return null;
  }

  if(password && confirmpassword && password.value !== confirmpassword.value){
    return {'mismatch':true}
  }
  return null;
}

export function agegreaterthan18(control:AbstractControl) : { [key: string]: any } | null {
  const age = control.value
  console.log(control.value ,'rffr')
  if(age && age < 18){
    return {'age':true}
  }
  return null;
}