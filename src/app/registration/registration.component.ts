import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      department: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }

    const firstName = this.registrationForm.value.firstName;
    const lastName = this.registrationForm.value.lastName;
    const email = this.registrationForm.value.email;
    const contactNumber = this.registrationForm.value.contactNumber;
    const department = this.registrationForm.value.department;
    const username = this.registrationForm.value.username;
    const password = this.registrationForm.value.password;

    // Logic for registration
  }
}
