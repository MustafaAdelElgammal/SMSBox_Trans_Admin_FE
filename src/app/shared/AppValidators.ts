import {AbstractControl, FormArray, FormControl, ValidatorFn} from "@angular/forms";

export class AppValidators {

    static minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
            // get a list of checkbox values (boolean)
            .map(control => control.value)
            // total up the number of checked checkboxes
            .reduce((prev, next) => next ? prev + next : prev, 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    }

    static minItems(control: FormControl): {[s: string]: boolean} {
        if (control.value !== null && control.value.length === 0) {
            return { required: true };
        }
        return null;
    }

    static MatchPassword(AC: AbstractControl) {
        if (AC.get('confirmPassword').errors && !AC.get('confirmPassword').errors['MatchPassword']) {
            return;
        }
        if(AC.get('password').value !== AC.get('confirmPassword').value) {
            AC.get('confirmPassword').setErrors({MatchPassword:true});
            return {MatchPassword: true};
        }
        AC.get('confirmPassword').setErrors(null);
        return null;
    }

    static EmailValidator(control: FormControl): {[s: string]: boolean} {
        if (control.value === null || control.value.length === 0) {
            return null;
        } else {
            const EMAIL_REGEXP = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
            return EMAIL_REGEXP.test(control.value) ? null : { validateEmail: true };
        }
    }

    static validateHost(control: FormControl): {[s: string]: boolean} {
       if (control.value === null || control.value.length === 0) {
          return null;
       } else {
           const HOST_REGEXP = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
           return HOST_REGEXP.test(control.value) ? null : { validateHost: true };
       }
    }
}
