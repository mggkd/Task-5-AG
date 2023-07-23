// leave-application-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../shared/service/leave-application-form.service';

@Component({
  selector: 'app-leave-application-form',
  templateUrl: './leave-application-form.component.html',
  styleUrls: ['./leave-application-form.component.css']
})
export class LeaveApplicationFormComponent implements OnInit {
  leaveAppForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.leaveAppForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.leaveAppForm.valid) {
      const leaveForm = this.leaveAppForm.value;
      this.leaveService.addLeave(leaveForm);
      this.leaveAppForm.reset();
    }
  }
}
