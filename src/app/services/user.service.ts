import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, EmployeeDto } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = `${environment.apiUrl}/users`;
  private authUrl = `http://52.207.82.144:8080/ems-backend`;
  
  private currentUserSubject = new BehaviorSubject<string|null>(null);
  public currentUserEmail = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
  
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    console.log('userJson', userJson);
    this.currentUserSubject.next(userJson);
    }
  

  login(request: LoginRequest): Observable<AuthResponse> {
   console.log('login request', request)
    return this.http.post<AuthResponse>(`${this.authUrl}/auth/login`, request)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', request.username);
          // localStorage.setItem('userId', response.toString());
          this.currentUserSubject.next(request.username);
        })
      );
  }

  register(request: any): Observable<any> {
    return this.http.post<unknown>(`${this.authUrl}/employees`, request);
      // .pipe(
      //   tap(response => {
      //     // localStorage.setItem('token', response?.token);
      //     // localStorage.setItem('currentUser', request.email);
      //     // this.currentUserSubject.next( request.email);
          
      //   })
      // );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getEmployeeById(empId: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.authUrl}/employees/${empId}`);
  }
  getEmloyeeByUsername(username: string): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.authUrl}/employees/username/${username}`);
  }
  deleteEmployeeById(empId: number): Observable<void> {
    return this.http.delete<void>(`${this.authUrl}/employees/${empId}`);
  }


  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

 getUserViaEmail(email: string): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.authUrl}/email/${email}`);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(`${this.authUrl}/employees`);
  }


  updateEmployee(employee: EmployeeDto): Observable<EmployeeDto> {

    return this.http.put<EmployeeDto>(`${this.authUrl}/employees/${employee.empId}`, employee);
  
  }

}