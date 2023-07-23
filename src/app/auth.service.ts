import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://task-5-sw-default-rtdb.firebaseio.com/user-data.json';
  private firebaseApiKey = 'AIzaSyDs6Ghx3Qi6GEabaWAKTwKn669L8Cx9aC8'; 

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  public getUserPosition(): string {
    return this.currentUserValue ? this.currentUserValue.position : '';
  }

  public getUserDepartment(): string {
    return this.currentUserValue ? this.currentUserValue.department : '';
  }

  public login(username: string, password: string): Observable<any> {
    const payload = {
      email: username,
      password,
      returnSecureToken: true
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`;
    return this.http.post<any>(url, payload).pipe(
      switchMap((response) => {
        return this.getUserDataByEmail(response.email).pipe(
          map((userData) => {
            const userWithPosition = { ...response, ...userData, position: userData.position.toLowerCase() };
            localStorage.setItem('currentUser', JSON.stringify(userWithPosition));
            this.currentUserSubject.next(userWithPosition);
            return userWithPosition;
          })
        );
      }),
      catchError((error: any) => {
        return throwError(error.message || 'Authentication failed');
      })
    );
  }

  private getUserDataByEmail(email: string): Observable<any> {
    const url = this.apiUrl;
    return this.http.get<any[]>(url).pipe(
      map((responseData) => {
        const users = Object.values(responseData);
        return users.find((user) => user.email === email);
      }),
      catchError((error: any) => {
        return throwError(error.message || 'Failed to get user data');
      })
    );
  }

  public getStaffNameByEmail(email: string): Observable<string> {
    return this.getUserDataByEmail(email).pipe(
      map((userData) => {
        return `${userData.firstName} ${userData.lastName}`;
      }),
      catchError((error) => {
        console.error('Error fetching staff name:', error);
        return throwError('Error fetching staff name');
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
