import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmployeeDto } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  searchTerm: string = '';
  employees:EmployeeDto[] =  [
    { empId: 1, lastName: 'John Doe',firstName:'ll', email: 'john.doe@example.com', department: 'HR', },
   
  ];

  filteredEmployees() {
    if (!this.searchTerm) {
      return this.employees;
    }
    return this.employees.filter((employee) =>
      Object.values(employee)
        .join(' ')
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  getAllEmployees() {
    this.userService.getAllEmployees().subscribe(
    {
      next: (response) => {
        console.log('response', response);
        
        this.employees = response;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    }
    );
  }

  addEmployee() {
   
    this.router.navigate(['/add-employee']);
  }

  deleteEmployee(id: number) {
    // this.employees = this.employees.filter((employee) => employee.empId !== id);

    this.userService.deleteEmployeeById(id).subscribe(
      {
        next: (response) => {
          console.log('emp deleted');
          this.getAllEmployees();
        },
        error: (error) => {
          alert("You are not Allowed to delete employee")
          console.error('Error deleting employee:', error);
        },
      }
    );
  }

  editEmployee(eid: number) {
    this.router.navigate(['/profile', eid]);
  }
}
