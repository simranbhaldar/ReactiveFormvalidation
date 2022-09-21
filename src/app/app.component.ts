
import { Component } from '@angular/core';
import {
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(public fb: FormBuilder) { }
    submitted = false;
    preferemce = ['red', 'green', 'blue'];
    preferenceError: boolean = true;
    registerForm = this.fb.group({
        Name: ['', [Validators.required, Validators.pattern('^[A-Z a-z]*$')]],
        mobileNumber: [
            '',
            [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(10),
            ],
        ],
        zipCode: [
            '',
            [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.maxLength(6),
            ],
        ],
        genderChk: ['', Validators.required],
        Country: ['', Validators.required],
        addressUser: ['', Validators.required],
        emailId: [
            '',
            [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
        ],
        selectedPreference: this.fb.array([],Validators.required),
    });

   

    onCheckboxChange(event: any) {
        const selectedPreference: FormArray = this.registerForm.get(
            'selectedPreference'
        ) as FormArray;
        if (event.target.checked) {
            selectedPreference.push(new FormControl(event.target.value));}
         else {
             const index = selectedPreference.controls.findIndex(
                (x) => x.value === event.target.value
          );
           selectedPreference.removeAt(index);
         }
    }

    get registerFormControl() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        let name:any=this.registerForm.value.Name as string|null;
        if(name!=null){
            name=name.replace(/\s /g,'');
            this.registerForm.patchValue({
                Name:name,
            });
        }
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        // console.log(this.registerForm.value);
        localStorage.setItem('formData', JSON.stringify(this.registerForm.value));
    }

    retrieveData() {
        var storeData: any = localStorage.getItem('formData');
        if (!storeData) {
            return;

        }
        let storeValues = JSON.parse(storeData);
        this.registerForm.patchValue({
            Name: storeValues.Name,
            mobileNumber: storeValues.mobileNumber,
            zipCode: storeValues.zipCode,
            genderChk: storeValues.genderChk,
            Country: storeValues.Country,
            addressUser: storeValues.addressUser,
            emailId: storeValues.emailId,
            selectedPreference:storeValues.selectedPreference,

        });

        if (storeValues.selectedPreference.length >= 1) {
            storeValues.selectedPreference.forEach((elem: any) => {
                let e = document.getElementById(elem) as HTMLInputElement | null;
                if (e != null) {
                    e.checked = true;
                }
            });
        }
    }
    resetData() {
        //this.registerFormControl.reset();
    }
}