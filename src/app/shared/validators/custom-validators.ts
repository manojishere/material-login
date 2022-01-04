import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        let pwdValue = control.value;
        let confPwdValue = matchingControl.value;
        
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if(pwdValue && pwdValue.length > 0 && control.valid && confPwdValue) {
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
         
    }
}