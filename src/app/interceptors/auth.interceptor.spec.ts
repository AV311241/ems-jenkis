import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let token: string;

  beforeEach(() => {
    token = 'test-token';
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('should add Authorization header if token exists', (done) => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      return of(new HttpResponse({ status: 200 }));
    };
    AuthInterceptor(req, next).subscribe(() => done());
  });

  it('should not add Authorization header if no token', (done) => {
    localStorage.removeItem('token');
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    };
    AuthInterceptor(req, next).subscribe(() => done());
  });
});
