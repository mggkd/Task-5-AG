import { Component, OnInit } from '@angular/core';
import { LeaveForm } from '../shared/model/leave-application-form.model';
import { LeaveService } from '../shared/service/leave-application-form.service';
import { AuthService } from '../auth.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css'],
})
export class HodDashboardComponent implements OnInit {
  leaveDataList: LeaveForm[] = [];
  currentHodDept : string = '';

  constructor(private leaveService: LeaveService, private authService: AuthService) { }

  ngOnInit() {
    this.leaveService
      .getLeavesFromFirebase()
      .pipe(
        switchMap((leavesObject) => this.updateStaffNamesAndStatus(leavesObject))
      )
      .subscribe(
        (updatedLeaveDataList) => {
          this.leaveDataList = updatedLeaveDataList;
          console.log(this.authService.getUserDepartment(), this.leaveDataList)
        },
        (error) => {
          console.error('Error fetching leave data:', error);
        }
      );
  }

  updateStaffNamesAndStatus(leaves: LeaveForm[]) {
    const hodDepartment = this.authService.getUserDepartment();
    this.currentHodDept = hodDepartment
  
    const hodLeaves = leaves.filter((leave) => leave.department === hodDepartment);
  
    const leaveObservables = hodLeaves.map((leave) =>
      this.authService.getStaffNameByEmail(leave.email!).pipe(
        map((staffName) => {
          leave.appliedBy = staffName;
          if (leave.status === 'Pending') {
            this.updateLeaveStatus(leave, leave.status);
          }
          return leave;
        })
      )
    );
  
    return forkJoin(leaveObservables);
  }
  

  updateLeaveStatus(leave: LeaveForm, newStatus: string) {
    this.leaveService.updateLeaveStatus(leave, newStatus).subscribe(
      () => {
        console.log('Leave status updated to', newStatus);
        leave.status = newStatus; // Update the status immediately in the UI
        this.leaveService.leaveSub.next([...this.leaveDataList]); // Emit the updated array to the BehaviorSubject
      },
      (error) => {
        console.error('Error updating leave status:', error);
      }
    );
  }

  approveLeave(leave: LeaveForm) {
    this.updateLeaveStatus(leave, 'Approved');
  }

  rejectLeave(leave: LeaveForm) {
    this.updateLeaveStatus(leave, 'Rejected');
  }
}
