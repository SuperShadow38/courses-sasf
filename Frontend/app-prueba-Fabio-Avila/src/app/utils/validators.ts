import { AbstractControl } from '@angular/forms';

export class MyValidators {
    static isUsernameValid(control: AbstractControl) {
        const value = control.value;

        if (value && typeof value === 'string' && value.length > 10) {
            return {Username_invalid: true};
        }
        return false;
    }
}