export interface EmployeeDto {
  empId: number;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department: string;
}

export interface AuthResponse {
  token: string;
  user?: EmployeeDto;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}