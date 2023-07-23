import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../shared/service/leave-application-form.service';
import { LeaveForm } from '../shared/model/leave-application-form.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {
  leaveDataList: LeaveForm[] = [];

  constructor(private leaveService: LeaveService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.refreshLeaveDataList(user.email); 
      }
    });
  }

  refreshLeaveDataList(userEmail: string): void {
    this.leaveService.getLeavesByEmail(userEmail).subscribe(
      (leaveData: LeaveForm[]) => {
        this.leaveDataList = leaveData;
      },
      (error) => {
        console.error('Error fetching leave data:', error);
      }
    );
  }

  calculateLeaveDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getLeavesByStatus(status: string): LeaveForm[] {
    return this.leaveDataList.filter((leave) => leave.status === status);
  }
}
