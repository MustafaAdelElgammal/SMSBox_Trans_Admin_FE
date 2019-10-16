import {FormGroup} from "@angular/forms";

export abstract class BaseCreateFormView {

    public formErrors: any;
    public validationMessages: any;
    protected constructor () {}

    public validationLogErrors(group: FormGroup) {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            if (abstractControl instanceof FormGroup) {
                this.validationLogErrors(abstractControl);
            } else {
                this.formErrors[key] = '';
                if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                    const messages = this.validationMessages[key];
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            this.formErrors[key] += messages[errorKey] + ' ';
                        }
                    }
                }
            }
        });
    }

}
