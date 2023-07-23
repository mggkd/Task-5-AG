import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHandlerService } from 'src/app/shared/service/login-http-handler.service';

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.css']
})
export class StaffRegistrationComponent implements OnInit {
  staffFormObj: FormGroup | any;
  staffRegistrationArray: any[] = [];
  position :string = 'staff' ;

  constructor(private httpServe: HttpHandlerService) { }

  ngOnInit(): void {
    this.staffFormObj = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      position: new FormControl(this.position, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.staffFormObj.value);
    this.staffRegistrationArray.push(this.staffFormObj.value);
    console.log(this.staffRegistrationArray);
    this.httpServe.postUser(this.staffFormObj.value).subscribe((data: any) => {
      console.log(data);
    });
    this.httpServe.registerNewUser(this.staffFormObj.value).subscribe((regisData: any) => {
      console.log("regis ", regisData);
    });
    this.staffFormObj.reset();
  }
}
