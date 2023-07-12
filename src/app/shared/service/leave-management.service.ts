import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveManagementService {
  private staffLeaves$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private leaves: any[] =[]

  constructor() {
    this.staffLeaves$.next(this.leaves);
  }

  getStaffLeaves(): Observable<any[]> {
    return this.staffLeaves$.asObservable();
  }

  approveLeave(leaveId: number) {
    const index = this.leaves.findIndex(leave => leave.id === leaveId);
    if (index !== -1) {
      this.leaves[index].status = 'Approved';
      this.staffLeaves$.next(this.leaves);
    }
  }

  rejectLeave(leaveId: number) {
    const index = this.leaves.findIndex(leave => leave.id === leaveId);
    if (index !== -1) {
      this.leaves[index].status = 'Rejected';
      this.staffLeaves$.next(this.leaves);
    }
  }
}
