import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeaveForm } from '../model/leave-application-form.model';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaveDataList: LeaveForm[] = [];
  leaveSub = new BehaviorSubject<LeaveForm[]>(this.leaveDataList);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.refreshLeaveDataList();
  }

  getLeaveList(): LeaveForm[] {
    return this.leaveDataList;
  }

  addLeave(newLeave: LeaveForm): void {
    newLeave.status = 'Pending';
    newLeave.email = this.authService.currentUserValue?.email || ''; 
    newLeave.department = this.authService.currentUserValue?.department || ''; // Add department here
    this.leaveDataList.push(newLeave);
    this.leaveSub.next(this.leaveDataList);

    this.http.post('https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json', newLeave)
      .subscribe({
        next: () => {
          console.log('Leave data successfully sent to Firebase');
          this.refreshLeaveDataList();
        },
        error: (error) => {
          console.error('Error sending leave data to Firebase:', error);
        }
      });
  }

  getLeavesFromFirebase(): Observable<LeaveForm[]> {
    return this.http.get<{ [key: string]: LeaveForm }>('https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json')
      .pipe(
        map((leavesObject) => {
          const leavesArray: LeaveForm[] = [];
          for (const key in leavesObject) {
            if (Object.prototype.hasOwnProperty.call(leavesObject, key)) {
              leavesArray.push({ ...leavesObject[key], id: key });
            }
          }
          return leavesArray;
        }),
        catchError((error: any) => {
          return throwError(error.message || 'Something went wrong');
        })
      );
  }
  
  updateLeaveStatus(leave: LeaveForm, newStatus: string): Observable<void> {
    const leaveToUpdate = this.leaveDataList.find(
      (item) => item.startDate === leave.startDate && item.endDate === leave.endDate && item.reason === leave.reason
    );
  
    if (leaveToUpdate) {
      leaveToUpdate.status = newStatus;
      this.leaveSub.next(this.leaveDataList);
  
      return this.http.put<void>(`https://task-5-sw-default-rtdb.firebaseio.com/user-leaves/${leaveToUpdate.id}.json`, leaveToUpdate)
        .pipe(
          catchError((error) => {
            console.error('Error updating leave status in Firebase:', error);
            return throwError('Error updating leave status');
          })
        );
    } else {
      console.error('Leave not found');
      return throwError('Leave not found');
    }
  }

  private refreshLeaveDataList(): void {
    this.getLeavesFromFirebase().subscribe((leavesObject) => {
      this.leaveDataList = leavesObject;
      this.leaveSub.next(this.leaveDataList);
    });
  }

  getLeavesByEmail(email: string): Observable<LeaveForm[]> {
    return this.http.get<{ [key: string]: LeaveForm }>('https://task-5-sw-default-rtdb.firebaseio.com/user-leaves.json')
      .pipe(
        map((leavesObject) => {
          const leavesArray: LeaveForm[] = [];
          for (const key in leavesObject) {
            if (Object.prototype.hasOwnProperty.call(leavesObject, key) && leavesObject[key].email === email) {
              leavesArray.push({ ...leavesObject[key], id: key });
            }
          }
          return leavesArray;
        }),
        catchError((error: any) => {
          return throwError(error.message || 'Something went wrong');
        })
      );
  }
}
