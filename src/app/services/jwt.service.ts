import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';




export interface JwtPayload {
  sub: string, 
  exp: number,  
  iat: number,  
  role: string, 
}


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private userService:UserService
  ) { }

  isToken(): boolean {
    return !!localStorage.getItem('token'); 
  }

  public getPayload(): JwtPayload | null {
    
      let token = localStorage.getItem('token') as string;
      if (!token) return null; 
    

    try {
      const payload = jwtDecode<JwtPayload>(token); 
      return payload; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; 
    }
  
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getRole(): string  {
    const payload = this.getPayload();  
    return payload!.role.replaceAll("ROLE_",'');
  }

  getSubject(): string | null {
    const payload = this.getPayload();  
    if (!payload) return null;
    return payload.sub;
  }

 public isExpired(): boolean {
    const payload = this.getPayload();
    if (!payload) return true; 

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime; // Check if the token is expired
  }
}
