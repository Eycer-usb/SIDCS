import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.parent?.get('password')?.value;
        const confirmPassword = control.parent?.get('confirmPassword')?.value;
        return password !== confirmPassword ? { 'passwordMismatch': true } : null;
    };
    }