import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmployeeDto } from '../../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,
      private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEmloyeeById(id);
    }else{
      const username = localStorage.getItem("currentUser") ;
      if(username){
        this.getEmloyeeByUsername(username);
      }
    }
  }
  employee : EmployeeDto= {
    empId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'IT',
  };

  updateName() {
    // console.log(this.employee);
    this.userService.updateEmployee(this.employee).subscribe(
      {
        next: (response) => {
          console.log('response', response);
          this.employee = response;
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
        },
      }
    );
  }

 getEmloyeeById(id: number) {
    this.userService.getEmployeeById(id).subscribe(
      {
        next: (response) => {
          console.log('response', response);
          this.employee = response;
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
        },
      }
    );
 }

 getEmloyeeByUsername(username: string) {
    this.userService.getEmloyeeByUsername(username).subscribe(
      {
        next: (response) => {
          console.log('response', response);
          this.employee = response;
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
        },
      }
    );
 }



  updateField(field: string) {
   
  }
}
