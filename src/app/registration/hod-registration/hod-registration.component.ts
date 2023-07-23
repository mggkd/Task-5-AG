import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHandlerService } from 'src/app/shared/service/login-http-handler.service';

@Component({
  selector: 'app-hod-registration',
  templateUrl: './hod-registration.component.html',
  styleUrls: ['./hod-registration.component.css']
})
export class HodRegistrationComponent implements OnInit {
  hodForm: FormGroup | any;
  hodRegistrationArray: any[] = [];
  position :string = 'hod' ;


  constructor(private httpServe: HttpHandlerService) { }

  ngOnInit(): void {
    this.hodForm = new FormGroup({
      position: new FormControl(this.position, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.hodForm.value);
    this.hodRegistrationArray.push(this.hodForm.value);
    console.log(this.hodRegistrationArray);
    this.httpServe.registerNewHodUser(this.hodForm.value).subscribe((regisData: any) => {
      console.log("regis ", regisData);
    });
    this.httpServe.postUser(this.hodForm.value).subscribe((data: any) => {
      console.log(data.value);
    });
    this.hodForm.reset();
  }
}
