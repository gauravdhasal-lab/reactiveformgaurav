import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component(
    { 
        selector: 'app-root', 
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss'],
        encapsulation: ViewEncapsulation.None,
    }
    )
export class AppComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    password;
    show = false;
    img: File;
    genders=['male','female'];
    constructor(private formBuilder: FormBuilder) { }
    separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    ngOnInit() {
        this.password = 'password';
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue],
            phone:["", Validators.requiredTrue ],
            image:[''],
            gender:[''],
            hobbies:[''],
            city:['']
          
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }
    onFileChanged(event) {
        this.img = event.target.files[0];
      }
    onClick() {
        if (this.password === 'password') {
          this.password = 'text';
          this.show = true;
        } else {
          this.password = 'password';
          this.show = false;
        }
      }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
      
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        // display form values on success
        console.log(this.registerForm.value);
        
    }
   
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
