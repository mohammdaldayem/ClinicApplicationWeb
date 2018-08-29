import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from '../../../_model/CustomValidators';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', [
          Validators.required
      ]],
      LastName: ['', [
        Validators.required
    ]],
    Age: ['', [
      Validators.required
  ]],
      emailGroup: this.fb.group({
        Email: ['', [
              Validators.required,
              Validators.email
          ]]
      }, { validator: CustomValidators.childrenEqual}),

  });
    }

}
