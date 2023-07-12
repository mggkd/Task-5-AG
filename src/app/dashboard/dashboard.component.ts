import { Component } from '@angular/core';
import { LeaveManagementService } from '../shared/service/leave-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username!: string; // Logged-in user's username
  isHOD!: boolean; // Flag to determine if the user is HOD or staff
  leaves: any[]= [
    { staffName: 'MS Dhoni', date: '2023-06-01', status: 'Approved' },
    { staffName: 'Adam Gilchrist', date: '2023-06-02', status: 'Pending' },
    // Add more leave objects as needed
  ]; // Array of leave objects

  constructor(private leaveManagementService: LeaveManagementService) {}

  ngOnInit() {
    // Get the initial staff leaves data
    this.leaveManagementService.getStaffLeaves().subscribe(leaves => {
      this.leaves = leaves;
    });
  }

  // Function to approve leave
  approveLeave(leave: any) {
    this.leaveManagementService.approveLeave(leave.id);
  }

  // Function to reject leave
  rejectLeave(leave: any) {
    this.leaveManagementService.rejectLeave(leave.id);
  }
}
