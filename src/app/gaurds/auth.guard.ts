import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  exp: number; 
  role: string; 
}

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  try { 
    const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
    console.log(decodedToken);
    

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp < currentTime) {
      console.log('Token expired:', decodedToken.exp, currentTime);
      localStorage.removeItem('token'); 
      localStorage.removeItem('currentUser');
      const router = inject(Router);
      router.navigate(['/login']); 
      return false;
    }
    const requiredRole:string[] = route.data?.['role']; 
    console.log(requiredRole);
    
    console.log( requiredRole.length > 0 && requiredRole.includes(decodedToken.role.replaceAll('ROLE_','')));
    
    if (requiredRole.length > 0 && !requiredRole.includes(decodedToken.role.replaceAll('ROLE_',''))) {
      const router = inject(Router);
      router.navigate(['/unauthorized']); 
      return false;
    }

    return true; 
  } catch (error) {
    console.error('Invalid token:', error);
    const router = inject(Router);
    router.navigate(['/login']); // Redirect to login if token is invalid
    return false;
  }
};