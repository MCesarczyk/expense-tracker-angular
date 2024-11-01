import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const MATCHING_ERROR_KEY = 'passwordsMatch';

export const MatchingPasswords = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (fg: AbstractControl):ValidationErrors|null => {
    if (!(fg instanceof FormGroup)) {
      throw new Error('matchingPasswords must be used on a FormGroup');
    }

    const passwordControl = fg.controls[controlName];
    const matchingControl = fg.controls[matchingControlName];

    if(!passwordControl.touched && !matchingControl.touched) {
      return null;
    }

    if(passwordControl.value !== matchingControl.value) {
      return {[MATCHING_ERROR_KEY]: true};
    }

    return null;
  };
};
