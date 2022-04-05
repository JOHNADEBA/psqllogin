import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsqlServiceService {
  private url = 'http://localhost:3000/';
  loggedIn = false;
  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
    console.log(formData);

    return this.http.post<any>(`${this.url}register`, formData);
  }
  signin(formData: any): Observable<any> {
    console.log(formData);

    return this.http.post<any>(`${this.url}signin`, formData);
  }
  getAllProducts(): Observable<any> {
    const pdtUrl = 'https://fakestoreapi.com/products';
    return this.http.get<any>(pdtUrl);
  }
  getOneProduct(id: number | string): Observable<any> {
    const pdtUrl = `https://fakestoreapi.com/products/${id}`;
    return this.http.get<any>(pdtUrl);
  }
  isLoggedIn() {
    this.loggedIn = true;
  }
  isLoggedOut() {
    this.loggedIn = false;
  }
  isAuthenticated() {
    return this.loggedIn;
  }
}
